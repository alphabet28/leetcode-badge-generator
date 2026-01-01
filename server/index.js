require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clientPromise = require('./db');
const { encrypt, decrypt } = require('./encryption');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Store encrypted badge data
app.post('/api/badges/store', async (req, res) => {
  const { username, badges } = req.body;
  if (!username || !badges) {
    return res.status(400).json({ error: 'Missing username or badges' });
  }
  try {
    const client = await clientPromise;
    const db = client.db('leetcode_badges');
    const collection = db.collection('user_badges');
    const encrypted = encrypt(JSON.stringify(badges));
    const now = new Date();
    await collection.updateOne(
      { username },
      { $set: { username, encrypted, updatedAt: now } },
      { upsert: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store badge data', message: error.message });
  }
});

// Serve decrypted badge data for public badge URLs
app.get('/api/badges/public', async (req, res) => {
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
});

// Proxy endpoint for LeetCode GraphQL API
app.post('/api/leetcode/graphql', async (req, res) => {
  const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'LeetCode API error', status: response.status });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from LeetCode', message: error.message });
  }
});

// Fetch user badges endpoint (convenience wrapper)
app.get('/api/badges/:username', async (req, res) => {
  const { username } = req.params;
  const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
  const query = `
    query userBadges($username: String!) {
      matchedUser(username: $username) {
        badges {
          id
          name
          shortName
          displayName
          icon
          hoverText
          medal {
            slug
            config {
              iconGif
              iconGifBackground
            }
          }
          creationDate
          category
        }
        upcomingBadges {
          name
          icon
          progress
        }
      }
    }
  `;
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({ query, variables: { username } })
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'LeetCode API error', status: response.status });
    }
    const data = await response.json();
    if (data.data?.matchedUser === null) {
      return res.status(404).json({ error: 'User not found on LeetCode' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch badges', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 LeetCode Badge Generator Express server running!\n\n📍 Local: http://localhost:${PORT}\n`);
});
