// Vercel Serverless Function - Fetch User Badges
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;
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
    console.log(`[Vercel] Fetching badges for user: ${username}`);

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

    console.log(`[Vercel] Found ${data.data?.matchedUser?.badges?.length || 0} badges for ${username}`);
    res.status(200).json(data);

  } catch (error) {
    console.error('[Vercel] Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch badges',
      message: error.message
    });
  }
}
