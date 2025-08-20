import { db, authAdmin } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

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
  // --- Security Checks Start ---

  // 1. Get the authorization token from the request headers.
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  // 2. Verify the token using Firebase Admin SDK.
  let decodedToken;
  try {
    decodedToken = await authAdmin.verifyIdToken(idToken);
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  // 3. Check for admin privileges (specific email).
  if (decodedToken.email !== 'canadaqiu@qq.com') {
    return NextResponse.json({ error: 'Forbidden: You do not have permission to perform this action.' }, { status: 403 });
  }

  // --- Security Checks End ---

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