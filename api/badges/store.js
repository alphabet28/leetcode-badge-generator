// Store encrypted badge data at verification time
import clientPromise from '../_db';
import { encrypt } from '../_crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, badges } = req.body;
  if (!username || !badges) {
    return res.status(400).json({ error: 'Missing username or badges' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leetcode_badges');
    const collection = db.collection('user_badges');

    // Encrypt badge data
    const encrypted = encrypt(JSON.stringify(badges));
    const now = new Date();

    // Upsert (insert or update) badge data for this user
    await collection.updateOne(
      { username },
      { $set: { username, encrypted, updatedAt: now } },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store badge data', message: error.message });
  }
}