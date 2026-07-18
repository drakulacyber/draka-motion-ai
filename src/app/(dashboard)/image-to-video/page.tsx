'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film, Upload, Play, Sparkles, RefreshCw, Download,
  Camera, MoveHorizontal, ZoomIn, Orbit, Wind,
  Droplets, Flame, CloudRain, CloudSnow, X, Check,
  Loader2, Heart, ChevronDown, ChevronUp, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const models = [
  { name: 'Kling v2', provider: 'Kuaishou', cost: 15, maxDuration: '15s' },
  { name: 'Runway Gen-4', provider: 'Runway', cost: 20, maxDuration: '10s' },
  { name: 'Pika v2', provider: 'Pika Labs', cost: 12, maxDuration: '10s' },
  { name: 'Luma Dream Machine', provider: 'Luma AI', cost: 18, maxDuration: '10s' },
  { name: 'Hailuo AI', provider: 'MiniMax', cost: 10, maxDuration: '5s' },
];

const animationTypes = [
  { id: 'camera', label: 'Camera Movement', icon: Camera },
  { id: 'character', label: 'Character Motion', icon: '🧑' },
  { id: 'hair', label: 'Hair Physics', icon: '💇' },
  { id: 'cloth', label: 'Cloth Physics', icon: '👗' },
  { id: 'lighting', label: 'Lighting Animation', icon: '💡' },
  { id: 'rain', label: 'Rain', icon: '🌧️' },
  { id: 'snow', label: 'Snow', icon: '❄️' },
  { id: 'wind', label: 'Wind', icon: '🌬️' },
  { id: 'explosion', label: 'Explosion', icon: '💥' },
  { id: 'smoke', label: 'Smoke', icon: '💨' },
  { id: 'fire', label: 'Fire', icon: '🔥' },
  { id: 'magic', label: 'Magic', icon: '✨' },
  { id: 'water', label: 'Water', icon: '🌊' },
  { id: 'facial', label: 'Facial Animation', icon: '😊' },
  { id: 'lipsync', label: 'Lip Sync', icon: '👄' },
  { id: 'body', label: 'Body Motion', icon: '🏃' },
  { id: 'loop', label: 'Loop Animation', icon: '🔄' },
  { id: 'background', label: 'Background Anim', icon: '🏞️' },
  { id: 'object', label: 'Object Motion', icon: '📦' },
];

const cameraMovements = [
  'Static', 'Pan Left', 'Pan Right', 'Tilt Up', 'Tilt Down',
  'Zoom In', 'Zoom Out', 'Orbit', 'Drone', 'Tracking', 'Dolly', 'Crane'
];

export default function ImageToVideoPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [selectedAnimations, setSelectedAnimations] = useState<string[]>(['camera', 'lighting']);
  const [cameraMove, setCameraMove] = useState('Zoom In');
  const [duration, setDuration] = useState<number>(5);
  const [fps, setFps] = useState<number>(24);
  const [loop, setLoop] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(true);

  const toggleAnimation = (id: string) => {
    setSelectedAnimations(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (!hasImage) return;
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setIsGenerating(false); return 100; }
        return p + 1.5;
      });
    }, 80);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Image to Video</h1>
            <p className="text-xs text-white/40">Animate any image with AI-powered motion and effects</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="w-full lg:w-[440px] flex-shrink-0 space-y-4 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2">

          {/* Image Upload */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Source Image</label>
            {!hasImage ? (
              <div onClick={() => setHasImage(true)}
                className="border-2 border-dashed border-white/[0.1] rounded-xl p-12 text-center hover:border-violet-500/30 hover:bg-violet-500/[0.02] transition-all cursor-pointer group">
                <Upload className="w-10 h-10 text-white/15 mx-auto mb-3 group-hover:text-violet-400/40 transition-colors" />
                <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors">Drop your image here</p>
                <p className="text-xs text-white/15 mt-1">PNG, JPEG, WEBP up to 10MB</p>
                <button className="mt-4 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-white/50 hover:bg-white/[0.1] transition-all">
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-800 flex items-center justify-center">
                  <span className="text-sm text-white/40">Preview Image</span>
                </div>
                <button onClick={() => setHasImage(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/60 hover:text-white hover:bg-black/60 transition-all">
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] text-white/60">
                  1920 × 1080
                </div>
              </div>
            )}
          </div>

          {/* Motion Prompt */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Motion Prompt <span className="text-white/20">(optional)</span></label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3}
              placeholder="Describe the motion you want..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 transition-colors resize-none" />
          </div>

          {/* AI Model */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">AI Model</label>
            <div className="space-y-2">
              {models.map((m, i) => (
                <button key={m.name} onClick={() => setSelectedModel(i)}
                  className={cn('w-full flex items-center justify-between p-3 rounded-xl text-left transition-all',
                    selectedModel === i ? 'bg-fuchsia-500/10 border border-fuchsia-500/30' : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05]')}>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-[11px] text-white/30">{m.provider} • Max {m.maxDuration}</p>
                  </div>
                  <span className="text-xs text-amber-400 font-medium">{m.cost} cr</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Types */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Animation Effects</label>
            <div className="grid grid-cols-3 gap-2">
              {animationTypes.map((anim) => (
                <button key={anim.id} onClick={() => toggleAnimation(anim.id)}
                  className={cn('flex flex-col items-center gap-1 p-2.5 rounded-xl text-center transition-all',
                    selectedAnimations.includes(anim.id)
                      ? 'bg-fuchsia-500/15 border border-fuchsia-500/30'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]')}>
                  <span className="text-lg">{typeof anim.icon === 'string' ? anim.icon : '📷'}</span>
                  <span className="text-[9px] text-white/50 leading-tight">{anim.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Movement */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">Camera Movement</label>
            <div className="flex flex-wrap gap-2">
              {cameraMovements.map((cm) => (
                <button key={cm} onClick={() => setCameraMove(cm)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    cameraMove === cm ? 'bg-fuchsia-500/20 border border-fuchsia-500/40 text-white' : 'bg-white/[0.04] border border-white/[0.06] text-white/40 hover:bg-white/[0.08]')}>
                  {cm}
                </button>
              ))}
            </div>
          </div>

          {/* Duration & FPS */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <div>
              <p className="text-xs text-white/40 mb-2">Duration</p>
              <div className="flex gap-2">
                {[5, 10, 15].map((d) => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={cn('flex-1 py-2.5 rounded-xl text-sm font-medium transition-all',
                      duration === d ? 'bg-fuchsia-500/20 border border-fuchsia-500/40 text-white' : 'bg-white/[0.04] border border-white/[0.06] text-white/40 hover:bg-white/[0.08]')}>
                    {d}s
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-2">FPS</p>
              <div className="flex gap-2">
                {[24, 30].map((f) => (
                  <button key={f} onClick={() => setFps(f)}
                    className={cn('flex-1 py-2.5 rounded-xl text-sm font-medium transition-all',
                      fps === f ? 'bg-fuchsia-500/20 border border-fuchsia-500/40 text-white' : 'bg-white/[0.04] border border-white/[0.06] text-white/40 hover:bg-white/[0.08]')}>
                    {f} fps
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Loop Animation</span>
              <button onClick={() => setLoop(!loop)}
                className={cn('w-11 h-6 rounded-full transition-all relative',
                  loop ? 'bg-fuchsia-500' : 'bg-white/[0.1]')}>
                <div className={cn('w-4 h-4 rounded-full bg-white absolute top-1 transition-all',
                  loop ? 'left-6' : 'left-1')} />
              </button>
            </div>
          </div>

          {/* Generate */}
          <button onClick={handleGenerate} disabled={!hasImage || isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 text-sm font-bold transition-all shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Animate Image • {models[selectedModel].cost} credits</>
            )}
          </button>

          {isGenerating && (
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40">Animating image...</span>
                <span className="text-xs text-fuchsia-400 font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-400"
                  animate={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Panel - Preview & Results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex-1 min-w-0 space-y-6">
          
          {/* Preview */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-fuchsia-900/20 via-[#0d0d14] to-cyan-900/20 flex items-center justify-center relative">
              {hasImage ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center cursor-pointer hover:bg-white/[0.1] transition-all">
                    <Play className="w-7 h-7 text-white/60 ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] text-white/50">{duration}s • {fps}fps</span>
                    <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] text-white/50">{cameraMove}</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Film className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  <p className="text-sm text-white/25">Upload an image to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 mb-3">Generated Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { gradient: 'from-fuchsia-600 via-purple-700 to-indigo-800', motion: 'Zoom In + Rain' },
                { gradient: 'from-cyan-600 via-teal-700 to-emerald-800', motion: 'Orbit + Wind' },
              ].map((r, i) => (
                <div key={i} className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:border-white/[0.15] transition-all">
                  <div className={`aspect-video bg-gradient-to-br ${r.gradient} relative flex items-center justify-center`}>
                    <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-end p-3 opacity-0 group-hover:opacity-100">
                      <div className="flex gap-1.5">
                        <button className="p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:bg-white/20"><Download className="w-3.5 h-3.5" /></button>
                        <button className="p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:bg-white/20"><Heart className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-white/50">{r.motion}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-fuchsia-400">{models[selectedModel].name}</span>
                      <span className="text-[10px] text-white/20">{duration}s • {fps}fps</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
