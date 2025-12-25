import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, CheckCircle, Calendar, Award, ArrowLeft, ExternalLink, Copy, Check, Share2, Info } from 'lucide-react';
import { useVerification } from '../context/VerificationContext';
import AnimatedBadge from '../components/AnimatedBadge';

const ProfilePage = () => {
  const { username: urlUsername } = useParams();
  const { username: loggedInUsername, isVerified, verifiedAt, earnedBadges, badgesSource } = useVerification();
  const [copiedUrl, setCopiedUrl] = React.useState(false);
  
  // Check if this is the logged-in user's profile
  const isOwnProfile = loggedInUsername && urlUsername.toLowerCase() === loggedInUsername.toLowerCase();
  
  // Get user data - if it's own profile, use context data; otherwise use localStorage
  const userData = useMemo(() => {
    if (isOwnProfile) {
      return {
        username: loggedInUsername,
        isVerified: isVerified,
        verifiedAt: verifiedAt,
        badges: earnedBadges || [],
        badgesSource: badgesSource,
      };
    }
    
    // Try to find stored profile data for other users (in production, this would be an API call)
    const storedProfiles = JSON.parse(localStorage.getItem('leetcode_profiles') || '{}');
    const profileData = storedProfiles[urlUsername.toLowerCase()];
    
    if (profileData) {
      return profileData;
    }
    
    // Return empty profile if user not found
    return {
      username: urlUsername,
      isVerified: false,
      verifiedAt: null,
      badges: [],
    };
  }, [isOwnProfile, loggedInUsername, isVerified, verifiedAt, earnedBadges, badgesSource, urlUsername]);

  // For scraped badges, they're already full objects, not just IDs
  const userBadges = userData.badges || [];

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Home
        </Link>

        {/* Profile Header */}
        <motion.div
          className="card mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-lc-orange to-yellow-500 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">@{urlUsername}</h1>
                {userData.isVerified && (
                  <span className="status-verified text-xs sm:text-sm">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Verified
                  </span>
                )}
              </div>
              
              {userData.isVerified && userData.verifiedAt && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  Verified on {new Date(userData.verifiedAt).toLocaleDateString()}
                </div>
              )}

              <div className="flex items-center justify-center md:justify-start gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-lc-orange" />
                <span className="text-gray-300 text-sm sm:text-base">
                  {userBadges.length} badge{userBadges.length !== 1 ? 's' : ''} collected
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
              <motion.button
                onClick={handleCopyUrl}
                className="btn-secondary flex items-center justify-center gap-2 text-sm py-2 px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedUrl ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-lc-green" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                {copiedUrl ? 'Copied!' : 'Share Profile'}
              </motion.button>
              <a
                href={`https://leetcode.com/${urlUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  className="btn-secondary flex items-center justify-center gap-2 w-full text-sm py-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  View on LeetCode
                </motion.button>
              </a>
            </div>
          </div>

          {/* Share URL Box */}
          {userData.isVerified && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-2">
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Public Profile URL</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-lc-darker/80 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-lc-orange font-mono text-xs sm:text-sm overflow-x-auto break-all">
                  {window.location.href}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Own Profile Notice */}
        {isOwnProfile && (
          <motion.div
            className="card border-lc-orange/30 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lc-orange text-sm sm:text-base">This is your public profile!</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Share this link with others to showcase your badges.</p>
              </div>
              <Link to="/verify">
                <button className="btn-primary py-2 px-4 text-xs sm:text-sm">Manage Badges</button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 sm:w-7 sm:h-7 text-lc-orange" />
            Earned Badges
          </h2>

          {/* Data Source Notice */}
          {userData.badgesSource === 'simulated' && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 flex items-start gap-2">
              <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-blue-400/80">
                Demo mode - showing simulated badges. In production, actual LeetCode badges are displayed.
              </p>
            </div>
          )}

          {userBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {userBadges.map((badge, index) => (
                <motion.div
                  key={badge.id || badge.leetcodeId || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/badge/${urlUsername}/${badge.id || badge.leetcodeId}`}>
                    <div className="card py-4 sm:py-6 hover:border-lc-orange/50 cursor-pointer">
                      {/* Badge Icon with Animation */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <AnimatedBadge badge={badge} size="lg" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base truncate px-2">{badge.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{badge.category}</p>
                        {badge.earnedDate && (
                          <p className="text-xs text-gray-600 mt-2 hidden sm:block">
                            Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                        {badge.iconGif && (
                          <p className="text-xs text-lc-orange/60 mt-1 hidden md:block">✨ Hover for animation</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8 sm:py-12">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No Badges Yet</h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">
                {isOwnProfile 
                  ? "No badges found on your LeetCode profile. Complete study plans to earn badges!"
                  : "This user hasn't earned any badges on LeetCode yet."}
              </p>
              {isOwnProfile && (
                <Link to="/verify" className="mt-4 inline-block">
                  <motion.button
                    className="btn-primary text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Refresh Badges
                  </motion.button>
                </Link>
              )}
            </div>
          )}
        </motion.div>

        {/* Add Badges CTA - Only for non-own profiles */}
        {userBadges.length > 0 && !isOwnProfile && (
          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              Want to showcase your own LeetCode achievements?
            </p>
            <Link to="/verify">
              <motion.button
                className="btn-primary text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify Your Profile
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
