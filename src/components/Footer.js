import React from 'react';
import { Github, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-500/90 text-sm text-center">
            <strong>⚠️ DISCLAIMER:</strong> This service is <strong>NOT affiliated with, endorsed by, or sponsored by LeetCode Inc.</strong>
            {' '}All badge designs are original creations. LeetCode® is a registered trademark of LeetCode Inc.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>© 2025 LeetCode Badge Generator. Open source project.</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/alphabet28/leetcode-badge-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-lc-orange transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">LeetCode</span>
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for the coding community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
