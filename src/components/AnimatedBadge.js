import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

/**
 * AnimatedBadge component that shows animated GIF on hover
 * Falls back to static icon if GIF is not available
 */
const AnimatedBadge = ({ 
  badge, 
  size = 'md', 
  showAnimation = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Size configurations
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'w-8 h-8', fallback: 'w-6 h-6' },
    md: { container: 'w-16 h-16', icon: 'w-12 h-12', fallback: 'w-8 h-8' },
    lg: { container: 'w-24 h-24', icon: 'w-20 h-20', fallback: 'w-12 h-12' },
    xl: { container: 'w-32 h-32', icon: 'w-24 h-24', fallback: 'w-16 h-16' },
  };

  const sizeConfig = sizes[size] || sizes.md;

  // Determine which image to show
  const staticIcon = badge.icon;
  const animatedIcon = badge.iconGif;
  const hasAnimation = showAnimation && animatedIcon;
  
  // Show animated GIF on hover if available
  const currentIcon = (hasAnimation && isHovered) ? animatedIcon : staticIcon;

  if (imageError || !staticIcon) {
    return (
      <div 
        className={`${sizeConfig.container} rounded-xl bg-gradient-to-br from-lc-orange/20 to-yellow-500/10 flex items-center justify-center ${className}`}
      >
        <Award className={`${sizeConfig.fallback} text-lc-orange`} />
      </div>
    );
  }

  return (
    <motion.div
      className={`${sizeConfig.container} rounded-xl bg-gradient-to-br from-lc-orange/20 to-yellow-500/10 flex items-center justify-center overflow-hidden relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Static Image (always loaded) */}
      <img
        src={staticIcon}
        alt={badge.name}
        className={`${sizeConfig.icon} object-contain transition-opacity duration-200 ${
          hasAnimation && isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        onError={() => setImageError(true)}
      />
      
      {/* Animated GIF (shown on hover) */}
      {hasAnimation && (
        <img
          src={animatedIcon}
          alt={`${badge.name} animated`}
          className={`${sizeConfig.icon} object-contain absolute inset-0 m-auto transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            // If animated fails, just hide it
            e.target.style.display = 'none';
          }}
        />
      )}

      {/* Animation indicator */}
      {hasAnimation && (
        <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
          isHovered ? 'bg-lc-green animate-pulse' : 'bg-lc-orange/50'
        }`} title="Hover for animation" />
      )}
    </motion.div>
  );
};

export default AnimatedBadge;
