// Service to store and fetch encrypted badge data
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Fetch with timeout
const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

export const storeBadges = async (username, badges) => {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/api/badges/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, badges })
    }, 10000);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to store badges: ${response.status}`);
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('[BadgeStore] Error storing badges:', error);
    if (error.message === 'Request timeout') {
      throw new Error('Database connection timeout. Please ensure MongoDB is running.');
    }
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Backend server not reachable. Please ensure the server is running on port 3001.');
    }
    throw error;
  }
};

export const fetchPublicBadges = async (username) => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE}/api/badges/public?username=${encodeURIComponent(username)}`,
      {},
      10000
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // User not found in DB
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch badges: ${response.status}`);
    }
    
    const data = await response.json();
    return data.badges || [];
  } catch (error) {
    console.error('[BadgeStore] Error fetching public badges:', error);
    if (error.message === 'Request timeout') {
      throw new Error('Database connection timeout.');
    }
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Backend server not reachable.');
    }
    throw error;
  }
};
