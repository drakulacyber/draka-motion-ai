'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Camera,
  Sun,
  Users,
  ChevronDown,
  Sparkles,
  Loader2,
  Download,
  FileImage,
  FileText,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = [
  { id: 'cinematic', label: 'Cinematic', desc: 'Film-quality frames' },
  { id: 'anime', label: 'Anime', desc: 'Japanese animation style' },
  { id: 'sketch', label: 'Pencil Sketch', desc: 'Hand-drawn feel' },
  { id: 'comic', label: 'Comic Book', desc: 'Bold outlines & colors' },
  { id: 'watercolor', label: 'Watercolor', desc: 'Soft painted look' },
  { id: 'pixel', label: 'Pixel Art', desc: 'Retro game aesthetic' },
];

const sampleFrames = [
  {
    scene: 1,
    title: 'Opening — City Skyline',
    camera: 'Wide establishing shot, slow dolly in',
    lighting: 'Golden hour, warm ambient glow',
    characters: 'None — environment only',
    gradient: 'from-orange-500/20 via-amber-500/10 to-rose-500/20',
  },
  {
    scene: 2,
    title: 'Interior — Lab Introduction',
    camera: 'Medium shot, slight low angle',
    lighting: 'Cool blue holographic light, shadows',
    characters: 'Dr. Vasquez enters frame left',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-indigo-500/20',
  },
  {
    scene: 3,
    title: 'Close-up — The Discovery',
    camera: 'Extreme close-up, rack focus',
    lighting: 'Dramatic side lighting, high contrast',
    characters: 'Dr. Vasquez — reaction shot',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
  },
  {
    scene: 4,
    title: 'The Confrontation',
    camera: 'Over-the-shoulder, Dutch angle',
    lighting: 'Red warning lights, strobing',
    characters: 'Dr. Vasquez & Agent Mercer face-off',
    gradient: 'from-red-500/20 via-orange-500/10 to-yellow-500/20',
  },
  {
    scene: 5,
    title: 'Chase — Corridor Run',
    camera: 'Tracking shot, handheld feel',
    lighting: 'Flickering fluorescents, emergency red',
    characters: 'Dr. Vasquez running, guards pursuing',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
  },
  {
    scene: 6,
    title: 'Climax — Rooftop',
    camera: 'Crane shot pulling up to aerial',
    lighting: 'Night, city lights below, moonlight',
    characters: 'Dr. Vasquez stands at edge, resolute',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-violet-500/20',
  },
  {
    scene: 7,
    title: 'The Leap of Faith',
    camera: 'Slow motion, 120fps, multiple angles',
    lighting: 'Backlit by explosion, rim light',
    characters: 'Dr. Vasquez leaps — silhouette',
    gradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
  },
  {
    scene: 8,
    title: 'Resolution — New Dawn',
    camera: 'Wide shot, static, contemplative',
    lighting: 'Sunrise, volumetric god rays',
    characters: 'Dr. Vasquez walks toward horizon',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
  },
];

export default function StoryboardPage() {
  const [projectName, setProjectName] = useState('');
  const [sceneCount, setSceneCount] = useState(8);
  const [script, setScript] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sceneCountOpen, setSceneCountOpen] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 3000);
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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Storyboard Generator</h1>
        </div>
        <p className="text-white/60 ml-14">
          Visualize your script scene-by-scene with AI-generated storyboard frames.
        </p>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Project Name</label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Storyboard Project"
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
            />
          </div>

          {/* Scene Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Number of Scenes</label>
            <div className="relative">
              <button
                onClick={() => setSceneCountOpen(!sceneCountOpen)}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/[0.2] transition-all"
              >
                <span>{sceneCount} Scenes</span>
                <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', sceneCountOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {sceneCountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-20 mt-2 w-full bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl"
                  >
                    {Array.from({ length: 9 }, (_, i) => i + 4).map((n) => (
                      <button
                        key={n}
                        onClick={() => { setSceneCount(n); setSceneCountOpen(false); }}
                        className={cn(
                          'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                          sceneCount === n ? 'text-violet-400 bg-white/[0.03]' : 'text-white/80'
                        )}
                      >
                        {n} Scenes
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Script Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/80">Script / Description</label>
            <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
              Paste from Script Writer <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your script or describe the story you want to visualize..."
            rows={5}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all resize-none"
          />
        </div>

        {/* Style Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Frame Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {styles.map((style) => (
              <motion.button
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStyle(style.id)}
                className={cn(
                  'p-3 rounded-xl border text-center transition-all duration-300',
                  selectedStyle === style.id
                    ? 'bg-violet-500/20 border-violet-500/50 shadow-lg shadow-violet-500/10'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                )}
              >
                <p className="text-sm font-medium text-white">{style.label}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{style.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300',
            isGenerating
              ? 'bg-white/[0.05] text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-500/25'
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Storyboard...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Storyboard
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Export Bar */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Storyboard Frames</h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.08] transition-all text-sm"
                >
                  <FileImage className="w-4 h-4" />
                  Export PNG
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white transition-all text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Export PDF
                </motion.button>
              </div>
            </div>

            {/* Frames Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {sampleFrames.map((frame, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, type: 'spring', stiffness: 100 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/[0.15] transition-all duration-300"
                >
                  {/* Frame Preview */}
                  <div className={cn('aspect-video bg-gradient-to-br relative', frame.gradient)}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-5 h-5 text-white/60" />
                        </div>
                        <p className="text-[10px] text-white/40">Frame Preview</p>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
                      <span className="text-xs font-bold text-white">Scene {frame.scene}</span>
                    </div>
                  </div>

                  {/* Frame Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-white">{frame.title}</h3>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Camera className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-white/60">{frame.camera}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sun className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-white/60">{frame.lighting}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-white/60">{frame.characters}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
