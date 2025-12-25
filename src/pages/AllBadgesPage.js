import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, Check, X } from 'lucide-react';
import BadgeRenderer from '../components/BadgeRenderer';
import { BADGES, BADGE_CATEGORIES, getAllCategories } from '../data/badges';

const AllBadgesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEarnableOnly, setShowEarnableOnly] = useState(false);

  const categories = ['all', ...getAllCategories()];

  const filteredBadges = useMemo(() => {
    return BADGES.filter(badge => {
      // Search filter
      const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
      
      // Earnable filter
      const matchesEarnable = !showEarnableOnly || badge.earnable;

      return matchesSearch && matchesCategory && matchesEarnable;
    });
  }, [searchQuery, selectedCategory, showEarnableOnly]);

  // Group badges by category
  const groupedBadges = useMemo(() => {
    const groups = {};
    filteredBadges.forEach(badge => {
      if (!groups[badge.category]) {
        groups[badge.category] = [];
      }
      groups[badge.category].push(badge);
    });
    return groups;
  }, [filteredBadges]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Award className="w-10 h-10 text-lc-orange" />
            All LeetCode Badges
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore all available LeetCode badges. Click on any badge to view details and add it to your profile.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field bg-lc-darker/50 cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Earnable Toggle */}
            <motion.button
              onClick={() => setShowEarnableOnly(!showEarnableOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                showEarnableOnly
                  ? 'bg-lc-green/20 border-lc-green/50 text-lc-green'
                  : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {showEarnableOnly ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              <span>Earnable Only</span>
            </motion.button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredBadges.length} of {BADGES.length} badges
          </div>
        </motion.div>

        {/* Badge Groups */}
        <AnimatePresence mode="wait">
          {Object.keys(groupedBadges).length > 0 ? (
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Object.entries(groupedBadges).map(([category, badges], categoryIndex) => (
                <motion.section
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-lc-orange rounded-full" />
                    {category}
                    <span className="text-sm font-normal text-gray-500">
                      ({badges.length})
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link to={`/badge/demo_user/${badge.id}`}>
                          <div className="card group cursor-pointer hover:border-lc-orange/50 transition-all h-full">
                            <div className="flex flex-col items-center py-4">
                              <BadgeRenderer
                                badgeId={badge.id}
                                size="small"
                                animated={false}
                                showDetails={false}
                              />
                              
                              <div className="text-center mt-4 w-full">
                                <h3 className="font-semibold text-white group-hover:text-lc-orange transition-colors line-clamp-1">
                                  {badge.name}
                                </h3>
                                
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {badge.description}
                                </p>

                                <div className="mt-3 flex items-center justify-center gap-2">
                                  {badge.earnable ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-lc-green/20 text-lc-green border border-lc-green/30">
                                      <Check className="w-3 h-3" />
                                      Earnable
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-500/20 text-gray-400 border border-gray-500/30">
                                      <X className="w-3 h-3" />
                                      Past
                                    </span>
                                  )}
                                  
                                  {badge.year && (
                                    <span className="px-2 py-0.5 rounded-full text-xs bg-lc-blue/20 text-lc-blue border border-lc-blue/30">
                                      {badge.year}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="card text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Badges Found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowEarnableOnly(false);
                }}
                className="btn-secondary mt-4"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllBadgesPage;
