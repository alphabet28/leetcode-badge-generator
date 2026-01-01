import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ArrowRight, ExternalLink, AlertTriangle, CheckCircle, 
  RefreshCw, Award, Copy, Check, Eye, Info, Loader2 
} from 'lucide-react';
import { useVerification } from '../context/VerificationContext';
import TokenDisplay from '../components/TokenDisplay';
import VerificationStatus from '../components/VerificationStatus';
import AnimatedBadge from '../components/AnimatedBadge';

const VerifyPage = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState(null);
  const [copiedBadgeUrl, setCopiedBadgeUrl] = useState(null);
  
  const {
    username,
    token,
    tokenExpiresAt,
    status,
    verifiedAt,
    earnedBadges,
    badgesSource,
    isFetchingBadges,
    generateToken,
    checkVerification,
    refreshBadges,
    resetVerification,
    isVerified,
  } = useVerification();

  const handleGenerateToken = () => {
    if (inputUsername.trim()) {
      generateToken(inputUsername.trim().toLowerCase());
      setVerifyMessage(null);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerifyMessage(null);
    
    try {
      const result = await checkVerification(username);
      setVerifyMessage(result);
    } catch (error) {
      setVerifyMessage({
        success: false,
        message: error?.message || (error && typeof error === 'object' && error.toString()) || 'An error occurred during verification.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRefreshBadges = async () => {
    const result = await refreshBadges();
    setVerifyMessage(result);
  };

  const handleReset = () => {
    resetVerification();
    setInputUsername('');
    setVerifyMessage(null);
  };

  const handleCopyBadgeUrl = async (badgeId) => {
    const url = `${window.location.origin}/badge/${username}/${badgeId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedBadgeUrl(badgeId);
      setTimeout(() => setCopiedBadgeUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {isVerified ? 'Your Earned Badges' : 'Verify Your Profile'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base px-2">
            {isVerified 
              ? 'Share your LeetCode achievements with unique public URLs' 
              : 'Verify ownership of your LeetCode profile to showcase your earned badges'}
          </p>
        </motion.div>

        {/* Already Verified - Show Dashboard */}
        {isVerified && (
          <>
            {/* Verification Status Card */}
            <motion.div
              className="card border-lc-green/30 mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-full bg-lc-green/20">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-lc-green" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-lc-green">Profile Verified!</h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    @{username} • Verified on {new Date(verifiedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Link to={`/profile/${username}`} className="flex-1 sm:flex-none">
                    <button className="btn-primary py-2 px-3 sm:px-4 text-xs sm:text-sm flex items-center justify-center gap-2 w-full">
                      <Eye className="w-4 h-4" />
                      <span className="hidden xs:inline">View</span> Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleReset}
                    className="btn-secondary py-2 px-3 sm:px-4 text-xs sm:text-sm flex items-center gap-2"
                    title="Reset verification"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Data Source Notice */}
            {badgesSource === 'simulated' && (
              <motion.div
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium text-sm sm:text-base">Demo Mode</p>
                  <p className="text-blue-400/80 text-xs sm:text-sm">
                    Due to browser CORS restrictions, showing simulated badges. In production with a backend proxy, 
                    your actual LeetCode badges will be displayed.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Earned Badges */}
            <motion.div
              className="card mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-lc-orange" />
                  Your Earned Badges ({earnedBadges?.length || 0})
                </h3>
                <motion.button
                  onClick={handleRefreshBadges}
                  disabled={isFetchingBadges}
                  className="btn-secondary py-2 px-4 text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isFetchingBadges ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Refresh
                </motion.button>
              </div>

              {earnedBadges && earnedBadges.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {earnedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id || badge.leetcodeId}
                      className="bg-lc-darker/50 border border-white/10 rounded-xl p-3 sm:p-4 hover:border-lc-orange/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        {/* Badge Icon with Animation */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <AnimatedBadge badge={badge} size="md" />
                          
                          {/* Badge Info */}
                          <div className="flex-1 min-w-0 sm:hidden">
                            <h4 className="font-semibold text-white text-sm truncate">{badge.name}</h4>
                            <p className="text-xs text-gray-500">{badge.category}</p>
                          </div>
                        </div>

                        {/* Badge Info - Desktop */}
                        <div className="hidden sm:block flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate">{badge.name}</h4>
                          <p className="text-sm text-gray-500">{badge.category}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-gray-600 mt-1">
                              Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full sm:w-auto sm:shrink-0">
                          <Link to={`/badge/${username}/${badge.id || badge.leetcodeId}`} className="flex-1 sm:flex-none">
                            <motion.button
                              className="btn-secondary py-2 px-3 text-xs sm:text-sm flex items-center justify-center gap-1 w-full"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </motion.button>
                          </Link>
                          <motion.button
                            onClick={() => handleCopyBadgeUrl(badge.id || badge.leetcodeId)}
                            className="btn-secondary py-2 px-3 text-xs sm:text-sm flex items-center justify-center gap-1 flex-1 sm:flex-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedBadgeUrl === (badge.id || badge.leetcodeId) ? (
                              <Check className="w-4 h-4 text-lc-green" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            <span className="hidden xs:inline">Copy URL</span>
                            <span className="xs:hidden">Copy</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Public URL Preview - Hidden on very small screens */}
                      <div className="mt-3 pt-3 border-t border-white/5 hidden sm:block">
                        <p className="text-xs text-gray-600 mb-1">Public Badge URL:</p>
                        <code className="text-xs text-lc-orange/70 break-all">
                          {window.location.origin}/badge/{username}/{badge.id || badge.leetcodeId}
                        </code>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base">No badges found on your LeetCode profile.</p>
                  <p className="text-xs sm:text-sm mt-2">Complete study plans and challenges to earn badges!</p>
                </div>
              )}
            </motion.div>

            {/* Embed Instructions */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-lc-orange" />
                How to Use Your Badge URLs
              </h3>
              <div className="space-y-3 sm:space-y-4 text-gray-400">
                <div>
                  <h4 className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">Portfolio Website</h4>
                  <p className="text-xs sm:text-sm">Add badge URLs as links or embed them with iframes to showcase your achievements.</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">LinkedIn / Resume</h4>
                  <p className="text-xs sm:text-sm">Add your public profile URL to your LinkedIn profile or resume.</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">GitHub README</h4>
                  <p className="text-xs sm:text-sm">Include badge links in your GitHub profile README to show recruiters your skills.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Verification Flow (when not verified) */}
        {!isVerified && (
          <div className="space-y-6 sm:space-y-8">
            {/* How It Works */}
            <motion.div
              className="card bg-gradient-to-br from-lc-orange/5 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-lc-orange" />
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">1</div>
                  <h4 className="font-medium text-white mb-1 text-sm">Verify Ownership</h4>
                  <p className="text-gray-500 text-xs">Add a token to your LeetCode bio to prove you own the profile.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">2</div>
                  <h4 className="font-medium text-white mb-1 text-sm">Fetch Your Badges</h4>
                  <p className="text-gray-500 text-xs">We automatically scrape your actual earned badges from LeetCode.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 sm:col-span-2 md:col-span-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm mb-2">3</div>
                  <h4 className="font-medium text-white mb-1 text-sm">Share Anywhere</h4>
                  <p className="text-gray-500 text-xs">Get public URLs for each badge to share on your portfolio, LinkedIn, etc.</p>
                </div>
              </div>
            </motion.div>

            {/* Step 1: Enter Username */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  1
                </div>
                <h2 className="text-base sm:text-xl font-semibold text-white">Enter Your LeetCode Username</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="e.g., john_doe"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    disabled={token}
                    className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateToken()}
                  />
                </div>
                <motion.button
                  onClick={handleGenerateToken}
                  disabled={!inputUsername.trim() || token}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed py-2 sm:py-3 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate Token
                </motion.button>
              </div>
            </motion.div>

            {/* Step 2: Token Display */}
            <AnimatePresence>
              {token && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                        2
                      </div>
                      <h2 className="text-base sm:text-xl font-semibold text-white">Copy Your Token</h2>
                    </div>
                    <TokenDisplay token={token} expiresAt={tokenExpiresAt} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Instructions */}
            <AnimatePresence>
              {token && (
                <motion.div
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                      3
                    </div>
                    <h2 className="text-base sm:text-xl font-semibold text-white">Add Token to Your Bio</h2>
                  </div>

                  <div className="bg-lc-darker/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                    <ol className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-lc-orange font-bold">1.</span>
                        <span>
                          Go to your{' '}
                          <a
                            href={`https://leetcode.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lc-orange hover:underline inline-flex items-center gap-1"
                          >
                            LeetCode profile <ExternalLink className="w-3 h-3" />
                          </a>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lc-orange font-bold">2.</span>
                        <span>Click "Edit Profile" and find the "Summary/Bio" field</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lc-orange font-bold">3.</span>
                        <span>Paste the token anywhere in your bio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lc-orange font-bold">4.</span>
                        <span>Save your profile changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lc-orange font-bold">5.</span>
                        <span>Come back here and click "Verify & Fetch Badges"</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 sm:p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-yellow-500/90">
                      <strong>Note:</strong> You can remove the token from your bio after successful verification.
                      The token is only needed temporarily to prove ownership.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Verify Button */}
            <AnimatePresence>
              {token && (
                <motion.div
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-lc-orange flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                      4
                    </div>
                    <h2 className="text-base sm:text-xl font-semibold text-white">Verify & Fetch Your Badges</h2>
                  </div>

                  <VerificationStatus status={isVerifying ? 'verifying' : status} verifiedAt={verifiedAt} />

                  {/* Verify Message */}
                  <AnimatePresence>
                    {verifyMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                          verifyMessage.success
                            ? 'bg-lc-green/20 border border-lc-green/30 text-lc-green'
                            : 'bg-red-500/20 border border-red-500/30 text-red-400'
                        }`}
                      >
                        {verifyMessage.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <motion.button
                      onClick={handleVerify}
                      disabled={isVerifying}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 py-3 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="hidden sm:inline">Verifying & Fetching Badges...</span>
                          <span className="sm:hidden">Verifying...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Verify & Fetch Badges</span>
                          <span className="sm:hidden">Verify Profile</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </motion.button>
                    
                    <button
                      onClick={handleReset}
                      className="btn-secondary px-4 py-3 text-sm sm:text-base"
                    >
                      Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
