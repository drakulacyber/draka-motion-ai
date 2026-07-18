'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Sparkles, Shuffle, Wand2, Play, ChevronDown, ChevronUp,
  Camera, MoveHorizontal, MoveVertical, ZoomIn, ZoomOut, Orbit,
  Plane, Crosshair, Hand, ChevronsRight, ArrowUpFromLine, Pause,
  ToggleLeft, ToggleRight, Loader2, Clock, Zap, Film, Settings2,
  Music, Mic2, Volume2, Type, Hash, Dices, AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  CameraMovement, VideoDuration, VideoFPS, VideoResolution,
} from '@/types';

// ============================================
// AI Model Data
// ============================================
interface VideoModel {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  creditCost: number;
  maxDuration: string;
  icon: string;
}

const videoModels: VideoModel[] = [
  { id: 'kling-v2', name: 'Kling v2', provider: 'Kuaishou', providerColor: 'from-blue-400 to-blue-600', creditCost: 20, maxDuration: '60s', icon: '🎬' },
  { id: 'runway-gen4', name: 'Runway Gen-4', provider: 'Runway', providerColor: 'from-purple-400 to-purple-600', creditCost: 25, maxDuration: '30s', icon: '🚀' },
  { id: 'pika-v2', name: 'Pika v2', provider: 'Pika Labs', providerColor: 'from-orange-400 to-orange-600', creditCost: 15, maxDuration: '15s', icon: '⚡' },
  { id: 'luma-dream', name: 'Luma Dream Machine', provider: 'Luma AI', providerColor: 'from-cyan-400 to-cyan-600', creditCost: 18, maxDuration: '20s', icon: '✨' },
  { id: 'hailuo', name: 'Hailuo', provider: 'MiniMax', providerColor: 'from-emerald-400 to-emerald-600', creditCost: 12, maxDuration: '15s', icon: '🌊' },
  { id: 'veo', name: 'Veo', provider: 'Google', providerColor: 'from-red-400 to-red-500', creditCost: 22, maxDuration: '30s', icon: '🎯' },
  { id: 'minimax', name: 'MiniMax', provider: 'MiniMax', providerColor: 'from-yellow-400 to-yellow-600', creditCost: 10, maxDuration: '10s', icon: '🔥' },
  { id: 'pixverse', name: 'PixVerse', provider: 'PixVerse', providerColor: 'from-pink-400 to-pink-600', creditCost: 14, maxDuration: '15s', icon: '💎' },
];

// ============================================
// Camera Movement Data
// ============================================
interface CameraOption {
  id: CameraMovement;
  label: string;
  icon: string;
}

const cameraOptions: CameraOption[] = [
  { id: 'static', label: 'Static', icon: '📷' },
  { id: 'pan-left', label: 'Pan Left', icon: '⬅️' },
  { id: 'pan-right', label: 'Pan Right', icon: '➡️' },
  { id: 'tilt-up', label: 'Tilt Up', icon: '⬆️' },
  { id: 'tilt-down', label: 'Tilt Down', icon: '⬇️' },
  { id: 'zoom-in', label: 'Zoom In', icon: '🔍' },
  { id: 'zoom-out', label: 'Zoom Out', icon: '🔎' },
  { id: 'orbit', label: 'Orbit', icon: '🔄' },
  { id: 'drone', label: 'Drone', icon: '🚁' },
  { id: 'tracking', label: 'Tracking', icon: '🎯' },
  { id: 'handheld', label: 'Handheld', icon: '✋' },
  { id: 'dolly', label: 'Dolly', icon: '🛤️' },
  { id: 'crane', label: 'Crane', icon: '🏗️' },
];

// ============================================
// Duration, FPS, Resolution options
// ============================================
const durationOptions: VideoDuration[] = [5, 10, 15, 20, 30, 60];
const fpsOptions: VideoFPS[] = [24, 30, 60];
const resolutionOptions: VideoResolution[] = ['720p', '1080p', '2K', '4K', '8K'];

const emotionOptions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Excited'];
const weatherOptions = ['Clear', 'Rain', 'Snow', 'Fog', 'Storm', 'Sunny'];
const timeOfDayOptions = ['Dawn', 'Morning', 'Noon', 'Afternoon', 'Sunset', 'Night'];

// ============================================
// Mock Results
// ============================================
interface VideoResult {
  id: string;
  prompt: string;
  duration: number;
  model: string;
  createdAt: string;
}

const mockResults: VideoResult[] = [
  { id: '1', prompt: 'Ocean waves crashing on a rocky cliff during golden hour, cinematic', duration: 10, model: 'Kling v2', createdAt: '2 hours ago' },
  { id: '2', prompt: 'A lone astronaut walking across a vast Martian desert', duration: 15, model: 'Runway Gen-4', createdAt: '5 hours ago' },
];

// ============================================
// Collapsible Section Component
// ============================================
function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-white/40" />
          <span className="text-sm font-medium text-white/80">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-white/30" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/30" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4 border-t border-white/[0.06]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Toggle Switch Component
// ============================================
function ToggleSwitch({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">{label}</span>
      <button
        onClick={onToggle}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          enabled ? 'bg-violet-500' : 'bg-white/[0.1]'
        )}
        aria-label={`Toggle ${label}`}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

// ============================================
// Main Page Component
// ============================================
export default function TextToVideoPage() {
  // Form State
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('kling-v2');
  const [duration, setDuration] = useState<VideoDuration>(10);
  const [fps, setFps] = useState<VideoFPS>(30);
  const [resolution, setResolution] = useState<VideoResolution>('1080p');
  const [cameraMovement, setCameraMovement] = useState<CameraMovement>('static');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState<number | ''>('');

  // Advanced options
  const [characterConsistency, setCharacterConsistency] = useState(false);
  const [motionControl, setMotionControl] = useState(5);
  const [lipSync, setLipSync] = useState(false);
  const [emotion, setEmotion] = useState('Neutral');
  const [weather, setWeather] = useState('Clear');
  const [timeOfDay, setTimeOfDay] = useState('Morning');

  // Audio
  const [soundPrompt, setSoundPrompt] = useState('');
  const [musicPrompt, setMusicPrompt] = useState('');
  const [narrationPrompt, setNarrationPrompt] = useState('');
  const [voicePrompt, setVoicePrompt] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const currentModel = videoModels.find((m) => m.id === selectedModel);
  const creditCost = currentModel?.creditCost ?? 20;

  const getDurationMultiplier = (d: VideoDuration) => {
    const map: Record<VideoDuration, number> = { 5: 1, 10: 1.5, 15: 2, 20: 2.5, 30: 3, 60: 5 };
    return map[d];
  };

  const handleRandomPrompt = useCallback(() => {
    const prompts = [
      'A majestic dragon soaring through a thunderstorm, lightning illuminating its scales, cinematic 4K',
      'Timelapse of a flower blooming in a magical forest with floating particles of light',
      'Underwater scene of a coral reef with colorful fish swimming, volumetric lighting',
      'A cyberpunk city street at night with flying cars and holographic billboards',
      'Northern lights dancing over a frozen lake in Iceland, long exposure style',
      'A samurai standing in a field of cherry blossoms, wind blowing petals, slow motion',
    ];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleRandomSeed = useCallback(() => {
    setSeed(Math.floor(Math.random() * 999999999));
  }, []);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    setStatusText('Initializing model...');

    const steps = [
      { p: 15, t: 'Loading model weights...' },
      { p: 35, t: 'Processing prompt...' },
      { p: 55, t: 'Generating keyframes...' },
      { p: 75, t: 'Interpolating frames...' },
      { p: 90, t: 'Applying post-processing...' },
      { p: 100, t: 'Complete!' },
    ];

    steps.forEach(({ p, t }, i) => {
      setTimeout(() => {
        setProgress(p);
        setStatusText(t);
        if (p === 100) {
          setTimeout(() => {
            setIsGenerating(false);
            setProgress(0);
            setStatusText('');
          }, 1000);
        }
      }, (i + 1) * 1200);
    });
  }, [prompt]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="min-h-full p-4 lg:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20">
            <Video className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">Text to Video</span>
            </h1>
            <p className="text-sm text-white/40">Transform your ideas into stunning AI-generated videos</p>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr,1fr] gap-6">
        {/* ==========================================
            LEFT PANEL — Controls
            ========================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {/* 1. Prompt Input */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Type className="w-4 h-4 text-violet-400" />
                Prompt
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPrompt((prev) => prev + ' [enhanced, cinematic, high quality, detailed]')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500/15 to-cyan-500/15 border border-violet-500/20 text-xs font-medium text-violet-300 hover:from-violet-500/25 hover:to-cyan-500/25 transition-all"
                >
                  <Wand2 className="w-3 h-3" />
                  Enhance
                </button>
                <button
                  onClick={handleRandomPrompt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                >
                  <Shuffle className="w-3 h-3" />
                  Random
                </button>
              </div>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video scene in detail..."
              rows={4}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 resize-none focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all"
            />
            <p className="mt-2 text-xs text-white/30">
              {prompt.length} characters · Be descriptive for best results
            </p>
          </motion.div>

          {/* 2. AI Model Selector */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Model
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {videoModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={cn(
                    'relative flex flex-col items-start gap-1.5 p-3 rounded-xl border transition-all duration-200 text-left',
                    selectedModel === model.id
                      ? 'bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-violet-500/30 shadow-lg shadow-violet-500/5'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg">{model.icon}</span>
                    <span className="text-sm font-medium text-white/90 truncate">{model.name}</span>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <span className={cn('px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-gradient-to-r text-white', model.providerColor)}>
                      {model.provider}
                    </span>
                    <span className="text-[10px] text-white/30 ml-auto">{model.maxDuration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400/80">
                    <Zap className="w-2.5 h-2.5" />
                    {model.creditCost} credits
                  </div>
                  {selectedModel === model.id && (
                    <motion.div
                      layoutId="model-indicator"
                      className="absolute inset-0 rounded-xl border-2 border-violet-500/40 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 3. Duration */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-emerald-400" />
              Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                    duration === d
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 border-transparent text-white shadow-lg shadow-violet-500/20'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08]'
                  )}
                >
                  {d}s
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400/60" />
              Credit multiplier: ×{getDurationMultiplier(duration)}
            </p>
          </motion.div>

          {/* 4. FPS */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Film className="w-4 h-4 text-fuchsia-400" />
              Frame Rate (FPS)
            </label>
            <div className="flex rounded-xl overflow-hidden border border-white/[0.08]">
              {fpsOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setFps(f)}
                  className={cn(
                    'flex-1 py-2.5 text-sm font-medium transition-all duration-200',
                    fps === f
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
                      : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/80'
                  )}
                >
                  {f} fps
                </button>
              ))}
            </div>
          </motion.div>

          {/* 5. Resolution */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-sky-400" />
              Resolution
            </label>
            <div className="flex flex-wrap gap-2">
              {resolutionOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setResolution(r)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                    resolution === r
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 border-transparent text-white shadow-lg shadow-violet-500/20'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08]'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 6. Camera Movement */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-orange-400" />
              Camera Movement
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {cameraOptions.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setCameraMovement(cam.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-200',
                    cameraMovement === cam.id
                      ? 'bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border-violet-500/30 text-white'
                      : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:bg-white/[0.05] hover:text-white/70'
                  )}
                >
                  <span className="text-base">{cam.icon}</span>
                  <span className="text-[10px] font-medium leading-tight text-center">{cam.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 7. Advanced Options */}
          <motion.div variants={itemVariants}>
            <CollapsibleSection title="Advanced Options" icon={Settings2}>
              <ToggleSwitch
                label="Character Consistency"
                enabled={characterConsistency}
                onToggle={() => setCharacterConsistency(!characterConsistency)}
              />

              {/* Motion Control Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Motion Control</span>
                  <span className="text-xs font-mono text-violet-400">{motionControl}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={motionControl}
                  onChange={(e) => setMotionControl(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-white/[0.1] accent-violet-500 cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-[10px] text-white/25">
                  <span>Subtle</span>
                  <span>Dramatic</span>
                </div>
              </div>

              <ToggleSwitch
                label="Lip Sync"
                enabled={lipSync}
                onToggle={() => setLipSync(!lipSync)}
              />

              {/* Emotion */}
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Emotion</label>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer"
                >
                  {emotionOptions.map((e) => (
                    <option key={e} value={e} className="bg-[#12121a] text-white">{e}</option>
                  ))}
                </select>
              </div>

              {/* Weather */}
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Weather</label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer"
                >
                  {weatherOptions.map((w) => (
                    <option key={w} value={w} className="bg-[#12121a] text-white">{w}</option>
                  ))}
                </select>
              </div>

              {/* Time of Day */}
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Time of Day</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none appearance-none cursor-pointer"
                >
                  {timeOfDayOptions.map((t) => (
                    <option key={t} value={t} className="bg-[#12121a] text-white">{t}</option>
                  ))}
                </select>
              </div>
            </CollapsibleSection>
          </motion.div>

          {/* 8. Audio */}
          <motion.div variants={itemVariants}>
            <CollapsibleSection title="Audio" icon={Volume2}>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block flex items-center gap-1.5">
                  <Volume2 className="w-3 h-3" />
                  Sound Effect Prompt
                </label>
                <input
                  type="text"
                  value={soundPrompt}
                  onChange={(e) => setSoundPrompt(e.target.value)}
                  placeholder="e.g., thunder, rain, footsteps..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block flex items-center gap-1.5">
                  <Music className="w-3 h-3" />
                  Music Prompt
                </label>
                <input
                  type="text"
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  placeholder="e.g., epic orchestral, ambient electronic..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block flex items-center gap-1.5">
                  <Mic2 className="w-3 h-3" />
                  Narration Prompt
                </label>
                <input
                  type="text"
                  value={narrationPrompt}
                  onChange={(e) => setNarrationPrompt(e.target.value)}
                  placeholder="e.g., calm male narrator, documentary style..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block flex items-center gap-1.5">
                  <Mic2 className="w-3 h-3" />
                  Voice Prompt
                </label>
                <input
                  type="text"
                  value={voicePrompt}
                  onChange={(e) => setVoicePrompt(e.target.value)}
                  placeholder="e.g., dialogue, whisper, shout..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-all"
                />
              </div>
            </CollapsibleSection>
          </motion.div>

          {/* 9. Negative Prompt */}
          <motion.div variants={itemVariants}>
            <CollapsibleSection title="Negative Prompt" icon={AlertCircle}>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Describe what you DON'T want in the video..."
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 resize-none focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all"
              />
            </CollapsibleSection>
          </motion.div>

          {/* 10. Seed */}
          <motion.div variants={itemVariants} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <label className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-teal-400" />
              Seed
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Random"
                className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:outline-none transition-all font-mono"
              />
              <button
                onClick={handleRandomSeed}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
              >
                <Dices className="w-3.5 h-3.5" />
                Random
              </button>
            </div>
          </motion.div>

          {/* 11. Generate Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={cn(
                'w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-semibold transition-all duration-300',
                'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400',
                'text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Video
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 text-xs font-bold">
                    {creditCost} credits
                  </span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* ==========================================
            RIGHT PANEL — Preview & Results
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-5"
        >
          {/* Video Preview Area */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-violet-950/30 via-[#0a0a0f] to-cyan-950/30">
              {/* Subtle mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.06)_0%,transparent_50%)]" />

              {isGenerating ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/80">{statusText}</p>
                    <p className="text-xs text-white/40 mt-1">{progress}%</p>
                  </div>
                </motion.div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group cursor-pointer hover:bg-white/[0.08] transition-all">
                    <Play className="w-8 h-8 text-white/30 group-hover:text-white/60 transition-colors ml-1" />
                  </div>
                  <p className="text-sm text-white/30">Your generated video will appear here</p>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="px-5 py-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/60">{statusText}</span>
                  <span className="text-xs font-mono text-violet-400">{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generation Info */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Current Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Model:</span>
                <span className="text-xs font-medium text-white/70">{currentModel?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Duration:</span>
                <span className="text-xs font-medium text-white/70">{duration}s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">FPS:</span>
                <span className="text-xs font-medium text-white/70">{fps}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Resolution:</span>
                <span className="text-xs font-medium text-white/70">{resolution}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Camera:</span>
                <span className="text-xs font-medium text-white/70 capitalize">{cameraMovement.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Est. Cost:</span>
                <span className="text-xs font-semibold text-amber-400">{Math.round(creditCost * getDurationMultiplier(duration))} credits</span>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400" />
              Recent Generations
            </h3>

            {mockResults.length > 0 ? (
              <div className="space-y-3">
                {mockResults.map((result) => (
                  <motion.div
                    key={result.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-violet-900/40 to-cyan-900/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <Play className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                      <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-[9px] text-white/80 font-mono">
                        {result.duration}s
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 line-clamp-2 mb-1.5">{result.prompt}</p>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-violet-500/15 text-[9px] font-semibold text-violet-300">
                          {result.model}
                        </span>
                        <span className="text-[10px] text-white/25">{result.createdAt}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Video className="w-10 h-10 text-white/10 mx-auto mb-3" />
                <p className="text-sm text-white/30">No videos generated yet</p>
                <p className="text-xs text-white/20 mt-1">Enter a prompt and click Generate</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
