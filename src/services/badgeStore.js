// Service to store and fetch encrypted badge data
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '' 
  : (process.env.REACT_APP_API_URL || 'http://localhost:3001');

export const storeBadges = async (username, badges) => {
  const response = await fetch(`${API_BASE}/api/badges/store`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, badges })
  });
  return response.ok;
};

export const fetchPublicBadges = async (username) => {
  const response = await fetch(`${API_BASE}/api/badges/public?username=${encodeURIComponent(username)}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data.badges || [];
};
