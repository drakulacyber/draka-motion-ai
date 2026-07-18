'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  Heart,
  Copy,
  Play,
  Star,
  ChevronDown,
  Sparkles,
  Zap,
  Check,
  ArrowRight,
  Wand2,
  Lightbulb,
  Users,
  TrendingUp,
  Hash,
  MessageSquare,
  Bookmark,
  BarChart3,
  Target,
  Gauge,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================
type TabId = 'library' | 'builder' | 'generator' | 'optimizer' | 'community';
type CategoryId = 'all' | 'landscape' | 'portrait' | 'product' | 'fantasy' | 'anime' | 'cinematic' | 'architecture';
type FilterType = 'all' | 'image' | 'video' | 'audio';

interface PromptCard {
  id: string;
  text: string;
  category: CategoryId;
  tags: string[];
  usageCount: number;
  isFavorite: boolean;
}

interface CommunityPrompt {
  id: string;
  text: string;
  author: string;
  authorInitials: string;
  rating: number;
  useCount: number;
  tags: string[];
}

// ============================================
// Tab Config
// ============================================
const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'builder', label: 'Builder', icon: Wand2 },
  { id: 'generator', label: 'Generator', icon: Sparkles },
  { id: 'optimizer', label: 'Optimizer', icon: Target },
  { id: 'community', label: 'Community', icon: Users },
];

const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'product', label: 'Product' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'anime', label: 'Anime' },
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'architecture', label: 'Architecture' },
];

// ============================================
// Sample Data
// ============================================
const samplePrompts: PromptCard[] = [
  { id: '1', text: 'A breathtaking mountain landscape at golden hour, crystal clear alpine lake reflecting snow-capped peaks, dramatic clouds painted in shades of orange and purple, ultra-detailed 8K photography', category: 'landscape', tags: ['nature', 'mountains', '8K'], usageCount: 1842, isFavorite: true },
  { id: '2', text: 'Elegant portrait of a woman with flowing silver hair, wearing ornate fantasy armor, dramatic rim lighting against a dark background, photorealistic digital art', category: 'portrait', tags: ['portrait', 'fantasy', 'dramatic'], usageCount: 1253, isFavorite: false },
  { id: '3', text: 'Luxury watch product photography on polished black marble, studio lighting with soft reflections, shallow depth of field, commercial grade quality', category: 'product', tags: ['product', 'luxury', 'commercial'], usageCount: 967, isFavorite: true },
  { id: '4', text: 'Enchanted forest with bioluminescent mushrooms and floating fireflies, ancient tree with twisted roots, mystical fog, fantasy digital painting in the style of concept art', category: 'fantasy', tags: ['fantasy', 'magical', 'forest'], usageCount: 2104, isFavorite: false },
  { id: '5', text: 'Cute anime girl in a cozy Japanese café, warm afternoon light streaming through windows, detailed background with pastries and coffee, Studio Ghibli inspired aesthetic', category: 'anime', tags: ['anime', 'ghibli', 'cozy'], usageCount: 3201, isFavorite: true },
  { id: '6', text: 'Cyberpunk cityscape at night, rain-soaked streets with neon reflections, towering holographic advertisements, flying cars in the distance, cinematic wide angle shot', category: 'cinematic', tags: ['cyberpunk', 'neon', 'cinematic'], usageCount: 2876, isFavorite: false },
  { id: '7', text: 'Minimalist modern villa perched on a cliff overlooking the ocean, floor-to-ceiling glass walls, infinity pool, sunset view, architectural photography with drone perspective', category: 'architecture', tags: ['architecture', 'modern', 'luxury'], usageCount: 1456, isFavorite: false },
  { id: '8', text: 'Serene Japanese zen garden with raked sand patterns, moss-covered stones, small maple tree with red autumn leaves, soft morning mist, peaceful meditation atmosphere', category: 'landscape', tags: ['zen', 'japanese', 'peaceful'], usageCount: 1634, isFavorite: true },
  { id: '9', text: 'Close-up portrait of an elderly craftsman with weathered hands, deep wrinkles telling stories, warm workshop lighting, bokeh background with wood shavings, documentary style', category: 'portrait', tags: ['portrait', 'elderly', 'documentary'], usageCount: 892, isFavorite: false },
  { id: '10', text: 'Floating island with a medieval castle, waterfalls cascading into clouds below, dragons circling the towers, epic fantasy landscape, detailed matte painting style', category: 'fantasy', tags: ['epic', 'castle', 'dragons'], usageCount: 3450, isFavorite: true },
  { id: '11', text: 'High-end sneaker product shot with dynamic splash of colorful paint, levitating against a gradient background, commercial advertising style with perfect lighting', category: 'product', tags: ['sneaker', 'dynamic', 'advertising'], usageCount: 1123, isFavorite: false },
  { id: '12', text: 'Anime battle scene with a samurai warrior unleashing a powerful energy attack, cherry blossoms swirling in the wind, dramatic perspective, vibrant cel-shaded art style', category: 'anime', tags: ['action', 'samurai', 'dynamic'], usageCount: 2567, isFavorite: false },
];

const builderOptions = {
  styles: ['Photorealistic', 'Digital Art', 'Oil Painting', 'Watercolor', 'Anime', 'Concept Art', '3D Render', 'Pixel Art'],
  settings: ['Indoor Studio', 'Outdoor Nature', 'Urban City', 'Fantasy World', 'Space', 'Underwater', 'Abstract Background', 'Medieval'],
  lighting: ['Natural Sunlight', 'Golden Hour', 'Studio Lighting', 'Neon Glow', 'Dramatic Rim Light', 'Soft Diffused', 'Moonlight', 'Volumetric'],
  cameras: ['Wide Angle', 'Close-up Macro', 'Portrait 85mm', 'Drone Aerial', 'Fish-eye', 'Tilt-shift', 'Cinematic Anamorphic', 'Medium Shot'],
  moods: ['Peaceful', 'Epic', 'Dark & Moody', 'Vibrant', 'Nostalgic', 'Futuristic', 'Romantic', 'Mysterious'],
};

const generatedPrompts = [
  'A majestic dragon perched atop a crystalline mountain peak at dawn, iridescent scales catching the first rays of sunlight, surrounded by swirling mist and floating ember particles, hyper-detailed fantasy concept art',
  'Ethereal underwater temple ruins overgrown with bioluminescent coral, schools of exotic fish swimming through ancient archways, light rays piercing the turquoise depths, cinematic wide shot',
  'A lone astronaut discovering an alien garden on a distant planet, exotic flora with fractal patterns glowing in purple and teal, two moons visible in the twilight sky, sci-fi illustration',
  'Victorian-era inventor\'s workshop filled with brass clockwork mechanisms, steam-powered contraptions, warm candlelight illuminating scattered blueprints and tools, steampunk atmosphere',
];

const communityPrompts: CommunityPrompt[] = [
  { id: '1', text: 'Massive ancient library with towering bookshelves reaching into darkness, floating candles providing warm light, a wizard reading at a desk, magical particles in the air', author: 'Luna M.', authorInitials: 'LM', rating: 4.9, useCount: 5420, tags: ['fantasy', 'library'] },
  { id: '2', text: 'Futuristic Tokyo street scene at night, holographic shop signs, pedestrians with cybernetic enhancements, rain puddles reflecting neon lights, blade runner aesthetic', author: 'Kai N.', authorInitials: 'KN', rating: 4.8, useCount: 4318, tags: ['cyberpunk', 'urban'] },
  { id: '3', text: 'Cozy autumn cabin interior, fireplace crackling, knitted blankets, steaming mug of cocoa on a wooden table, view of golden forest through frosted window, hygge atmosphere', author: 'Ella R.', authorInitials: 'ER', rating: 4.7, useCount: 3892, tags: ['cozy', 'autumn'] },
  { id: '4', text: 'Cosmic whale swimming through a nebula, stars and galaxies reflected in its skin, smaller creatures following in its wake, space fantasy digital painting', author: 'Zara K.', authorInitials: 'ZK', rating: 4.9, useCount: 6102, tags: ['space', 'surreal'] },
  { id: '5', text: 'Art deco luxury hotel lobby, geometric gold patterns, marble floors, grand staircase, chandelier casting prismatic light, 1920s glamour photography style', author: 'Max T.', authorInitials: 'MT', rating: 4.6, useCount: 2945, tags: ['architecture', 'luxury'] },
  { id: '6', text: 'Samurai standing in a field of tall grass, full moon behind creating a dramatic silhouette, wind blowing their hair and garments, ukiyo-e meets photorealistic style', author: 'Yuki S.', authorInitials: 'YS', rating: 4.8, useCount: 4756, tags: ['japanese', 'dramatic'] },
];

// ============================================
// Animation Variants
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

const tabContentVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

// ============================================
// Reusable Sub-Components
// ============================================
function GlassSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/90 focus:border-violet-500/50 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="" className="bg-[#0a0a0f]">Select {label.toLowerCase()}...</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0a0f]">{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white/60 hover:text-white transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </motion.button>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3 h-3',
            i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-white/15'
          )}
        />
      ))}
      <span className="text-[11px] text-white/40 ml-1">{rating}</span>
    </div>
  );
}

// ============================================
// Tab: Library
// ============================================
function LibraryTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    Object.fromEntries(samplePrompts.map((p) => [p.id, p.isFavorite]))
  );

  const filteredPrompts = samplePrompts.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Search & Filter */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/90 placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="appearance-none bg-white/[0.05] border border-white/[0.1] rounded-xl pl-4 pr-10 py-2.5 text-sm text-white/70 focus:border-violet-500/50 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#0a0a0f]">All Types</option>
            <option value="image" className="bg-[#0a0a0f]">Image</option>
            <option value="video" className="bg-[#0a0a0f]">Video</option>
            <option value="audio" className="bg-[#0a0a0f]">Audio</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
      </motion.div>

      {/* Category Chips */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border',
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border-violet-500/40 text-white'
                : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]'
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Prompts Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              className="glass rounded-2xl p-4 space-y-3 group hover:border-white/[0.15] transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Prompt Text */}
              <p className="text-sm text-white/75 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                {prompt.text}
              </p>

              {/* Category & Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-violet-300 border border-violet-500/20 uppercase tracking-wider">
                  {prompt.category}
                </span>
                {prompt.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-0.5 text-[10px] text-white/30">
                    <Hash className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] text-white/35">
                  <BarChart3 className="w-3 h-3" />
                  {prompt.usageCount.toLocaleString()} uses
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setFavorites((prev) => ({ ...prev, [prompt.id]: !prev[prompt.id] }))
                    }
                    className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className={cn(
                        'w-3.5 h-3.5 transition-colors',
                        favorites[prompt.id]
                          ? 'text-rose-400 fill-rose-400'
                          : 'text-white/30 hover:text-rose-400'
                      )}
                    />
                  </button>
                  <CopyButton text={prompt.text} />
                  <motion.button
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-cyan-500/20 hover:from-violet-600/50 hover:to-cyan-500/40 border border-violet-500/20 text-xs text-white/80 hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-3 h-3" />
                    Use
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Tab: Builder
// ============================================
function BuilderTab() {
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [setting, setSetting] = useState('');
  const [lighting, setLighting] = useState('');
  const [camera, setCamera] = useState('');
  const [mood, setMood] = useState('');
  const [builtPrompt, setBuiltPrompt] = useState('');

  const buildPrompt = () => {
    const parts = [
      subject,
      style && `${style} style`,
      setting && `set in ${setting}`,
      lighting && `with ${lighting} lighting`,
      camera && `${camera} shot`,
      mood && `${mood} atmosphere`,
    ].filter(Boolean);
    setBuiltPrompt(parts.join(', '));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Subject Input */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Describe the main subject... (e.g., A majestic eagle soaring over mountains)"
          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-colors"
        />
      </motion.div>

      {/* Dropdowns Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassSelect label="Style" options={builderOptions.styles} value={style} onChange={setStyle} />
        <GlassSelect label="Setting" options={builderOptions.settings} value={setting} onChange={setSetting} />
        <GlassSelect label="Lighting" options={builderOptions.lighting} value={lighting} onChange={setLighting} />
        <GlassSelect label="Camera Angle" options={builderOptions.cameras} value={camera} onChange={setCamera} />
        <GlassSelect label="Mood" options={builderOptions.moods} value={mood} onChange={setMood} />
      </motion.div>

      {/* Build Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          onClick={buildPrompt}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wand2 className="w-4 h-4" />
          Build Prompt
        </motion.button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {builtPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Generated Prompt
            </label>
            <div className="glass rounded-2xl p-5 relative group">
              <p className="text-sm text-white/80 leading-relaxed pr-8">{builtPrompt}</p>
              <div className="absolute top-4 right-4">
                <CopyButton text={builtPrompt} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// Tab: Generator
// ============================================
function GeneratorTab() {
  const [idea, setIdea] = useState('');
  const [stylePreference, setStylePreference] = useState('any');
  const [showResults, setShowResults] = useState(false);

  const styleOptions = ['Any Style', 'Photorealistic', 'Artistic', 'Anime', 'Cinematic', 'Abstract'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Input */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          What do you want to create?
        </label>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your idea in a few words... (e.g., epic dragon battle)"
          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white/90 placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-colors"
        />
      </motion.div>

      {/* Style Preference */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Style Preference</label>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStylePreference(s.toLowerCase().replace(' ', '-'))}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 border',
                stylePreference === s.toLowerCase().replace(' ', '-')
                  ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border-violet-500/40 text-white'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          onClick={() => setShowResults(true)}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-4 h-4" />
          Generate Prompts
        </motion.button>
      </motion.div>

      {/* Generated Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Prompt Suggestions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedPrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-4 space-y-3 group hover:border-white/[0.15] transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500/30 to-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-violet-300">
                      {index + 1}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Suggestion</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{prompt}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <CopyButton text={prompt} />
                    <motion.button
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-cyan-500/20 hover:from-violet-600/50 hover:to-cyan-500/40 border border-violet-500/20 text-xs text-white/80 hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-3 h-3" />
                      Use
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// Tab: Optimizer
// ============================================
function OptimizerTab() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [optimized, setOptimized] = useState(false);

  const originalPromptText = 'a cat sitting on a chair in a room with nice lighting';
  const optimizedPromptText =
    'A majestic domestic cat with detailed fur texture, perched elegantly on a vintage velvet armchair, warm ambient interior setting with soft golden hour light streaming through sheer curtains, shallow depth of field, professional photography, 8K ultra-detailed, photorealistic';

  const scores = [
    { label: 'Clarity', score: 92, color: 'from-emerald-500 to-teal-500' },
    { label: 'Detail', score: 88, color: 'from-violet-500 to-fuchsia-500' },
    { label: 'Effectiveness', score: 95, color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Input */}
      <motion.div variants={itemVariants} className="space-y-1.5">
        <label className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-violet-400" />
          Paste your prompt
        </label>
        <textarea
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Paste a prompt you want to improve... (e.g., a cat sitting on a chair)"
          rows={4}
          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-colors resize-none"
        />
      </motion.div>

      {/* Optimize Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          onClick={() => setOptimized(true)}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          Optimize Prompt
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {optimized && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Score Badges */}
            <div className="flex flex-wrap gap-3">
              {scores.map((s) => (
                <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3 min-w-[140px]">
                  <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-sm font-bold text-white', s.color)}>
                    {s.score}
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{s.label}</p>
                    <div className="w-16 h-1.5 rounded-full bg-white/[0.08] mt-1 overflow-hidden">
                      <motion.div
                        className={cn('h-full rounded-full bg-gradient-to-r', s.color)}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.score}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Before / After */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  Original
                </p>
                <div className="glass rounded-2xl p-4">
                  <p className="text-sm text-white/50 leading-relaxed">{originalPromptText}</p>
                </div>
              </div>

              {/* After */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Optimized
                </p>
                <div className="glass rounded-2xl p-4 border-emerald-500/20 relative">
                  <p className="text-sm text-white/80 leading-relaxed pr-8">{optimizedPromptText}</p>
                  <div className="absolute top-3 right-3">
                    <CopyButton text={optimizedPromptText} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// Tab: Community
// ============================================
function CommunityTab() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {communityPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              className="glass rounded-2xl p-4 space-y-3 group hover:border-white/[0.15] transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Author Row */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[11px] font-bold text-white">
                  {prompt.authorInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/80 truncate">{prompt.author}</p>
                  <StarRating rating={prompt.rating} />
                </div>
              </div>

              {/* Prompt Text */}
              <p className="text-sm text-white/65 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                {prompt.text}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/35 border border-white/[0.06]"
                  >
                    <Hash className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] text-white/35">
                  <TrendingUp className="w-3 h-3" />
                  {prompt.useCount.toLocaleString()} uses
                </div>
                <div className="flex items-center gap-1.5">
                  <CopyButton text={prompt.text} />
                  <motion.button
                    className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/50 hover:text-amber-400 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Save prompt"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Main Page Component
// ============================================
export default function PromptStudioPage() {
  const [activeTab, setActiveTab] = useState<TabId>('library');

  const tabComponents: Record<TabId, React.ReactNode> = {
    library: <LibraryTab />,
    builder: <BuilderTab />,
    generator: <GeneratorTab />,
    optimizer: <OptimizerTab />,
    community: <CommunityTab />,
  };

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ============================================
            Header
           ============================================ */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                Prompt Studio
              </h1>
              <p className="text-sm text-white/50">
                Craft, optimize, and discover powerful prompts
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'text-white'
                      : 'text-white/45 hover:text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="prompt-tab-active"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/15 border border-violet-500/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={cn('w-4 h-4 relative z-10', isActive && 'text-violet-400')} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================
            Tab Content
           ============================================ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
