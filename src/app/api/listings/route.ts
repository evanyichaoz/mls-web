import { db, authAdmin } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import imagekit from '@/lib/imagekit';

/**
 * Verifies if the request comes from an authenticated admin user.
 * It checks for a valid Bearer token in the Authorization header, verifies
 * the token with Firebase Admin, and checks if the user's email matches
 * the configured admin email.
 *
 * @param request The incoming Next.js request object.
 * @returns A `NextResponse` object with an error if verification fails, otherwise `null`.
 */
async function verifyAdmin(request: NextRequest): Promise<NextResponse | null> {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await authAdmin.verifyIdToken(idToken);
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to perform this action.' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  return null; // Indicates success
}

/**
 * GET /api/listings
 * Fetches a list of listings.
 * @param request The incoming Next.js request object.
 * @returns A Response object containing the list of listings or an error.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  if (!status) {
    return NextResponse.json({ error: 'Status parameter is required' }, { status: 400 });
  }

  try {
    const listingsRef = db.collection('mls-data');
    const q = listingsRef.where('status', '==', parseInt(status, 10));
    const querySnapshot = await q.get();
    const listings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

/**
 * POST /api/listings
 * Securely creates a new listing or updates an existing one based on mlsNum.
 * This endpoint is protected and requires authentication and specific admin permissions.
 * @param request The incoming Next.js request object, expecting a JSON body for the new listing.
 * @returns A Response object indicating success or failure.
 */
export async function POST(request: NextRequest) {
  const errorResponse = await verifyAdmin(request);
  if (errorResponse) {
    return errorResponse;
  }

  // Only users who pass all security checks can proceed.
  try {
    const listingData = await request.json();

    // Basic validation for required fields
    if (!listingData.mlsNum || !listingData.address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle photo upload to ImageKit
    if (listingData.photo) {
      try {
        const uploadResponse = await imagekit.upload({
          file: listingData.photo, // URL of the original image
          fileName: `listing-${listingData.mlsNum}`, // A unique file name
          folder: 'mls-listings',
          useUniqueFileName: false, // Overwrite if same mlsNum is uploaded again
        });
        listingData.photo = uploadResponse.url; // Replace with the new URL from ImageKit
        listingData.photoFileId = uploadResponse.fileId; // Store the fileId for easy deletion
      } catch (uploadError) {
        console.error('ImageKit upload failed:', uploadError);
        // Returning an error seems safer than proceeding with an old image URL.
        return NextResponse.json({ error: 'Failed to upload image to ImageKit' }, { status: 500 });
      }
    }

    const listingsRef = db.collection('mls-data');
    const q = listingsRef.where('mlsNum', '==', listingData.mlsNum);
    const querySnapshot = await q.get();

    if (querySnapshot.empty) {
      // No existing listing found, create a new one.
      const docRef = await listingsRef.add({
        ...listingData,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id: docRef.id, operation: 'created' }, { status: 201 });
    } else {
      // Existing listing found, update it.
      // Assuming mlsNum is unique, so we update the first document found.
      const docToUpdate = querySnapshot.docs[0];
      await docToUpdate.ref.update({
        ...listingData,
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id: docToUpdate.id, operation: 'updated' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing listing:', error);
    return NextResponse.json({ error: 'Failed to process listing in database' }, { status: 500 });
  }
}

/**
 * DELETE /api/listings
 * Securely deletes a listing. This endpoint is protected and requires
 * authentication and specific admin permissions.
 * @param request The incoming Next.js request object, expecting an 'id' query parameter.
 * @returns A Response object indicating success or failure.
 */
export async function DELETE(request: NextRequest) {
  const errorResponse = await verifyAdmin(request);
  if (errorResponse) {
    return errorResponse;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Listing ID parameter is required' }, { status: 400 });
  }

  try {
    const docRef = db.collection('mls-data').doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const listingData = docSnapshot.data();

    // If there's a photo file ID, delete it from ImageKit
    if (listingData?.photoFileId) {
        try {
            await imagekit.deleteFile(listingData.photoFileId);
        } catch (imageKitError) {
            // Log the error but don't block the Firestore deletion.
            // The database record is the source of truth, and we can have cleanup jobs for orphaned images.
            console.error(`Failed to delete image from ImageKit for listing ${id} (fileId: ${listingData.photoFileId}):`, imageKitError);
        }
    }

    await docRef.delete();
    return NextResponse.json({ success: true, message: `Listing ${id} deleted successfully.` });
  } catch (error) {
    console.error(`Failed to delete listing ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}