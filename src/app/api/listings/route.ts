import { db } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection('mls-data');
    if (status) {
      query = query.where('status', '==', Number(status));
    }

    const snapshot = await query.get();
    const listings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json(listings);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}