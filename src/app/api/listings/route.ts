import { db } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const snapshot = await db.collection('mls-data').get();
    const listings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json(listings);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}