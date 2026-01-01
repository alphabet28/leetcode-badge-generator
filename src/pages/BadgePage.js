import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Copy, Check, Award, Calendar, CheckCircle } from 'lucide-react';
import { useVerification } from '../context/VerificationContext';
import { fetchPublicBadges } from '../services/badgeStore';
import AnimatedBadge from '../components/AnimatedBadge';

const BadgePage = () => {
  const { username, badgeId } = useParams();
  const { username: loggedInUsername, earnedBadges, verifiedAt, isVerified: userVerified } = useVerification();
  

  // New: fetch badge from public API if not own profile
  const [badge, setBadge] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Share URL for this badge
  const shareUrl = window.location.href;
  
  // Copy link handler
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  useEffect(() => {
    const isOwnProfile = loggedInUsername && username.toLowerCase() === loggedInUsername.toLowerCase();
    if (isOwnProfile && earnedBadges) {
      setBadge(earnedBadges.find(b => (b.id === badgeId || b.leetcodeId === badgeId)));
    } else {
      fetchPublicBadges(username).then(badges => {
        setBadge(badges.find(b => (b.id === badgeId || b.leetcodeId === badgeId)) || null);
      });
    }
  }, [badgeId, username, loggedInUsername, earnedBadges]);

  // Get verification status
  const isOwnProfile = loggedInUsername && username.toLowerCase() === loggedInUsername.toLowerCase();
  
  // Use useMemo to recalculate verification status when dependencies change
  const isVerified = useMemo(() => {
    if (isOwnProfile) return userVerified;
    const storedProfiles = JSON.parse(localStorage.getItem('leetcode_profiles') || '{}');
    return storedProfiles[username.toLowerCase()]?.isVerified || false;
  }, [isOwnProfile, userVerified, username]);
  
  const verifiedDate = useMemo(() => {
    if (isOwnProfile) return verifiedAt;
    const storedProfiles = JSON.parse(localStorage.getItem('leetcode_profiles') || '{}');
    return storedProfiles[username.toLowerCase()]?.verifiedAt;
  }, [isOwnProfile, verifiedAt, username]);

  if (!badge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-md">
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Badge Not Found</h1>
          <p className="text-gray-400 mb-6">
            This badge doesn't exist or the user hasn't earned it.
          </p>
          <Link to={`/profile/${username}`} className="btn-primary">
            View User Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to={`/profile/${username}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Profile
        </Link>

        {/* Main Badge Display */}
        <motion.div
          className="card text-center py-8 sm:py-12 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Badge Icon with Animation */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <AnimatedBadge badge={badge} size="xl" />
          </div>

          {/* Badge Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{badge.name}</h1>
          
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-lc-orange/20 text-lc-orange text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
            {badge.category}
          </span>

          {/* Earned by */}
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
            Earned by <span className="text-white font-semibold">@{username}</span>
          </p>

          {/* Verification Status */}
          {isVerified && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-lc-green/20 text-lc-green rounded-full">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Verified Profile</span>
            </div>
          )}

          {/* Earned Date */}
          {badge.earnedDate && (
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-3 sm:mt-4">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Earned on {new Date(badge.earnedDate).toLocaleDateString()}</span>
            </div>
          )}
        </motion.div>

        {/* Share Badge URL */}
        <motion.div
          className="card mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Share This Badge</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            Share this unique URL to showcase this badge:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 bg-lc-darker/80 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-lc-orange font-mono text-xs sm:text-sm overflow-x-auto break-all">
              {shareUrl}
            </div>
            <motion.button
              onClick={handleCopyLink}
              className="btn-secondary px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto"
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-lc-green" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* View on LeetCode */}
          <a
            href={`https://leetcode.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div
              className="card flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 hover:border-lc-orange/50 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-lc-purple" />
              <span className="font-semibold text-white text-sm sm:text-base">View on LeetCode</span>
            </motion.div>
          </a>
        </motion.div>

        {/* Badge Details */}
        <motion.div
          className="card mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Badge Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-500">Badge Name:</span>
              <p className="text-white font-medium">{badge.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>
              <p className="text-white font-medium">{badge.category}</p>
            </div>
            <div>
              <span className="text-gray-500">Earned by:</span>
              <p className="text-lc-orange font-medium">@{username}</p>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <p className={`font-medium ${isVerified ? 'text-lc-green' : 'text-gray-400'}`}>
                {isVerified ? '✓ Verified Owner' : 'Unverified'}
              </p>
            </div>
            {badge.earnedDate && (
              <div>
                <span className="text-gray-500">Date Earned:</span>
                <p className="text-white font-medium">{new Date(badge.earnedDate).toLocaleDateString()}</p>
              </div>
            )}
            {badge.hoverText && (
              <div className="col-span-1 sm:col-span-2">
                <span className="text-gray-500">Description:</span>
                <p className="text-white">{badge.hoverText}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BadgePage;
