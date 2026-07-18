'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpCircle,
  Upload,
  Download,
  Eye,
  Diamond,
  VolumeX,
  Palette,
  Smile,
  GripVertical,
  Check,
  Sparkles,
  Zap,
  ImageIcon,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================
interface ScaleOption {
  scale: number;
  outputWidth: number;
  outputHeight: number;
  credits: number;
}

interface EnhancementOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

interface UpscaledResult {
  id: string;
  originalDimensions: string;
  upscaledDimensions: string;
  scale: number;
  createdAt: string;
}

// ============================================
// Data
// ============================================
const scaleOptions: ScaleOption[] = [
  { scale: 2, outputWidth: 2048, outputHeight: 2048, credits: 2 },
  { scale: 4, outputWidth: 4096, outputHeight: 4096, credits: 3 },
  { scale: 8, outputWidth: 8192, outputHeight: 8192, credits: 5 },
  { scale: 16, outputWidth: 16384, outputHeight: 16384, credits: 8 },
];

const initialEnhancements: EnhancementOption[] = [
  {
    id: 'face',
    label: 'Restore Face',
    description: 'Enhance and repair facial features using AI detection',
    icon: Smile,
    enabled: true,
  },
  {
    id: 'details',
    label: 'Restore Details',
    description: 'Recover fine textures and intricate details lost in compression',
    icon: Eye,
    enabled: true,
  },
  {
    id: 'sharpen',
    label: 'Sharpen',
    description: 'Apply intelligent edge sharpening for crisp output',
    icon: Diamond,
    enabled: false,
  },
  {
    id: 'noise',
    label: 'Noise Reduction',
    description: 'Remove grain and digital noise while preserving detail',
    icon: VolumeX,
    enabled: false,
  },
  {
    id: 'color',
    label: 'Color Correction',
    description: 'Auto-adjust white balance, contrast, and saturation',
    icon: Palette,
    enabled: false,
  },
];

const mockResults: UpscaledResult[] = [
  { id: '1', originalDimensions: '512×512', upscaledDimensions: '2048×2048', scale: 4, createdAt: '2 min ago' },
  { id: '2', originalDimensions: '640×480', upscaledDimensions: '2560×1920', scale: 4, createdAt: '15 min ago' },
  { id: '3', originalDimensions: '1024×768', upscaledDimensions: '4096×3072', scale: 4, createdAt: '1 hour ago' },
  { id: '4', originalDimensions: '800×600', upscaledDimensions: '6400×4800', scale: 8, createdAt: '3 hours ago' },
];

// ============================================
// Animation Variants
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// ============================================
// Toggle Switch Component
// ============================================
function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0',
        enabled
          ? 'bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20'
          : 'bg-white/[0.1]'
      )}
      aria-label="Toggle enhancement"
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
        animate={{ left: enabled ? '22px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

// ============================================
// Page Component
// ============================================
export default function UpscalerPage() {
  const [hasImage, setHasImage] = useState(false);
  const [selectedScale, setSelectedScale] = useState(1);
  const [enhancements, setEnhancements] = useState(initialEnhancements);
  const [isDragging, setIsDragging] = useState(false);

  const activeScale = scaleOptions[selectedScale];
  const totalCredits = activeScale.credits;

  const toggleEnhancement = (id: string) => {
    setEnhancements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e))
    );
  };

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ============================================
            Header
           ============================================ */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <ArrowUpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                Image Upscaler
              </h1>
              <p className="text-sm text-white/50">
                Enhance your images with AI-powered upscaling
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================
            Upload Zone
           ============================================ */}
        <motion.div variants={itemVariants}>
          <div className="glass rounded-2xl p-1">
            <AnimatePresence mode="wait">
              {!hasImage ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer group',
                    isDragging
                      ? 'border-violet-500/60 bg-violet-500/[0.06]'
                      : 'border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.02]'
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    setHasImage(true);
                  }}
                  onClick={() => setHasImage(true)}
                >
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    >
                      <Upload className="w-7 h-7 text-white/40 group-hover:text-violet-400 transition-colors" />
                    </motion.div>
                    <p className="text-lg font-semibold text-white/80 mb-1">
                      Drop your image here
                    </p>
                    <p className="text-sm text-white/40 mb-4">
                      or{' '}
                      <span className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-2 decoration-violet-400/40">
                        browse files
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      {['PNG', 'JPEG', 'WEBP'].map((fmt) => (
                        <span
                          key={fmt}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/[0.06] text-white/40 border border-white/[0.06]"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  {/* Mock uploaded image */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-violet-900/40 via-fuchsia-900/30 to-cyan-900/40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                    <div className="relative flex flex-col items-center gap-3">
                      <ImageIcon className="w-12 h-12 text-white/20" />
                      <p className="text-sm text-white/40 font-medium">uploaded_image.png</p>
                    </div>
                    {/* Dimensions badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.1] text-xs font-medium text-white/70">
                      1024 × 1024
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHasImage(false);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/30 transition-all"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ============================================
            Scale Selector
           ============================================ */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            Upscale Factor
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {scaleOptions.map((option, index) => (
              <motion.button
                key={option.scale}
                onClick={() => setSelectedScale(index)}
                className={cn(
                  'relative rounded-xl p-4 text-center transition-all duration-300 border',
                  selectedScale === index
                    ? 'bg-gradient-to-br from-violet-500/15 to-cyan-500/10 border-violet-500/40 shadow-lg shadow-violet-500/10'
                    : 'glass glass-hover border-white/[0.08]'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedScale === index && (
                  <motion.div
                    layoutId="scale-active"
                    className="absolute inset-0 rounded-xl gradient-border"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <p className={cn(
                    'text-2xl font-bold mb-1',
                    selectedScale === index ? 'gradient-text' : 'text-white/80'
                  )}>
                    {option.scale}×
                  </p>
                  <p className="text-xs text-white/40">
                    {option.outputWidth.toLocaleString()} × {option.outputHeight.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-white/30 mt-1">
                    {option.credits} credits
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ============================================
            Enhancement Options
           ============================================ */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Enhancement Options
          </h2>
          <div className="glass rounded-2xl divide-y divide-white/[0.06]">
            {enhancements.map((enhancement) => {
              const Icon = enhancement.icon;
              return (
                <div
                  key={enhancement.id}
                  className="flex items-center justify-between px-5 py-4 group hover:bg-white/[0.02] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300',
                      enhancement.enabled
                        ? 'bg-gradient-to-br from-violet-500/20 to-cyan-500/15 text-violet-400'
                        : 'bg-white/[0.05] text-white/30'
                    )}>
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className={cn(
                        'text-sm font-medium transition-colors',
                        enhancement.enabled ? 'text-white' : 'text-white/60'
                      )}>
                        {enhancement.label}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5 max-w-xs">
                        {enhancement.description}
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={enhancement.enabled}
                    onToggle={() => toggleEnhancement(enhancement.id)}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================
            Before / After Preview
           ============================================ */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            Preview Comparison
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="relative flex h-56 md:h-72">
              {/* Before */}
              <div className="flex-1 relative bg-gradient-to-br from-slate-800/60 via-zinc-800/40 to-neutral-800/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <ImageIcon className="w-10 h-10" />
                    <p className="text-xs font-medium">Low Resolution</p>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-semibold text-white/80 border border-white/[0.1]">
                  Before
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[11px] text-white/50 border border-white/[0.08]">
                  1024 × 1024
                </div>
              </div>

              {/* Divider */}
              <div className="relative w-px bg-white/20 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                  <GripVertical className="w-3.5 h-3.5 text-white/70" />
                </div>
              </div>

              {/* After */}
              <div className="flex-1 relative bg-gradient-to-br from-violet-900/40 via-cyan-900/30 to-fuchsia-900/40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Sparkles className="w-10 h-10" />
                    <p className="text-xs font-medium">Enhanced</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-violet-600/80 to-cyan-500/80 backdrop-blur-sm text-xs font-semibold text-white border border-white/[0.15]">
                  After
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[11px] text-white/50 border border-white/[0.08]">
                  {activeScale.outputWidth.toLocaleString()} × {activeScale.outputHeight.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================
            Upscale Button
           ============================================ */}
        <motion.div variants={itemVariants}>
          <motion.button
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-base shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300 flex items-center justify-center gap-3 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <ArrowUpCircle className="w-5 h-5 group-hover:animate-pulse" />
            Upscale Image
            <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-sm font-medium">
              {totalCredits} credits
            </span>
          </motion.button>
        </motion.div>

        {/* ============================================
            Results Grid
           ============================================ */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Recent Results
            </h2>
            <span className="text-xs text-white/30">{mockResults.length} images</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockResults.map((result, index) => (
              <motion.div
                key={result.id}
                className="glass rounded-2xl overflow-hidden group hover:border-white/[0.15] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Thumbnail */}
                <div className="h-36 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-cyan-900/25 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/15" />
                  </div>
                  {/* Scale badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-600/90 to-cyan-500/90 text-[11px] font-bold text-white">
                    {result.scale}× upscaled
                  </div>
                </div>
                {/* Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-white/40 mb-0.5">Original</p>
                      <p className="text-white/70 font-medium">{result.originalDimensions}</p>
                    </div>
                    <div className="text-white/20">→</div>
                    <div className="text-right">
                      <p className="text-white/40 mb-0.5">Upscaled</p>
                      <p className="gradient-text font-semibold">{result.upscaledDimensions}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/30">{result.createdAt}</span>
                    <motion.button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white/60 hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
