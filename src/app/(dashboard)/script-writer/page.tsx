'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool,
  Film,
  Tv,
  Music2,
  Play,
  CameraIcon,
  BookOpen,
  Palette,
  LayoutGrid,
  Copy,
  Download,
  FileText,
  ChevronDown,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const scriptTypes = [
  { id: 'movie', label: 'Movie Script', icon: Film, color: 'from-violet-500 to-purple-600' },
  { id: 'commercial', label: 'Commercial', icon: Tv, color: 'from-cyan-500 to-blue-600' },
  { id: 'tiktok', label: 'TikTok', icon: Music2, color: 'from-pink-500 to-rose-600' },
  { id: 'youtube', label: 'YouTube', icon: Play, color: 'from-red-500 to-orange-600' },
  { id: 'instagram', label: 'Instagram Reel', icon: CameraIcon, color: 'from-fuchsia-500 to-pink-600' },
  { id: 'novel', label: 'Novel', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
  { id: 'comic', label: 'Comic', icon: Palette, color: 'from-amber-500 to-yellow-600' },
  { id: 'storyboard', label: 'Storyboard', icon: LayoutGrid, color: 'from-indigo-500 to-blue-600' },
];

const tones = ['Professional', 'Casual', 'Dramatic', 'Humorous', 'Inspirational'];
const durations = ['30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes', '30 minutes', '1 hour', '2 hours'];

const sampleScript = {
  title: 'ECHOES OF TOMORROW',
  scenes: [
    {
      heading: 'INT. FUTURISTIC LABORATORY — NIGHT',
      action: 'A vast chamber filled with holographic displays and quantum computing arrays. Blue light pulses through transparent conduits along the walls. DR. ELENA VASQUEZ (40s, determined, brilliant) stands before a massive neural interface terminal.',
      dialogue: [
        { character: 'DR. VASQUEZ', direction: '(studying the readouts)', line: 'The neural patterns are stabilizing. After three years... we\'re finally ready.' },
        { character: 'AI SYSTEM', direction: '(synthesized voice)', line: 'Confidence threshold at 97.3 percent. Shall I initiate the consciousness bridge, Doctor?' },
        { character: 'DR. VASQUEZ', direction: '(takes a deep breath)', line: 'Initialize sequence. And ARIA... record everything. The world needs to see this.' },
      ],
    },
    {
      heading: 'EXT. CITY SKYLINE — CONTINUOUS',
      action: 'AERIAL SHOT — The city stretches to the horizon, a dazzling tapestry of neon and chrome. Flying vehicles trace luminous paths between towers. We PUSH IN toward the laboratory building, its apex glowing with an intensifying blue light.',
      dialogue: [
        { character: 'NARRATOR', direction: '(V.O.)', line: 'In a world where the line between human and artificial consciousness had all but vanished, one scientist dared to ask the question everyone else was afraid to answer.' },
      ],
    },
  ],
};

export default function ScriptWriterPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [duration, setDuration] = useState('5 minutes');
  const [toneOpen, setToneOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2500);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AI Script Writer</h1>
        </div>
        <p className="text-white/60 ml-14">
          Generate professional scripts for any format — movies, commercials, social media, and more.
        </p>
      </motion.div>

      {/* Script Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-white">Select Script Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {scriptTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'relative p-4 rounded-2xl border transition-all duration-300 text-left group',
                  isSelected
                    ? 'bg-white/[0.08] border-violet-500/50 shadow-lg shadow-violet-500/10'
                    : 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]'
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="scriptTypeIndicator"
                    className="absolute inset-0 rounded-2xl border-2 border-violet-500/50"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br', type.color)}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{type.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-6"
      >
        {/* Topic/Concept */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Topic / Concept</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Describe your script concept... e.g., 'A sci-fi thriller about a scientist who discovers that AI has developed consciousness, set in 2087'"
            rows={4}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all resize-none"
          />
        </div>

        {/* Tone & Duration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tone Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Tone</label>
            <div className="relative">
              <button
                onClick={() => { setToneOpen(!toneOpen); setDurationOpen(false); }}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/[0.2] transition-all"
              >
                <span>{tone}</span>
                <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', toneOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {toneOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-20 mt-2 w-full bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl"
                  >
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setTone(t); setToneOpen(false); }}
                        className={cn(
                          'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                          tone === t ? 'text-violet-400 bg-white/[0.03]' : 'text-white/80'
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Duration Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Duration / Length</label>
            <div className="relative">
              <button
                onClick={() => { setDurationOpen(!durationOpen); setToneOpen(false); }}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/[0.2] transition-all"
              >
                <span>{duration}</span>
                <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', durationOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {durationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-20 mt-2 w-full bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl"
                  >
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => { setDuration(d); setDurationOpen(false); }}
                        className={cn(
                          'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                          duration === d ? 'text-violet-400 bg-white/[0.03]' : 'text-white/80'
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating || !selectedType || !topic.trim()}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300',
            isGenerating || !selectedType || !topic.trim()
              ? 'bg-white/[0.05] text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-500/25'
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Script
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Result Area */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="space-y-4"
          >
            {/* Export Bar */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Generated Script</h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.08] transition-all text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.08] transition-all text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Download TXT
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.button>
              </div>
            </div>

            {/* Script Display */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 space-y-8 font-mono">
              <div className="text-center space-y-2 pb-6 border-b border-white/[0.08]">
                <h3 className="text-2xl font-bold text-white tracking-wider">{sampleScript.title}</h3>
                <p className="text-white/40 text-sm">Written by Draka AI — {new Date().toLocaleDateString()}</p>
              </div>

              {sampleScript.scenes.map((scene, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
                  className="space-y-4"
                >
                  <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest">
                    {scene.heading}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed pl-0">
                    {scene.action}
                  </p>
                  <div className="space-y-3 pl-8">
                    {scene.dialogue.map((d, dIdx) => (
                      <div key={dIdx} className="space-y-0.5">
                        <p className="text-center text-sm font-bold text-cyan-400 uppercase">
                          {d.character}
                        </p>
                        <p className="text-center text-xs text-white/40 italic">
                          {d.direction}
                        </p>
                        <p className="text-center text-sm text-white/80">
                          {d.line}
                        </p>
                      </div>
                    ))}
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
