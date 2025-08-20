import { db, authAdmin } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

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
 * Securely creates a new listing. This endpoint is protected and requires
 * authentication and specific admin permissions.
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

    const docRef = await db.collection('mls-data').add({
      ...listingData,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to add listing to database' }, { status: 500 });
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
    await db.collection('mls-data').doc(id).delete();
    return NextResponse.json({ success: true, message: `Listing ${id} deleted successfully.` });
  } catch (error) {
    console.error(`Failed to delete listing ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}