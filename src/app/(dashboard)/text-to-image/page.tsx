'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Image,
  Sparkles,
  Shuffle,
  Clock,
  ChevronDown,
  ChevronUp,
  Settings2,
  Ratio,
  SlidersHorizontal,
  Dice1,
  Upload,
  Download,
  ArrowUpCircle,
  Heart,
  RefreshCw,
  Trash2,
  Loader2,
  Wand2,
  Camera,
  Sun,
  X,
  Check,
  Zap,
  Crown,
  Star,
  ImagePlus,
  Layers,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────

const AI_MODELS = [
  { id: 'flux-pro', name: 'Flux Pro', provider: 'Black Forest Labs', credits: 5, badge: 'Popular', badgeColor: 'from-violet-500 to-fuchsia-500' },
  { id: 'stability-xl', name: 'Stability XL', provider: 'Stability AI', credits: 4, badge: 'Fast', badgeColor: 'from-cyan-500 to-blue-500' },
  { id: 'dall-e-3', name: 'DALL·E 3', provider: 'OpenAI', credits: 6, badge: 'Premium', badgeColor: 'from-emerald-500 to-teal-500' },
  { id: 'midjourney-v6', name: 'Midjourney v6', provider: 'Midjourney', credits: 8, badge: 'Best', badgeColor: 'from-amber-500 to-orange-500' },
  { id: 'ideogram-v2', name: 'Ideogram v2', provider: 'Ideogram', credits: 4, badge: 'Text', badgeColor: 'from-pink-500 to-rose-500' },
  { id: 'leonardo-ai', name: 'Leonardo AI', provider: 'Leonardo', credits: 3, badge: 'Value', badgeColor: 'from-indigo-500 to-purple-500' },
];

const STYLES = [
  'Realistic', 'Anime', 'Pixar', 'Disney', 'Cinematic', 'Photorealistic',
  '3D Render', 'Fantasy', 'Architecture', 'Product Photo', 'Fashion', 'Portrait',
  'Concept Art', 'UI Design', 'Logo', 'Sticker', 'Comic', 'Manga',
  'Interior', 'Food Photo', 'Landscape', 'Macro',
];

const ASPECT_RATIOS = [
  { label: '1:1', width: 1, height: 1 },
  { label: '4:3', width: 4, height: 3 },
  { label: '3:4', width: 3, height: 4 },
  { label: '16:9', width: 16, height: 9 },
  { label: '9:16', width: 9, height: 16 },
  { label: '21:9', width: 21, height: 9 },
];

const RESOLUTIONS = [
  '512×512', '768×768', '1024×1024', '1280×1280', '1536×1536', '2048×2048', '4096×4096',
];

const QUALITY_OPTIONS = ['Draft', 'Standard', 'High', 'Ultra'];

const SAMPLING_METHODS = ['Euler', 'Euler a', 'DPM++ 2M', 'DPM++ 2M Karras', 'DPM++ SDE', 'DDIM', 'UniPC', 'LMS'];

const CAMERA_LENSES = ['Standard', 'Wide Angle', 'Telephoto', 'Macro', 'Fisheye', 'Tilt-Shift'];

const LIGHTING_OPTIONS = ['Natural', 'Studio', 'Dramatic', 'Neon', 'Golden Hour', 'Blue Hour', 'Rembrandt', 'Volumetric'];

const MOCK_PROMPTS = [
  'A futuristic city at sunset with flying cars and neon lights reflecting off glass towers',
  'An ethereal forest with bioluminescent mushrooms and fireflies, cinematic lighting',
  'A cyberpunk samurai standing in the rain, neon signs behind, ultra detailed',
  'A serene Japanese garden with cherry blossoms falling into a koi pond, golden hour',
  'A majestic dragon perched on a crystal mountain under aurora borealis',
  'A steampunk airship flying through cumulus clouds at dawn, volumetric lighting',
];

interface GeneratedImage {
  id: string;
  prompt: string;
  model: string;
  style: string;
  timestamp: Date;
  gradient: string;
  favorited: boolean;
}

const GRADIENTS = [
  'from-violet-600 via-purple-500 to-fuchsia-500',
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-rose-500 via-pink-500 to-fuchsia-500',
  'from-amber-500 via-orange-500 to-red-500',
  'from-indigo-500 via-violet-500 to-purple-500',
  'from-teal-400 via-cyan-400 to-blue-500',
  'from-fuchsia-600 via-pink-500 to-rose-400',
];

// ─── Component ───────────────────────────────────────────────────

export default function TextToImagePage() {
  // Form state
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);
  const [selectedModel, setSelectedModel] = useState('flux-pro');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [resolution, setResolution] = useState('1024×1024');
  const [quality, setQuality] = useState('High');
  const [imageCount, setImageCount] = useState(4);
  const [cfgScale, setCfgScale] = useState(7);
  const [samplingMethod, setSamplingMethod] = useState('DPM++ 2M Karras');
  const [seed, setSeed] = useState('');
  const [cameraLens, setCameraLens] = useState('Standard');
  const [lighting, setLighting] = useState('Natural');
  const [showModelSelector, setShowModelSelector] = useState(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentModel = AI_MODELS.find(m => m.id === selectedModel);

  // Handlers
  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      const newImages: GeneratedImage[] = Array.from({ length: imageCount }, (_, i) => ({
        id: `img-${Date.now()}-${i}`,
        prompt: prompt,
        model: currentModel?.name || 'Flux Pro',
        style: selectedStyle,
        timestamp: new Date(),
        gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
        favorited: false,
      }));

      setTimeout(() => {
        setGeneratedImages(prev => [...newImages, ...prev]);
        setIsGenerating(false);
        setProgress(0);
      }, 300);
    }, 3000);
  }, [prompt, isGenerating, imageCount, currentModel, selectedStyle]);

  const handleRandomPrompt = () => {
    setPrompt(MOCK_PROMPTS[Math.floor(Math.random() * MOCK_PROMPTS.length)]);
  };

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) return;
    setPrompt(prev => `${prev}, masterpiece, best quality, highly detailed, 8K resolution, photorealistic lighting, cinematic composition`);
  };

  const toggleFavorite = (id: string) => {
    setGeneratedImages(prev =>
      prev.map(img => img.id === id ? { ...img, favorited: !img.favorited } : img)
    );
  };

  const deleteImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  // ─── Render ──────────────────────────────────────────────────

  return (
    <div className="min-h-full relative">
      {/* Subtle gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-fuchsia-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 p-4 lg:p-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-500/20">
              <Image className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              <span className="gradient-text">Text to Image</span>
            </h1>
          </div>
          <p className="text-white/50 text-sm ml-[52px]">
            Transform your words into stunning visuals with AI
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ─── LEFT PANEL (Controls) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[420px] lg:min-w-[420px] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2 space-y-4"
          >
            {/* ── Prompt Input ── */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe your imagination..."
                rows={4}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/20 resize-none transition-all duration-300"
              />
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleEnhancePrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/10 text-xs text-white/60 hover:text-violet-400 transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Enhance
                </button>
                <button
                  onClick={handleRandomPrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-cyan-500/10 text-xs text-white/60 hover:text-cyan-400 transition-all duration-300"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Random
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-white/20 text-xs text-white/60 hover:text-white/80 transition-all duration-300">
                  <Clock className="w-3.5 h-3.5" />
                  History
                </button>
              </div>

              {/* Negative prompt toggle */}
              <button
                onClick={() => setShowNegativePrompt(!showNegativePrompt)}
                className="flex items-center gap-1.5 mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                {showNegativePrompt ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                Negative Prompt
              </button>
              <AnimatePresence>
                {showNegativePrompt && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={negativePrompt}
                      onChange={e => setNegativePrompt(e.target.value)}
                      placeholder="Things to avoid in the image..."
                      rows={2}
                      className="w-full mt-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 resize-none transition-all duration-300"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── AI Model Selector ── */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 block">
                AI Model
              </label>
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center', currentModel?.badgeColor)}>
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{currentModel?.name}</div>
                    <div className="text-xs text-white/40">{currentModel?.provider}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r text-white', currentModel?.badgeColor)}>
                    {currentModel?.badge}
                  </span>
                  <span className="text-xs text-white/50">{currentModel?.credits} cr</span>
                  <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', showModelSelector && 'rotate-180')} />
                </div>
              </button>

              <AnimatePresence>
                {showModelSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1">
                      {AI_MODELS.map(model => (
                        <button
                          key={model.id}
                          onClick={() => { setSelectedModel(model.id); setShowModelSelector(false); }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200',
                            selectedModel === model.id
                              ? 'bg-violet-500/10 border border-violet-500/30'
                              : 'hover:bg-white/[0.05] border border-transparent'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn('w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center', model.badgeColor)}>
                              <Zap className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="text-sm text-white">{model.name}</div>
                              <div className="text-[11px] text-white/35">{model.provider}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gradient-to-r text-white/90', model.badgeColor)}>
                              {model.badge}
                            </span>
                            <span className="text-xs text-white/40">{model.credits} cr</span>
                            {selectedModel === model.id && <Check className="w-4 h-4 text-violet-400" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Style Selector ── */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 block">
                Style
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {STYLES.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={cn(
                      'px-2 py-2 rounded-lg text-xs font-medium transition-all duration-300 border',
                      selectedStyle === style
                        ? 'bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border-violet-500/40 text-white shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                        : 'bg-white/[0.03] border-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/[0.06] hover:border-white/[0.12]'
                    )}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Settings Panel ── */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <Settings2 className="w-4 h-4 text-white/40" />
                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  Settings
                </label>
              </div>

              {/* Aspect Ratio */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Ratio className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-xs text-white/50">Aspect Ratio</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {ASPECT_RATIOS.map(ar => (
                    <button
                      key={ar.label}
                      onClick={() => setAspectRatio(ar.label)}
                      className={cn(
                        'flex flex-col items-center gap-1 py-2 rounded-lg border transition-all duration-200',
                        aspectRatio === ar.label
                          ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                          : 'bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06] hover:text-white/60'
                      )}
                    >
                      <div
                        className={cn(
                          'border rounded-[3px] transition-colors',
                          aspectRatio === ar.label ? 'border-violet-400' : 'border-white/30'
                        )}
                        style={{
                          width: `${Math.min(ar.width / Math.max(ar.width, ar.height) * 20, 20)}px`,
                          height: `${Math.min(ar.height / Math.max(ar.width, ar.height) * 20, 20)}px`,
                        }}
                      />
                      <span className="text-[10px] font-medium">{ar.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div>
                <span className="text-xs text-white/50 block mb-2">Resolution</span>
                <select
                  value={resolution}
                  onChange={e => setResolution(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {RESOLUTIONS.map(r => (
                    <option key={r} value={r} className="bg-[#1a1a2e] text-white">{r}</option>
                  ))}
                </select>
              </div>

              {/* Quality */}
              <div>
                <span className="text-xs text-white/50 block mb-2">Quality</span>
                <div className="grid grid-cols-4 gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                  {QUALITY_OPTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={cn(
                        'py-2 rounded-lg text-xs font-medium transition-all duration-200',
                        quality === q
                          ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Images */}
              <div>
                <span className="text-xs text-white/50 block mb-2">Number of Images</span>
                <div className="grid grid-cols-8 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <button
                      key={n}
                      onClick={() => setImageCount(n)}
                      className={cn(
                        'py-2 rounded-lg text-xs font-medium transition-all duration-200 border',
                        imageCount === n
                          ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                          : 'bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06] hover:text-white/60'
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* CFG Scale */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">CFG Scale</span>
                  <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">{cfgScale}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={cfgScale}
                  onChange={e => setCfgScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/[0.08] rounded-full appearance-none cursor-pointer accent-violet-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet-300 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-white/25">Creative</span>
                  <span className="text-[10px] text-white/25">Precise</span>
                </div>
              </div>

              {/* Sampling Method */}
              <div>
                <span className="text-xs text-white/50 block mb-2">Sampling Method</span>
                <select
                  value={samplingMethod}
                  onChange={e => setSamplingMethod(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {SAMPLING_METHODS.map(m => (
                    <option key={m} value={m} className="bg-[#1a1a2e] text-white">{m}</option>
                  ))}
                </select>
              </div>

              {/* Seed */}
              <div>
                <span className="text-xs text-white/50 block mb-2">Seed</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={seed}
                    onChange={e => setSeed(e.target.value)}
                    placeholder="Random"
                    className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none transition-all duration-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setSeed(String(Math.floor(Math.random() * 999999999)))}
                    className="px-3 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <Dice1 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Camera Lens */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Camera className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-xs text-white/50">Camera Lens</span>
                </div>
                <select
                  value={cameraLens}
                  onChange={e => setCameraLens(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {CAMERA_LENSES.map(l => (
                    <option key={l} value={l} className="bg-[#1a1a2e] text-white">{l}</option>
                  ))}
                </select>
              </div>

              {/* Lighting */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sun className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-xs text-white/50">Lighting</span>
                </div>
                <select
                  value={lighting}
                  onChange={e => setLighting(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {LIGHTING_OPTIONS.map(l => (
                    <option key={l} value={l} className="bg-[#1a1a2e] text-white">{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Reference Image ── */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 block">
                Reference Image
              </label>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); }}
                className={cn(
                  'border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer',
                  dragOver
                    ? 'border-violet-500/50 bg-violet-500/5'
                    : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                  dragOver ? 'bg-violet-500/20 text-violet-400' : 'bg-white/[0.05] text-white/30'
                )}>
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs text-white/40">Drop image here or</span>
                <span className="text-xs text-violet-400 hover:text-violet-300">Browse files</span>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
              </div>
            </div>

            {/* ── Generate Button ── */}
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              whileHover={!isGenerating && prompt.trim() ? { scale: 1.02 } : {}}
              whileTap={!isGenerating && prompt.trim() ? { scale: 0.98 } : {}}
              className={cn(
                'w-full relative overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2.5',
                isGenerating || !prompt.trim()
                  ? 'bg-white/[0.06] text-white/30 cursor-not-allowed border border-white/[0.06]'
                  : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]'
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate</span>
                  <span className="ml-1 text-xs opacity-70">• {(currentModel?.credits || 5) * imageCount} credits</span>
                </>
              )}

              {/* Progress bar overlay */}
              {isGenerating && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-400 to-cyan-400"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          </motion.div>

          {/* ─── RIGHT PANEL (Results) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-white/40" />
                <h2 className="text-sm font-semibold text-white/70">Generated Images</h2>
                {generatedImages.length > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium">
                    {generatedImages.length}
                  </span>
                )}
              </div>
            </div>

            {/* Generation progress card */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="bg-white/[0.03] backdrop-blur-xl border border-violet-500/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                        <Wand2 className="w-5 h-5 text-violet-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Creating your images...</div>
                        <div className="text-xs text-white/40">{currentModel?.name} • {selectedStyle} style</div>
                      </div>
                      <div className="ml-auto text-sm font-mono text-violet-400">
                        {Math.min(Math.round(progress), 100)}%
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-white/30">Processing {imageCount} images</span>
                      <span className="text-[10px] text-white/30">Est. ~3s remaining</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results grid or empty state */}
            {generatedImages.length === 0 && !isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl flex flex-col items-center justify-center py-24 px-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-white/[0.06] flex items-center justify-center mb-5">
                  <ImagePlus className="w-9 h-9 text-white/20" />
                </div>
                <h3 className="text-lg font-semibold text-white/30 mb-2">Your creations will appear here</h3>
                <p className="text-sm text-white/20 max-w-[300px] text-center">
                  Write a prompt and click Generate to create stunning AI-powered images
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {generatedImages.map((img, index) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 200, damping: 25 }}
                      className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
                      onMouseEnter={() => setHoveredImage(img.id)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      {/* Gradient placeholder image */}
                      <div className={cn('aspect-square bg-gradient-to-br', img.gradient, 'relative')}>
                        {/* Subtle noise texture overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50" />

                        {/* Hover overlay with actions */}
                        <AnimatePresence>
                          {hoveredImage === img.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                            >
                              <div className="flex gap-2">
                                {[
                                  { icon: Download, label: 'Download', color: 'hover:bg-white/20' },
                                  { icon: ArrowUpCircle, label: 'Upscale', color: 'hover:bg-violet-500/30' },
                                  { icon: Heart, label: 'Favorite', color: img.favorited ? 'bg-rose-500/20 text-rose-400' : 'hover:bg-rose-500/20', onClick: () => toggleFavorite(img.id) },
                                  { icon: RefreshCw, label: 'Regenerate', color: 'hover:bg-cyan-500/20' },
                                  { icon: Trash2, label: 'Delete', color: 'hover:bg-red-500/20', onClick: () => deleteImage(img.id) },
                                ].map(action => (
                                  <motion.button
                                    key={action.label}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={action.onClick}
                                    className={cn(
                                      'w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 transition-all duration-200',
                                      action.color
                                    )}
                                    title={action.label}
                                  >
                                    <action.icon className="w-4 h-4" />
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Image info */}
                      <div className="p-3">
                        <p className="text-xs text-white/60 line-clamp-2 mb-2 leading-relaxed">
                          {img.prompt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/40 font-medium">
                            {img.model}
                          </span>
                          <span className="text-[10px] text-white/25">
                            {img.style}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
