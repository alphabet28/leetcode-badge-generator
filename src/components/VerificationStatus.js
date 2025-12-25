import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';

const VerificationStatus = ({ status, verifiedAt }) => {
  const statusConfig = {
    idle: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-500/30',
      label: 'Not Started',
      description: 'Enter your username to begin verification',
    },
    pending: {
      icon: Clock,
      color: 'text-lc-orange',
      bgColor: 'bg-lc-orange/20',
      borderColor: 'border-lc-orange/30',
      label: 'Pending Verification',
      description: 'Add the token to your LeetCode bio and click verify',
    },
    verifying: {
      icon: Loader2,
      color: 'text-lc-blue',
      bgColor: 'bg-lc-blue/20',
      borderColor: 'border-lc-blue/30',
      label: 'Verifying...',
      description: 'Checking your LeetCode profile for the token',
    },
    verified: {
      icon: CheckCircle,
      color: 'text-lc-green',
      bgColor: 'bg-lc-green/20',
      borderColor: 'border-lc-green/30',
      label: 'Verified ✓',
      description: 'Your profile ownership has been confirmed',
    },
    failed: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
      label: 'Verification Failed',
      description: 'Token not found in your profile bio',
    },
  };

  const config = statusConfig[status] || statusConfig.idle;
  const Icon = config.icon;

  return (
    <motion.div
      className={`rounded-lg p-3 sm:p-4 ${config.bgColor} border ${config.borderColor}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
        <motion.div
          animate={status === 'verifying' ? { rotate: 360 } : {}}
          transition={status === 'verifying' ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          className="shrink-0 mt-0.5 sm:mt-0"
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm sm:text-base ${config.color}`}>
            {config.label}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">
            {config.description}
          </div>
          {status === 'verified' && verifiedAt && (
            <div className="text-xs text-gray-500 mt-1">
              Verified on {new Date(verifiedAt).toLocaleDateString()} at {new Date(verifiedAt).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationStatus;
