// Vercel Serverless Function - LeetCode GraphQL Proxy
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

  try {
    console.log('[Vercel] Proxying request to LeetCode GraphQL...');

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
      console.log('[Vercel] LeetCode responded with:', response.status);
      return res.status(response.status).json({
        error: 'LeetCode API error',
        status: response.status
      });
    }

    const data = await response.json();
    console.log('[Vercel] Successfully fetched from LeetCode');
    res.status(200).json(data);

  } catch (error) {
    console.error('[Vercel] Error proxying to LeetCode:', error.message);
    res.status(500).json({
      error: 'Failed to fetch from LeetCode',
      message: error.message
    });
  }
}