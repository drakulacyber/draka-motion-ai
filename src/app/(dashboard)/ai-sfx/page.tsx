'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AudioWaveform as Waves,
  Search,
  Play,
  Pause,
  Download,
  Sparkles,
  Loader2,
  Clock,
  TreePine,
  Swords,
  Wand2,
  Mouse,
  Wind,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SFXItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  color: string;
}

const categories = [
  { id: 'nature', label: 'Nature', icon: TreePine },
  { id: 'action', label: 'Action', icon: Swords },
  { id: 'fantasy', label: 'Fantasy', icon: Wand2 },
  { id: 'ui', label: 'UI', icon: Mouse },
  { id: 'ambient', label: 'Ambient', icon: Wind },
];

const sfxLibrary: Record<string, SFXItem[]> = {
  nature: [
    { id: 'n1', name: 'Rain on Window', category: 'Nature', duration: '0:12', color: 'bg-blue-500/20' },
    { id: 'n2', name: 'Thunder Crack', category: 'Nature', duration: '0:04', color: 'bg-purple-500/20' },
    { id: 'n3', name: 'Ocean Waves', category: 'Nature', duration: '0:18', color: 'bg-cyan-500/20' },
    { id: 'n4', name: 'Bird Song Morning', category: 'Nature', duration: '0:08', color: 'bg-emerald-500/20' },
    { id: 'n5', name: 'Wind Through Trees', category: 'Nature', duration: '0:15', color: 'bg-teal-500/20' },
    { id: 'n6', name: 'River Stream', category: 'Nature', duration: '0:20', color: 'bg-sky-500/20' },
    { id: 'n7', name: 'Crackling Fire', category: 'Nature', duration: '0:10', color: 'bg-orange-500/20' },
    { id: 'n8', name: 'Waterfall Roar', category: 'Nature', duration: '0:14', color: 'bg-blue-500/20' },
    { id: 'n9', name: 'Crickets Night', category: 'Nature', duration: '0:22', color: 'bg-green-500/20' },
    { id: 'n10', name: 'Snow Crunch', category: 'Nature', duration: '0:03', color: 'bg-slate-500/20' },
    { id: 'n11', name: 'Earthquake Rumble', category: 'Nature', duration: '0:06', color: 'bg-red-500/20' },
    { id: 'n12', name: 'Frog Chorus', category: 'Nature', duration: '0:09', color: 'bg-lime-500/20' },
  ],
  action: [
    { id: 'a1', name: 'Sword Clash', category: 'Action', duration: '0:02', color: 'bg-red-500/20' },
    { id: 'a2', name: 'Gunshot Echo', category: 'Action', duration: '0:03', color: 'bg-orange-500/20' },
    { id: 'a3', name: 'Explosion Large', category: 'Action', duration: '0:05', color: 'bg-amber-500/20' },
    { id: 'a4', name: 'Glass Shatter', category: 'Action', duration: '0:02', color: 'bg-cyan-500/20' },
    { id: 'a5', name: 'Car Chase', category: 'Action', duration: '0:08', color: 'bg-yellow-500/20' },
    { id: 'a6', name: 'Punch Impact', category: 'Action', duration: '0:01', color: 'bg-rose-500/20' },
    { id: 'a7', name: 'Helicopter Flyby', category: 'Action', duration: '0:06', color: 'bg-sky-500/20' },
    { id: 'a8', name: 'Ricochet Bullet', category: 'Action', duration: '0:02', color: 'bg-stone-500/20' },
    { id: 'a9', name: 'Metal Door Slam', category: 'Action', duration: '0:03', color: 'bg-zinc-500/20' },
    { id: 'a10', name: 'Body Fall', category: 'Action', duration: '0:02', color: 'bg-neutral-500/20' },
    { id: 'a11', name: 'Arrow Whoosh', category: 'Action', duration: '0:01', color: 'bg-emerald-500/20' },
    { id: 'a12', name: 'Shield Block', category: 'Action', duration: '0:02', color: 'bg-blue-500/20' },
  ],
  fantasy: [
    { id: 'f1', name: 'Magic Spell Cast', category: 'Fantasy', duration: '0:04', color: 'bg-violet-500/20' },
    { id: 'f2', name: 'Portal Open', category: 'Fantasy', duration: '0:05', color: 'bg-purple-500/20' },
    { id: 'f3', name: 'Dragon Roar', category: 'Fantasy', duration: '0:06', color: 'bg-red-500/20' },
    { id: 'f4', name: 'Healing Chime', category: 'Fantasy', duration: '0:03', color: 'bg-emerald-500/20' },
    { id: 'f5', name: 'Dark Enchantment', category: 'Fantasy', duration: '0:07', color: 'bg-indigo-500/20' },
    { id: 'f6', name: 'Crystal Shimmer', category: 'Fantasy', duration: '0:02', color: 'bg-cyan-500/20' },
    { id: 'f7', name: 'Teleport Whoosh', category: 'Fantasy', duration: '0:03', color: 'bg-fuchsia-500/20' },
    { id: 'f8', name: 'Level Up Fanfare', category: 'Fantasy', duration: '0:04', color: 'bg-amber-500/20' },
    { id: 'f9', name: 'Ghost Whisper', category: 'Fantasy', duration: '0:05', color: 'bg-slate-500/20' },
    { id: 'f10', name: 'Fire Spell', category: 'Fantasy', duration: '0:03', color: 'bg-orange-500/20' },
    { id: 'f11', name: 'Ice Freeze', category: 'Fantasy', duration: '0:04', color: 'bg-sky-500/20' },
    { id: 'f12', name: 'Summon Entity', category: 'Fantasy', duration: '0:06', color: 'bg-rose-500/20' },
  ],
  ui: [
    { id: 'u1', name: 'Button Click', category: 'UI', duration: '0:01', color: 'bg-blue-500/20' },
    { id: 'u2', name: 'Success Ding', category: 'UI', duration: '0:01', color: 'bg-emerald-500/20' },
    { id: 'u3', name: 'Error Buzz', category: 'UI', duration: '0:01', color: 'bg-red-500/20' },
    { id: 'u4', name: 'Notification Pop', category: 'UI', duration: '0:01', color: 'bg-violet-500/20' },
    { id: 'u5', name: 'Toggle Switch', category: 'UI', duration: '0:01', color: 'bg-cyan-500/20' },
    { id: 'u6', name: 'Swipe Whoosh', category: 'UI', duration: '0:01', color: 'bg-sky-500/20' },
    { id: 'u7', name: 'Typing Keys', category: 'UI', duration: '0:03', color: 'bg-amber-500/20' },
    { id: 'u8', name: 'Loading Hum', category: 'UI', duration: '0:05', color: 'bg-indigo-500/20' },
    { id: 'u9', name: 'Dropdown Open', category: 'UI', duration: '0:01', color: 'bg-teal-500/20' },
    { id: 'u10', name: 'Delete Trash', category: 'UI', duration: '0:01', color: 'bg-rose-500/20' },
    { id: 'u11', name: 'Message Sent', category: 'UI', duration: '0:02', color: 'bg-green-500/20' },
    { id: 'u12', name: 'Tab Switch', category: 'UI', duration: '0:01', color: 'bg-purple-500/20' },
  ],
  ambient: [
    { id: 'am1', name: 'City Traffic', category: 'Ambient', duration: '0:30', color: 'bg-yellow-500/20' },
    { id: 'am2', name: 'Coffee Shop', category: 'Ambient', duration: '0:25', color: 'bg-amber-500/20' },
    { id: 'am3', name: 'Space Drone', category: 'Ambient', duration: '0:20', color: 'bg-indigo-500/20' },
    { id: 'am4', name: 'Underwater Depth', category: 'Ambient', duration: '0:18', color: 'bg-blue-500/20' },
    { id: 'am5', name: 'Factory Hum', category: 'Ambient', duration: '0:15', color: 'bg-zinc-500/20' },
    { id: 'am6', name: 'Library Quiet', category: 'Ambient', duration: '0:22', color: 'bg-stone-500/20' },
    { id: 'am7', name: 'Haunted House', category: 'Ambient', duration: '0:12', color: 'bg-purple-500/20' },
    { id: 'am8', name: 'Busy Market', category: 'Ambient', duration: '0:16', color: 'bg-orange-500/20' },
    { id: 'am9', name: 'Spaceship Interior', category: 'Ambient', duration: '0:20', color: 'bg-cyan-500/20' },
    { id: 'am10', name: 'Rainforest', category: 'Ambient', duration: '0:28', color: 'bg-green-500/20' },
    { id: 'am11', name: 'Desert Wind', category: 'Ambient', duration: '0:14', color: 'bg-amber-500/20' },
    { id: 'am12', name: 'Subway Station', category: 'Ambient', duration: '0:10', color: 'bg-slate-500/20' },
  ],
};

export default function AISFXPage() {
  const [activeCategory, setActiveCategory] = useState('nature');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingSFX, setPlayingSFX] = useState<string | null>(null);

  const currentSFX = sfxLibrary[activeCategory] || [];
  const filteredSFX = currentSFX.filter(sfx =>
    sfx.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AI Sound Effects</h1>
        </div>
        <p className="text-white/60 ml-14">
          Browse pre-made sound effects or generate custom ones with AI.
        </p>
      </motion.div>

      {/* Custom SFX Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6"
      >
        <h2 className="text-white font-semibold mb-4">Generate Custom Sound Effect</h2>
        <div className="flex gap-3">
          <input
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe the sound effect you need... e.g., 'A futuristic laser beam with echo'"
            className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating || !customPrompt.trim()}
            className={cn(
              'px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 transition-all duration-300 shrink-0',
              isGenerating || !customPrompt.trim()
                ? 'bg-white/[0.05] text-white/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400'
            )}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Generate
          </motion.button>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap relative',
                activeCategory === cat.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/70 bg-white/[0.02]'
              )}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="sfxCategoryTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-white/[0.1] rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {cat.label}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sound effects..."
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
          />
        </div>
      </motion.div>

      {/* SFX Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        {filteredSFX.map((sfx, idx) => {
          const isCurrentlyPlaying = playingSFX === sfx.id;
          const bars = Array.from({ length: 20 }, () => Math.random() * 100);
          return (
            <motion.div
              key={sfx.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 group hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{sfx.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full text-white/70', sfx.color)}>
                      {sfx.category}
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {sfx.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini Waveform */}
              <div className="flex items-center gap-[2px] h-8 mb-3">
                {bars.map((height, barIdx) => (
                  <motion.div
                    key={barIdx}
                    animate={isCurrentlyPlaying ? {
                      scaleY: [1, Math.random() * 0.6 + 0.4, 1],
                    } : {}}
                    transition={isCurrentlyPlaying ? {
                      duration: 0.3 + Math.random() * 0.2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    } : {}}
                    className={cn(
                      'flex-1 rounded-full',
                      isCurrentlyPlaying ? 'bg-gradient-to-t from-emerald-500 to-teal-400' : 'bg-white/[0.1]'
                    )}
                    style={{ height: `${Math.max(height, 20)}%` }}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlayingSFX(isCurrentlyPlaying ? null : sfx.id)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all',
                    isCurrentlyPlaying
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.08] border border-white/[0.06]'
                  )}
                >
                  {isCurrentlyPlaying ? (
                    <><Pause className="w-3.5 h-3.5" /> Stop</>
                  ) : (
                    <><Play className="w-3.5 h-3.5" /> Play</>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.08] transition-all"
                >
                  <Download className="w-4 h-4 text-white/60" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
