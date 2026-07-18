'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic2,
  Play,
  Pause,
  Upload,
  ChevronDown,
  Sparkles,
  Loader2,
  Download,
  Volume2,
  User,
  Subtitles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const voices = [
  { id: 'alex', name: 'Alex', gender: 'Male', accent: 'American', color: 'from-blue-500 to-cyan-500' },
  { id: 'sarah', name: 'Sarah', gender: 'Female', accent: 'British', color: 'from-pink-500 to-rose-500' },
  { id: 'chen', name: 'Chen Wei', gender: 'Male', accent: 'Chinese', color: 'from-emerald-500 to-teal-500' },
  { id: 'elena', name: 'Elena', gender: 'Female', accent: 'Spanish', color: 'from-amber-500 to-orange-500' },
  { id: 'james', name: 'James', gender: 'Male', accent: 'Australian', color: 'from-violet-500 to-purple-500' },
  { id: 'yuki', name: 'Yuki', gender: 'Female', accent: 'Japanese', color: 'from-red-500 to-pink-500' },
];

const emotions = ['Neutral', 'Happy', 'Sad', 'Excited', 'Angry', 'Whispering', 'Fearful', 'Sarcastic'];
const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Korean', 'Portuguese', 'Arabic', 'Hindi'];

type TabType = 'tts' | 'clone';

export default function VoiceAIPage() {
  const [activeTab, setActiveTab] = useState<TabType>('tts');
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alex');
  const [emotion, setEmotion] = useState('Neutral');
  const [language, setLanguage] = useState('English');
  const [speed, setSpeed] = useState(1.0);
  const [subtitles, setSubtitles] = useState(false);
  const [emotionOpen, setEmotionOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [cloneName, setCloneName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const waveformBars = Array.from({ length: 60 }, () => Math.random() * 100);

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500">
            <Mic2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Voice AI</h1>
        </div>
        <p className="text-white/60 ml-14">
          Generate realistic voiceovers or clone voices for your projects.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex gap-1 p-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl w-fit">
          {[
            { id: 'tts' as TabType, label: 'Text to Speech' },
            { id: 'clone' as TabType, label: 'Voice Clone' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowResult(false); }}
              className={cn(
                'px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative',
                activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/70'
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="voiceTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-white/[0.1] rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* TTS Tab */}
      {activeTab === 'tts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Text to Speak</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                rows={4}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all resize-none"
              />
              <p className="text-xs text-white/30 text-right">{text.length} / 5000 characters</p>
            </div>

            {/* Voice Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80">Select Voice</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {voices.map((voice) => (
                  <motion.button
                    key={voice.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={cn(
                      'p-4 rounded-xl border text-center transition-all duration-300 relative group',
                      selectedVoice === voice.id
                        ? 'bg-white/[0.08] border-violet-500/50 shadow-lg shadow-violet-500/10'
                        : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center mx-auto mb-2', voice.color)}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-white">{voice.name}</p>
                    <p className="text-[10px] text-white/40">{voice.gender} · {voice.accent}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingPreview(playingPreview === voice.id ? null : voice.id);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-md bg-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {playingPreview === voice.id ? (
                        <Pause className="w-3 h-3 text-white" />
                      ) : (
                        <Play className="w-3 h-3 text-white" />
                      )}
                    </button>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Options Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Emotion */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Emotion</label>
                <div className="relative">
                  <button
                    onClick={() => { setEmotionOpen(!emotionOpen); setLanguageOpen(false); }}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/[0.2] transition-all text-sm"
                  >
                    <span>{emotion}</span>
                    <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', emotionOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {emotionOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-20 mt-2 w-full bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto"
                      >
                        {emotions.map((e) => (
                          <button
                            key={e}
                            onClick={() => { setEmotion(e); setEmotionOpen(false); }}
                            className={cn(
                              'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                              emotion === e ? 'text-violet-400 bg-white/[0.03]' : 'text-white/80'
                            )}
                          >
                            {e}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Language</label>
                <div className="relative">
                  <button
                    onClick={() => { setLanguageOpen(!languageOpen); setEmotionOpen(false); }}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/[0.2] transition-all text-sm"
                  >
                    <span>{language}</span>
                    <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform', languageOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-20 mt-2 w-full bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto"
                      >
                        {languages.map((l) => (
                          <button
                            key={l}
                            onClick={() => { setLanguage(l); setLanguageOpen(false); }}
                            className={cn(
                              'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                              language === l ? 'text-violet-400 bg-white/[0.03]' : 'text-white/80'
                            )}
                          >
                            {l}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Speed */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Speed: {speed.toFixed(1)}x</label>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-violet-500"
                  />
                  <div className="flex justify-between text-[10px] text-white/30 mt-1">
                    <span>0.5x</span>
                    <span>1.0x</span>
                    <span>2.0x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Subtitles className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-sm font-medium text-white">Generate Subtitles</p>
                  <p className="text-xs text-white/40">Auto-generate SRT subtitle file</p>
                </div>
              </div>
              <button
                onClick={() => setSubtitles(!subtitles)}
                className={cn(
                  'w-12 h-7 rounded-full transition-all duration-300 relative',
                  subtitles ? 'bg-violet-500' : 'bg-white/[0.1]'
                )}
              >
                <div className={cn(
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300',
                  subtitles ? 'left-6' : 'left-1'
                )} />
              </button>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className={cn(
                'w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300',
                isGenerating || !text.trim()
                  ? 'bg-white/[0.05] text-white/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-500/25'
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Voice...
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  Generate Voice
                </>
              )}
            </motion.button>
          </div>

          {/* Audio Result */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Generated Audio</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download WAV
                  </motion.button>
                </div>

                {/* Waveform Player */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shrink-0"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                  </button>

                  <div className="flex-1 flex items-center gap-[2px] h-16">
                    {waveformBars.map((height, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: idx * 0.01, type: 'spring', stiffness: 200 }}
                        className={cn(
                          'flex-1 rounded-full transition-colors duration-200',
                          isPlaying && idx < 25 ? 'bg-gradient-to-t from-violet-500 to-cyan-400' : 'bg-white/[0.15]'
                        )}
                        style={{ height: `${Math.max(height, 15)}%` }}
                      />
                    ))}
                  </div>

                  <span className="text-sm text-white/40 shrink-0">0:14 / 0:32</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Voice Clone Tab */}
      {activeTab === 'clone' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-6"
        >
          {/* Upload Audio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Upload Audio Sample</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
              className={cn(
                'border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer',
                isDragOver
                  ? 'border-violet-500/60 bg-violet-500/10'
                  : 'border-white/[0.1] bg-white/[0.02] hover:border-white/[0.2]'
              )}
            >
              <Upload className="w-8 h-8 text-white/30 mx-auto mb-3" />
              <p className="text-white/70 font-medium">Drop audio file here</p>
              <p className="text-xs text-white/40 mt-1">WAV, MP3, FLAC — at least 30 seconds of clear speech</p>
            </div>
          </div>

          {/* Clone Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Clone Name</label>
            <input
              value={cloneName}
              onChange={(e) => setCloneName(e.target.value)}
              placeholder="e.g., My Custom Voice"
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>

          {/* Preview Section */}
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <p className="text-sm text-white/60 text-center">
              Upload an audio sample to preview the cloned voice
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Clone Voice
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
