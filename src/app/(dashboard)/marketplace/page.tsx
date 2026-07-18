'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Search,
  Star,
  Download,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Filter,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'prompts' | 'templates' | 'characters' | 'models';

const tabs: { id: TabType; label: string }[] = [
  { id: 'prompts', label: 'Prompts' },
  { id: 'templates', label: 'Templates' },
  { id: 'characters', label: 'Characters' },
  { id: 'models', label: 'Models' },
];

interface MarketplaceItem {
  id: string;
  title: string;
  creator: string;
  price: number | null; // null = free
  rating: number;
  downloads: number;
  gradient: string;
  tab: TabType;
  trending?: boolean;
}

const allItems: MarketplaceItem[] = [
  // Prompts
  { id: 'p1', title: 'Cinematic Scene Generator', creator: 'StudioAI', price: null, rating: 4.9, downloads: 12400, gradient: 'from-violet-500/30 via-purple-500/20 to-fuchsia-500/30', tab: 'prompts', trending: true },
  { id: 'p2', title: 'Anime Character Prompt Pack', creator: 'MangaForge', price: 4.99, rating: 4.7, downloads: 8200, gradient: 'from-pink-500/30 via-rose-500/20 to-red-500/30', tab: 'prompts', trending: true },
  { id: 'p3', title: 'Product Photography Prompts', creator: 'LensAI', price: 2.99, rating: 4.8, downloads: 5600, gradient: 'from-amber-500/30 via-orange-500/20 to-yellow-500/30', tab: 'prompts' },
  { id: 'p4', title: 'Fantasy Landscape Collection', creator: 'DreamScape', price: null, rating: 4.6, downloads: 15200, gradient: 'from-emerald-500/30 via-teal-500/20 to-green-500/30', tab: 'prompts' },
  { id: 'p5', title: 'Sci-Fi Environment Builder', creator: 'NeoVision', price: 6.99, rating: 4.9, downloads: 3400, gradient: 'from-cyan-500/30 via-blue-500/20 to-indigo-500/30', tab: 'prompts' },
  { id: 'p6', title: 'Portrait Enhancement Suite', creator: 'FaceForge', price: 3.99, rating: 4.5, downloads: 7800, gradient: 'from-rose-500/30 via-pink-500/20 to-fuchsia-500/30', tab: 'prompts' },
  // Templates
  { id: 't1', title: 'Music Video Template', creator: 'VibeStudios', price: 9.99, rating: 4.8, downloads: 4500, gradient: 'from-blue-500/30 via-indigo-500/20 to-violet-500/30', tab: 'templates', trending: true },
  { id: 't2', title: 'YouTube Intro Pack', creator: 'CreatorKit', price: 5.99, rating: 4.6, downloads: 11200, gradient: 'from-red-500/30 via-orange-500/20 to-amber-500/30', tab: 'templates' },
  { id: 't3', title: 'Instagram Reels Bundle', creator: 'SocialAI', price: null, rating: 4.7, downloads: 22000, gradient: 'from-purple-500/30 via-fuchsia-500/20 to-pink-500/30', tab: 'templates' },
  { id: 't4', title: 'Film Title Sequence', creator: 'CineType', price: 12.99, rating: 4.9, downloads: 2800, gradient: 'from-slate-500/30 via-gray-500/20 to-zinc-500/30', tab: 'templates' },
  { id: 't5', title: 'Product Demo Workflow', creator: 'DemoAI', price: 7.99, rating: 4.4, downloads: 3200, gradient: 'from-teal-500/30 via-emerald-500/20 to-green-500/30', tab: 'templates' },
  { id: 't6', title: 'Podcast Visual Template', creator: 'AudioViz', price: null, rating: 4.3, downloads: 6100, gradient: 'from-indigo-500/30 via-blue-500/20 to-cyan-500/30', tab: 'templates' },
  // Characters
  { id: 'c1', title: 'Cyberpunk Hero Pack', creator: 'NeonForge', price: 14.99, rating: 4.9, downloads: 6700, gradient: 'from-cyan-500/30 via-teal-500/20 to-emerald-500/30', tab: 'characters', trending: true },
  { id: 'c2', title: 'Medieval Fantasy NPCs', creator: 'QuestAI', price: 8.99, rating: 4.7, downloads: 4300, gradient: 'from-amber-500/30 via-yellow-500/20 to-orange-500/30', tab: 'characters' },
  { id: 'c3', title: 'Anime Waifu Collection', creator: 'SakuraAI', price: 6.99, rating: 4.8, downloads: 18500, gradient: 'from-pink-500/30 via-rose-500/20 to-red-500/30', tab: 'characters' },
  { id: 'c4', title: 'Corporate Avatars', creator: 'ProFace', price: null, rating: 4.4, downloads: 9200, gradient: 'from-blue-500/30 via-indigo-500/20 to-violet-500/30', tab: 'characters' },
  { id: 'c5', title: 'Chibi Character Set', creator: 'KawaiiLab', price: 4.99, rating: 4.6, downloads: 7800, gradient: 'from-fuchsia-500/30 via-purple-500/20 to-violet-500/30', tab: 'characters' },
  { id: 'c6', title: 'Sci-Fi Crew Members', creator: 'GalaxyAI', price: 11.99, rating: 4.5, downloads: 2900, gradient: 'from-slate-500/30 via-cyan-500/20 to-blue-500/30', tab: 'characters' },
  // Models
  { id: 'm1', title: 'Hyper-Realistic v3.0', creator: 'RealmAI', price: 19.99, rating: 5.0, downloads: 32000, gradient: 'from-violet-500/30 via-purple-500/20 to-indigo-500/30', tab: 'models', trending: true },
  { id: 'm2', title: 'Anime Diffusion XL', creator: 'OtakuLabs', price: 14.99, rating: 4.9, downloads: 28000, gradient: 'from-pink-500/30 via-fuchsia-500/20 to-purple-500/30', tab: 'models' },
  { id: 'm3', title: 'Architectural Vision', creator: 'BuildAI', price: 24.99, rating: 4.8, downloads: 5400, gradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30', tab: 'models' },
  { id: 'm4', title: 'Comic Book Style LoRA', creator: 'InkForge', price: null, rating: 4.6, downloads: 14200, gradient: 'from-amber-500/30 via-orange-500/20 to-red-500/30', tab: 'models' },
  { id: 'm5', title: 'Pixel Art Generator', creator: 'RetroPixel', price: 7.99, rating: 4.7, downloads: 8900, gradient: 'from-green-500/30 via-lime-500/20 to-yellow-500/30', tab: 'models' },
  { id: 'm6', title: 'Cinematic Film Grain', creator: 'GrainLab', price: 9.99, rating: 4.5, downloads: 6100, gradient: 'from-stone-500/30 via-zinc-500/20 to-slate-500/30', tab: 'models' },
];

const formatDownloads = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={cn(
        'w-3 h-3',
        i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'
      )}
    />
  ));
};

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<TabType>('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const tabItems = allItems.filter(item => item.tab === activeTab);
  const filteredItems = tabItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const trendingItems = allItems.filter(item => item.trending);

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Marketplace</h1>
        </div>
        <p className="text-white/60 ml-14">
          Discover prompts, templates, characters, and models from the community.
        </p>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/30 via-cyan-500/20 to-fuchsia-600/30 border border-white/[0.1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="relative px-8 py-10 flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Featured Collection</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Summer Creative Bundle 2026</h2>
            <p className="text-white/60 max-w-md">
              50+ premium prompts, templates, and character packs — curated for filmmakers and content creators.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium flex items-center gap-2"
            >
              Explore Bundle
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="hidden lg:block w-48 h-48 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl border border-white/[0.08] flex items-center justify-center">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 flex items-center justify-center">
              <Store className="w-16 h-16 text-white/10" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">Trending Now</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {trendingItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="shrink-0 w-56 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/[0.15] transition-all duration-300"
            >
              <div className={cn('h-28 bg-gradient-to-br relative', item.gradient)}>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-400">🔥 Trending</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{item.creator}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {renderStars(item.rating)}
                  <span className="text-[10px] text-white/40 ml-1">{item.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative',
                activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/70'
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="marketplaceTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-white/[0.1] rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search marketplace..."
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
          />
        </div>
        <button className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all">
          <Filter className="w-5 h-5 text-white/60" />
        </button>
      </motion.div>

      {/* Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/[0.15] transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className={cn('h-40 bg-gradient-to-br relative', item.gradient)}>
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
              >
                <Heart className={cn(
                  'w-4 h-4 transition-colors',
                  likedItems.has(item.id) ? 'text-red-400 fill-red-400' : 'text-white/60'
                )} />
              </button>
              {item.price === null && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-400">FREE</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">by {item.creator}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(item.rating)}
                  <span className="text-xs text-white/40 ml-1">{item.rating}</span>
                </div>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {formatDownloads(item.downloads)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                {item.price !== null ? (
                  <span className="text-lg font-bold text-white">${item.price.toFixed(2)}</span>
                ) : (
                  <span className="text-lg font-bold text-emerald-400">Free</span>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'px-5 py-2 rounded-xl text-sm font-medium transition-all',
                    item.price === null
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                  )}
                >
                  {item.price === null ? 'Get' : 'Buy'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
