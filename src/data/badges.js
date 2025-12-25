// Complete list of LeetCode badges with metadata
export const BADGE_CATEGORIES = {
  ANNUAL: 'Annual Medals',
  COMPETITION: 'Competition Medals',
  DAILY: 'Daily Medals',
  STUDY_PLAN: 'Study Plan Medals',
  SUBMISSION_DAYS: 'Submission Days'
};

export const BADGES = [
  // Annual Medals - Earnable
  { id: '100-days-2025', name: '100 Days Badge 2025', description: 'Submit code on 100+ distinct days in 2025', category: BADGE_CATEGORIES.ANNUAL, earnable: true, year: 2025, color: '#ffd700' },
  { id: '50-days-2025', name: '50 Days Badge 2025', description: 'Submit code on 50+ distinct days in 2025', category: BADGE_CATEGORIES.ANNUAL, earnable: true, year: 2025, color: '#c0c0c0' },
  
  // Competition Medals
  { id: 'guardian', name: 'Guardian', description: 'Be in the top 5% of contest-rated users (rating ≥ 1600)', category: BADGE_CATEGORIES.COMPETITION, earnable: true, color: '#9b59b6' },
  { id: 'knight', name: 'Knight', description: 'Be in the top 25% of contest-rated users (rating ≥ 1600)', category: BADGE_CATEGORIES.COMPETITION, earnable: true, color: '#3498db' },
  
  // Daily Medals - 2025
  { id: 'dec-2025', name: 'Dec 2025 Badge', description: 'Submit code daily in December 2025', category: BADGE_CATEGORIES.DAILY, earnable: true, year: 2025, month: 12, color: '#e74c3c' },
  
  // Study Plan Medals - Earnable
  { id: 'intro-pandas', name: 'Introduction to Pandas', description: 'Complete the "Introduction to Pandas" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#27ae60' },
  { id: '30-days-pandas', name: '30 Days of Pandas', description: 'Complete the "30 Days of Pandas" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#27ae60' },
  { id: '30-days-javascript', name: '30 Days of JavaScript', description: 'Complete the "30 Days of JavaScript" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#f1c40f' },
  { id: 'top-interview-150', name: 'Top Interview 150', description: 'Complete the "Top Interview 150" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#e67e22' },
  { id: 'leetcode-75', name: 'LeetCode 75', description: 'Complete the "LeetCode 75" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#ffa116' },
  { id: 'top-100-liked', name: 'Top 100 Liked', description: 'Complete the "Top 100 Liked" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#e91e63' },
  { id: 'sql-50', name: 'SQL 50', description: 'Complete the "SQL 50" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#00bcd4' },
  { id: 'premium-algo-100', name: 'Premium Algo 100', description: 'Complete the "Premium Algo 100" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#ffd700' },
  { id: 'advanced-sql-50', name: 'Advanced SQL 50', description: 'Complete the "Advanced SQL 50" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#00bcd4' },
  { id: 'programming-skills', name: 'Programming Skills', description: 'Complete the "Programming Skills" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#9c27b0' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', description: 'Complete the "Dynamic Programming" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#673ab7' },
  { id: 'dp-grandmaster', name: 'Dynamic Programming Grandmaster', description: 'Complete the "Dynamic Programming Grandmaster" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#311b92' },
  { id: 'graph-theory', name: 'Graph Theory', description: 'Complete the "Graph Theory" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#1976d2' },
  { id: 'binary-search', name: 'Binary Search', description: 'Complete the "Binary Search" study plan', category: BADGE_CATEGORIES.STUDY_PLAN, earnable: true, color: '#388e3c' },
  
  // Submission Days
  { id: '2000-days', name: '2000 Days Badge', description: 'Submit code on 2000+ distinct days', category: BADGE_CATEGORIES.SUBMISSION_DAYS, earnable: true, color: '#ffd700' },
  { id: '1000-days', name: '1000 Days Badge', description: 'Submit code on 1000+ distinct days', category: BADGE_CATEGORIES.SUBMISSION_DAYS, earnable: true, color: '#e5c100' },
  { id: '500-days', name: '500 Days Badge', description: 'Submit code on 500+ distinct days', category: BADGE_CATEGORIES.SUBMISSION_DAYS, earnable: true, color: '#c0c0c0' },
  { id: '365-days', name: '365 Days Badge', description: 'Submit code on 365+ distinct days', category: BADGE_CATEGORIES.SUBMISSION_DAYS, earnable: true, color: '#cd7f32' },
  
  // Annual Medals - Past (Not Earnable)
  { id: 'annual-2024', name: 'Annual Badge 2024', description: 'Submit code on 300+ distinct days in 2024', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2024, color: '#ffd700' },
  { id: '200-days-2024', name: '200 Days Badge 2024', description: 'Submit code on 200+ distinct days in 2024', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2024, color: '#c0c0c0' },
  { id: '100-days-2024', name: '100 Days Badge 2024', description: 'Submit code on 100+ distinct days in 2024', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2024, color: '#cd7f32' },
  { id: '50-days-2024', name: '50 Days Badge 2024', description: 'Submit code on 50+ distinct days in 2024', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2024, color: '#b87333' },
  { id: 'annual-2023', name: 'Annual Badge 2023', description: 'Submit code on 300+ distinct days in 2023', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2023, color: '#ffd700' },
  { id: '100-days-2023', name: '100 Days Badge 2023', description: 'Submit code on 100+ distinct days in 2023', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2023, color: '#cd7f32' },
  { id: '50-days-2023', name: '50 Days Badge 2023', description: 'Submit code on 50+ distinct days in 2023', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2023, color: '#b87333' },
  { id: 'annual-2022', name: 'Annual Badge 2022', description: 'Submit code on 300+ distinct days in 2022', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2022, color: '#ffd700' },
  { id: 'annual-2021', name: 'Annual Medal 2021', description: 'Submit code on 300+ distinct days in 2021', category: BADGE_CATEGORIES.ANNUAL, earnable: false, year: 2021, color: '#ffd700' },
  
  // Daily Medals - 2025 (Past months)
  { id: 'jan-2025', name: 'Jan 2025 Badge', description: 'Submit code daily in January 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 1, color: '#3498db' },
  { id: 'feb-2025', name: 'Feb 2025 Badge', description: 'Submit code daily in February 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 2, color: '#e91e63' },
  { id: 'mar-2025', name: 'Mar 2025 Badge', description: 'Submit code daily in March 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 3, color: '#4caf50' },
  { id: 'apr-2025', name: 'Apr 2025 Badge', description: 'Submit code daily in April 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 4, color: '#ff9800' },
  { id: 'may-2025', name: 'May 2025 Badge', description: 'Submit code daily in May 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 5, color: '#9c27b0' },
  { id: 'jun-2025', name: 'Jun 2025 Badge', description: 'Submit code daily in June 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 6, color: '#00bcd4' },
  { id: 'jul-2025', name: 'Jul 2025 Badge', description: 'Submit code daily in July 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 7, color: '#ff5722' },
  { id: 'aug-2025', name: 'Aug 2025 Badge', description: 'Submit code daily in August 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 8, color: '#795548' },
  { id: 'sep-2025', name: 'Sep 2025 Badge', description: 'Submit code daily in September 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 9, color: '#607d8b' },
  { id: 'oct-2025', name: 'Oct 2025 Badge', description: 'Submit code daily in October 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 10, color: '#ff5722' },
  { id: 'nov-2025', name: 'Nov 2025 Badge', description: 'Submit code daily in November 2025', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2025, month: 11, color: '#8bc34a' },
  
  // Daily Medals - 2024
  { id: 'jan-2024', name: 'Jan 2024 Badge', description: 'Submit code daily in January 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 1, color: '#3498db' },
  { id: 'feb-2024', name: 'Feb 2024 Badge', description: 'Submit code daily in February 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 2, color: '#e91e63' },
  { id: 'mar-2024', name: 'Mar 2024 Badge', description: 'Submit code daily in March 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 3, color: '#4caf50' },
  { id: 'apr-2024', name: 'Apr 2024 Badge', description: 'Submit code daily in April 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 4, color: '#ff9800' },
  { id: 'may-2024', name: 'May 2024 Badge', description: 'Submit code daily in May 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 5, color: '#9c27b0' },
  { id: 'jun-2024', name: 'Jun 2024 Badge', description: 'Submit code daily in June 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 6, color: '#00bcd4' },
  { id: 'jul-2024', name: 'Jul 2024 Badge', description: 'Submit code daily in July 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 7, color: '#ff5722' },
  { id: 'aug-2024', name: 'Aug 2024 Badge', description: 'Submit code daily in August 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 8, color: '#795548' },
  { id: 'sep-2024', name: 'Sep 2024 Badge', description: 'Submit code daily in September 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 9, color: '#607d8b' },
  { id: 'oct-2024', name: 'Oct 2024 Badge', description: 'Submit code daily in October 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 10, color: '#ff5722' },
  { id: 'nov-2024', name: 'Nov 2024 Badge', description: 'Submit code daily in November 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 11, color: '#8bc34a' },
  { id: 'dec-2024', name: 'Dec 2024 Badge', description: 'Submit code daily in December 2024', category: BADGE_CATEGORIES.DAILY, earnable: false, year: 2024, month: 12, color: '#e74c3c' },
];

// Get badge by ID
export const getBadgeById = (badgeId) => {
  return BADGES.find(badge => badge.id === badgeId);
};

// Get badges by category
export const getBadgesByCategory = (category) => {
  return BADGES.filter(badge => badge.category === category);
};

// Get earnable badges
export const getEarnableBadges = () => {
  return BADGES.filter(badge => badge.earnable);
};

// Get all categories
export const getAllCategories = () => {
  return Object.values(BADGE_CATEGORIES);
};
