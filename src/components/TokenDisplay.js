import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TokenDisplay = ({ token, expiresAt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getTimeRemaining = () => {
    if (!expiresAt) return null;
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-white">Your Verification Token</h3>
          {expiresAt && (
            <span className="text-xs text-lc-orange">
              ⏱️ {getTimeRemaining()}
            </span>
          )}
        </div>

        {/* Token Box */}
        <div className="relative">
          <div className="bg-lc-darker/80 border-2 border-dashed border-lc-orange/50 rounded-lg p-3 sm:p-4 font-mono text-sm sm:text-lg text-center text-lc-orange break-all pr-12">
            {token}
          </div>
          
          {/* Copy Button */}
          <motion.button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-lg bg-lc-orange/20 hover:bg-lc-orange/30 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-lc-green" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-lc-orange" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Copied Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-lc-green text-sm"
            >
              ✓ Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TokenDisplay;
