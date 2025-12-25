import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Shield, Share2, ExternalLink, CheckCircle, ArrowRight, Zap, Globe, Lock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Share Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lc-orange to-yellow-500">
                LeetCode Badges
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Verify your LeetCode profile and get public URLs for every badge you've earned. 
              Perfect for portfolios, resumes, and LinkedIn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link to="/verify" className="w-full sm:w-auto">
                <motion.button
                  className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-lc-darker/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Three simple steps to share your LeetCode achievements with the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Lock,
                title: 'Verify Ownership',
                description: 'Add a unique token to your LeetCode bio to prove you own the profile.',
                step: '1',
              },
              {
                icon: Zap,
                title: 'Auto-Fetch Badges',
                description: 'We automatically scrape your earned badges directly from LeetCode.',
                step: '2',
              },
              {
                icon: Globe,
                title: 'Share Anywhere',
                description: 'Get unique public URLs for each badge to embed in your portfolio.',
                step: '3',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-lc-orange/20 to-yellow-500/10 flex items-center justify-center relative">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-lc-orange" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-lc-orange text-black font-bold text-xs sm:text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Why Use Badge Generator?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-2">
              LeetCode doesn't provide public badge URLs. We solve that problem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Shield,
                title: 'Verified Badges Only',
                description: 'Only badges you actually earned on LeetCode are displayed. No fake achievements.',
              },
              {
                icon: Share2,
                title: 'Shareable URLs',
                description: 'Each badge gets its own public URL that you can share anywhere.',
              },
              {
                icon: CheckCircle,
                title: 'Profile Verification',
                description: 'Prove you own your LeetCode profile with our token-based verification.',
              },
              {
                icon: Award,
                title: 'All Badge Types',
                description: 'Study plans, contests, daily challenges, annual badges - all supported.',
              },
              {
                icon: ExternalLink,
                title: 'Easy Embedding',
                description: 'Add badge links to your portfolio, GitHub README, or LinkedIn.',
              },
              {
                icon: Zap,
                title: 'Real-Time Sync',
                description: 'Refresh your badges anytime to pull the latest from LeetCode.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-lc-orange mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="card bg-gradient-to-br from-lc-orange/10 to-yellow-500/5 border-lc-orange/30 text-center py-8 sm:py-12 px-4 sm:px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Showcase Your Achievements?
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
              Join developers who share their LeetCode progress with verified, 
              beautiful badge pages.
            </p>
            <Link to="/verify">
              <motion.button
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify Your Profile Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
