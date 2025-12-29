// Serve decrypted badge data for public badge URLs
import clientPromise from '../_db';
import { decrypt } from '../_crypto';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leetcode_badges');
    const collection = db.collection('user_badges');
    const doc = await collection.findOne({ username });
    if (!doc) {
      return res.status(404).json({ error: 'No badge data found' });
    }
    const badges = JSON.parse(decrypt(doc.encrypted));
    res.status(200).json({ username, badges });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch badge data', message: error.message });
  }
}
