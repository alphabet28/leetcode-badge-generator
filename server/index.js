const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins in production
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy endpoint for LeetCode GraphQL API
app.post('/api/leetcode/graphql', async (req, res) => {
  const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
  
  try {
    console.log('[Server] Proxying request to LeetCode GraphQL...');
    
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
      console.log('[Server] LeetCode responded with:', response.status);
      return res.status(response.status).json({ 
        error: 'LeetCode API error', 
        status: response.status 
      });
    }

    const data = await response.json();
    console.log('[Server] Successfully fetched from LeetCode');
    res.json(data);
    
  } catch (error) {
    console.error('[Server] Error proxying to LeetCode:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch from LeetCode', 
      message: error.message 
    });
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
    console.log(`[Server] Fetching badges for user: ${username}`);
    
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'LeetCode API error', 
        status: response.status 
      });
    }

    const data = await response.json();
    
    if (data.data?.matchedUser === null) {
      return res.status(404).json({ error: 'User not found on LeetCode' });
    }
    
    console.log(`[Server] Found ${data.data?.matchedUser?.badges?.length || 0} badges for ${username}`);
    res.json(data);
    
  } catch (error) {
    console.error('[Server] Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch badges', 
      message: error.message 
    });
  }
});

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`
  🚀 LeetCode Badge Proxy Server running!
  
  📍 Local:    http://localhost:${PORT}
  
  Endpoints:
  - GET  /api/health           - Health check
  - GET  /api/badges/:username - Fetch user badges
  - POST /api/leetcode/graphql - Raw GraphQL proxy
  `);
});
