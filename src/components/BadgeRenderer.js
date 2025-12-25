import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getBadgeById } from '../data/badges';

const BadgeRenderer = ({ 
  badgeId, 
  username, 
  isVerified = false, 
  verifiedDate = null,
  size = 'medium', // small, medium, large
  animated = true,
  showDetails = true,
}) => {
  const badge = getBadgeById(badgeId);
  
  if (!badge) {
    return (
      <div className="text-red-500 p-4 text-center">
        Badge not found
      </div>
    );
  }

  const sizes = {
    small: { badge: 'w-24 h-24', text: 'text-xs', icon: 'w-8 h-8' },
    medium: { badge: 'w-40 h-40', text: 'text-sm', icon: 'w-12 h-12' },
    large: { badge: 'w-56 h-56', text: 'text-base', icon: 'w-16 h-16' },
  };

  const currentSize = sizes[size];
  const badgeColor = badge.color || '#ffa116';

  // Animation variants
  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        `0 0 20px ${badgeColor}40, 0 0 40px ${badgeColor}20`,
        `0 0 30px ${badgeColor}60, 0 0 60px ${badgeColor}30`,
        `0 0 20px ${badgeColor}40, 0 0 40px ${badgeColor}20`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const BadgeContent = () => (
    <div className="flex flex-col items-center gap-2">
      {/* Badge Icon/Medal */}
      <motion.div
        className={`${currentSize.icon} rounded-full flex items-center justify-center`}
        style={{ 
          background: `linear-gradient(135deg, ${badgeColor}, ${badgeColor}aa)`,
          boxShadow: `0 4px 15px ${badgeColor}50`
        }}
        animate={animated ? { 
          y: [0, -5, 0],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-2xl">🏆</span>
      </motion.div>

      {/* Badge Name */}
      <motion.div 
        className={`${currentSize.text} font-bold text-center text-white`}
        style={{
          background: animated 
            ? `linear-gradient(90deg, ${badgeColor}, white, ${badgeColor})`
            : badgeColor,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        variants={animated ? shimmerVariants : {}}
        animate={animated ? 'animate' : ''}
      >
        {badge.name}
      </motion.div>

      {/* Year if applicable */}
      {badge.year && (
        <div className={`${currentSize.text} text-gray-400`}>
          {badge.year}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Badge */}
      <motion.div
        className={`${currentSize.badge} rounded-full flex items-center justify-center relative`}
        style={{
          background: `linear-gradient(135deg, #1a1a2e, #2d2d44)`,
          border: `3px solid ${isVerified ? '#2cbb5d' : badgeColor}`,
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        whileHover={animated ? "hover" : ""}
      >
        {/* Glow Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full"
            variants={glowVariants}
            animate="animate"
          />
        )}

        {/* Inner Circle */}
        <div 
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${badgeColor}40, transparent 70%)`
          }}
        />

        {/* Badge Content */}
        <BadgeContent />

        {/* Verification Badge */}
        {isVerified && (
          <motion.div
            className="absolute -bottom-2 -right-2 bg-lc-green rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Details Section */}
      {showDetails && (
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Username */}
          {username && (
            <div className="text-white font-semibold">
              @{username}
            </div>
          )}

          {/* Verification Status */}
          <div className={`flex items-center justify-center gap-2 ${currentSize.text}`}>
            {isVerified ? (
              <span className="status-verified">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="status-unverified">
                <AlertCircle className="w-3 h-3" />
                Self-declared
              </span>
            )}
          </div>

          {/* Verified Date */}
          {isVerified && verifiedDate && (
            <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3 h-3" />
              Verified on {new Date(verifiedDate).toLocaleDateString()}
            </div>
          )}

          {/* Badge Description */}
          <p className="text-gray-400 text-xs max-w-xs">
            {badge.description}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BadgeRenderer;
