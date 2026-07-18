'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Crown,
  Play,
  Pause,
  Download,
  Sparkles,
  Loader2,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const genres = ['Pop', 'Rock', 'Electronic', 'Classical', 'Jazz', 'Hip Hop', 'Ambient', 'Cinematic', 'Lo-fi', 'R&B'];
const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Dark', 'Uplifting', 'Romantic', 'Epic'];
const instruments = ['Piano', 'Guitar', 'Drums', 'Synth', 'Strings', 'Bass', 'Flute', 'Saxophone'];

interface GeneratedTrack {
  id: number;
  title: string;
  genre: string;
  duration: string;
  bpm: number;
}

const sampleTracks: GeneratedTrack[] = [
  { id: 1, title: 'Neon Dreams', genre: 'Electronic', duration: '1:24', bpm: 128 },
  { id: 2, title: 'Starlight Reverie', genre: 'Ambient', duration: '2:10', bpm: 85 },
  { id: 3, title: 'Urban Pulse', genre: 'Hip Hop', duration: '0:58', bpm: 95 },
];

export default function AIMusicPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [duration, setDuration] = useState(60);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [loop, setLoop] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const toggleInstrument = (inst: string) => {
    setSelectedInstruments(prev =>
      prev.includes(inst) ? prev.filter(i => i !== inst) : [...prev, inst]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 3000);
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-600 to-rose-500">
            <Music className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AI Music Generator</h1>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">PRO</span>
          </span>
        </div>
        <p className="text-white/60 ml-14">
          Create original music tracks with AI — describe your vision and let the model compose.
        </p>
      </motion.div>

      {/* Main Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 space-y-6"
      >
        {/* Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Describe the music you want...</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., An uplifting cinematic track with sweeping strings, gentle piano melody, building to an epic orchestral crescendo..."
            rows={3}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all resize-none"
          />
        </div>

        {/* Genre Chips */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Genre</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleGenre(genre)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                  selectedGenres.includes(genre)
                    ? 'bg-violet-500/30 border-violet-500/50 text-violet-300'
                    : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white/80'
                )}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mood Chips */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Mood</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMood(mood)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                  selectedMoods.includes(mood)
                    ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                    : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white/80'
                )}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/80">Duration</label>
            <span className="text-sm text-violet-400 font-mono">{formatDuration(duration)}</span>
          </div>
          <input
            type="range"
            min="15"
            max="180"
            step="5"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-violet-500"
          />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>0:15</span>
            <span>1:00</span>
            <span>2:00</span>
            <span>3:00</span>
          </div>
        </div>

        {/* Instruments */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Instruments</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {instruments.map((inst) => (
              <label
                key={inst}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300',
                  selectedInstruments.includes(inst)
                    ? 'bg-white/[0.08] border-violet-500/40'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedInstruments.includes(inst)}
                  onChange={() => toggleInstrument(inst)}
                  className="accent-violet-500 w-4 h-4 rounded"
                />
                <span className="text-sm text-white/80">{inst}</span>
              </label>
            ))}
          </div>
        </div>

        {/* BPM & Loop Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">BPM</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
              min={40}
              max={200}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Loop</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setLoop(!loop)}
                className={cn(
                  'w-12 h-7 rounded-full transition-all duration-300 relative',
                  loop ? 'bg-violet-500' : 'bg-white/[0.1]'
                )}
              >
                <div className={cn(
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300',
                  loop ? 'left-6' : 'left-1'
                )} />
              </button>
              <span className="text-sm text-white/60 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                {loop ? 'Seamless loop enabled' : 'Loop disabled'}
              </span>
            </div>
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
              Composing Music...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Music
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">Generated Tracks</h2>
            <div className="space-y-3">
              {sampleTracks.map((track, idx) => {
                const bars = Array.from({ length: 50 }, () => Math.random() * 100);
                const isCurrentlyPlaying = playingTrack === track.id;
                return (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex items-center gap-5 group hover:border-white/[0.15] transition-all duration-300"
                  >
                    {/* Play Button */}
                    <button
                      onClick={() => setPlayingTrack(isCurrentlyPlaying ? null : track.id)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shrink-0 hover:shadow-lg hover:shadow-violet-500/30 transition-shadow"
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>

                    {/* Info */}
                    <div className="shrink-0 min-w-[120px]">
                      <p className="text-white font-semibold">{track.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">{track.genre}</span>
                        <span className="text-[10px] text-white/40">{track.bpm} BPM</span>
                      </div>
                    </div>

                    {/* Waveform */}
                    <div className="flex-1 flex items-center gap-[2px] h-12 px-2">
                      {bars.map((height, barIdx) => (
                        <motion.div
                          key={barIdx}
                          animate={isCurrentlyPlaying ? {
                            scaleY: [1, Math.random() * 0.5 + 0.5, 1],
                          } : {}}
                          transition={isCurrentlyPlaying ? {
                            duration: 0.4 + Math.random() * 0.3,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          } : {}}
                          className={cn(
                            'flex-1 rounded-full',
                            isCurrentlyPlaying
                              ? 'bg-gradient-to-t from-violet-500 to-cyan-400'
                              : 'bg-white/[0.12]'
                          )}
                          style={{ height: `${Math.max(height, 15)}%` }}
                        />
                      ))}
                    </div>

                    {/* Duration & Download */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-white/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {track.duration}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
                      >
                        <Download className="w-4 h-4 text-white/60" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
