import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLeetCodeBadges, checkVerification as apiCheckVerification } from '../services/api';

const VerificationContext = createContext();

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};

export const VerificationProvider = ({ children }) => {
  const [verificationState, setVerificationState] = useState({
    username: '',
    token: null,
    tokenExpiresAt: null,
    status: 'idle', // idle, pending, verified, failed
    verifiedAt: null,
    // Badges scraped from LeetCode - these are EARNED badges, not self-declared
    earnedBadges: [],
    // Flag to indicate if badges are from real API or simulated
    badgesSource: null,
    // Loading state for badge fetching
    isFetchingBadges: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('leetcode_verification');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if token is expired
        if (parsed.tokenExpiresAt && new Date(parsed.tokenExpiresAt) < new Date()) {
          // Token expired, reset token but keep verified status
          setVerificationState({
            ...parsed,
            token: null,
            tokenExpiresAt: null,
            status: parsed.status === 'verified' ? 'verified' : 'idle',
          });
        } else {
          setVerificationState(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved verification state');
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (verificationState.username) {
      localStorage.setItem('leetcode_verification', JSON.stringify(verificationState));
      
      // Also save to profiles storage for public profile access
      const profiles = JSON.parse(localStorage.getItem('leetcode_profiles') || '{}');
      profiles[verificationState.username.toLowerCase()] = {
        username: verificationState.username,
        isVerified: verificationState.status === 'verified',
        verifiedAt: verificationState.verifiedAt,
        badges: verificationState.earnedBadges,
        badgesSource: verificationState.badgesSource,
      };
      localStorage.setItem('leetcode_profiles', JSON.stringify(profiles));
    }
  }, [verificationState]);

  // Generate a secure random token
  const generateToken = (username) => {
    const randomPart = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const token = `LCBADGE-${randomPart.toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
    
    setVerificationState(prev => ({
      ...prev,
      username,
      token,
      tokenExpiresAt: expiresAt.toISOString(),
      status: 'pending',
    }));
    
    return { token, expiresAt };
  };

  // Verify profile AND fetch earned badges from LeetCode
  const checkVerification = async (username) => {
    console.log('[Context] Starting verification for:', username);
    try {
      // Step 1: Verify the token is in their bio
      console.log('[Context] Step 1: Calling apiCheckVerification...');
      const verifyResult = await apiCheckVerification(username, verificationState.token);
      console.log('[Context] Step 1 complete:', verifyResult);
      
      if (!verifyResult.success && !verifyResult.verified) {
        return { 
          success: false, 
          message: verifyResult.message || 'Token not found in profile bio.' 
        };
      }
      
      // Step 2: Fetch their ACTUAL badges from LeetCode
      console.log('[Context] Step 2: Fetching badges...');
      setVerificationState(prev => ({ ...prev, isFetchingBadges: true }));
      let badgesResult;
      try {
        badgesResult = await fetchLeetCodeBadges(username);
        console.log('[Context] Step 2 complete:', badgesResult);
      } catch (fetchError) {
        console.error('[Context] Badge fetch error:', fetchError);
        badgesResult = { success: true, badges: [], source: 'error' };
      }
      const badges = badgesResult?.badges || [];
      const source = badgesResult?.source || 'unknown';
      console.log('[Context] Updating state with badges:', badges.length);
      // Store encrypted badge data in DB
      try {
        const { storeBadges } = await import('../services/badgeStore');
        await storeBadges(username, badges);
        console.log('[Context] Badges stored in DB');
      } catch (err) {
        console.error('[Context] Failed to store badges in DB:', err);
        // Surface DB error to user if badge storage fails
        return {
          success: false,
          message: err?.message || 'Failed to store badges in database. Please try again.'
        };
      }
      setVerificationState(prev => ({
        ...prev,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        earnedBadges: badges,
        badgesSource: source,
        isFetchingBadges: false,
      }));
      const badgeCount = badges.length;
      const sourceNote = source === 'demo' 
        ? ' (Demo mode - in production, real badges will be fetched)' 
        : '';
      console.log('[Context] Verification successful!');
      return { 
        success: true, 
        message: `Profile verified! Found ${badgeCount} badge${badgeCount !== 1 ? 's' : ''}.${sourceNote}`,
        badges: badges,
      };
    } catch (error) {
      console.error('[Context] Verification error:', error);
      setVerificationState(prev => ({ ...prev, isFetchingBadges: false }));
      return { 
        success: false, 
        message: error.message || 'Verification failed. Please try again.' 
      };
    }
  };

  // Refresh badges (re-fetch from LeetCode)
  const refreshBadges = async () => {
    if (!verificationState.username || verificationState.status !== 'verified') {
      return { success: false, message: 'Must be verified first' };
    }
    
    setVerificationState(prev => ({ ...prev, isFetchingBadges: true }));
    
    try {
      const result = await fetchLeetCodeBadges(verificationState.username);
      
      if (result.success) {
        setVerificationState(prev => ({
          ...prev,
          earnedBadges: result.badges,
          badgesSource: result.source,
          isFetchingBadges: false,
        }));
        
        return { 
          success: true, 
          message: `Updated! Found ${result.badges.length} badges.`,
          badges: result.badges,
        };
      }
      
      setVerificationState(prev => ({ ...prev, isFetchingBadges: false }));
      return { success: false, message: 'Failed to fetch badges' };
    } catch (error) {
      setVerificationState(prev => ({ ...prev, isFetchingBadges: false }));
      return { success: false, message: error.message };
    }
  };

  // Reset verification
  const resetVerification = () => {
    localStorage.removeItem('leetcode_verification');
    setVerificationState({
      username: '',
      token: null,
      tokenExpiresAt: null,
      status: 'idle',
      verifiedAt: null,
      earnedBadges: [],
      badgesSource: null,
      isFetchingBadges: false,
    });
  };

  const value = {
    ...verificationState,
    generateToken,
    checkVerification,
    refreshBadges,
    resetVerification,
    isVerified: verificationState.status === 'verified',
    isPending: verificationState.status === 'pending',
    // Alias for backwards compatibility
    badges: verificationState.earnedBadges,
  };

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};