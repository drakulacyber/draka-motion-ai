'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scissors,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  Volume2,
  Crop,
  Merge,
  Gauge,
  Sparkles,
  Music,
  Subtitles,
  Layers,
  Palette,
  Download,
  ChevronDown,
  Plus,
  ZoomIn,
  ZoomOut,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const tools: Tool[] = [
  { id: 'trim', label: 'Trim', icon: Crop, color: 'text-cyan-400' },
  { id: 'cut', label: 'Cut', icon: Scissors, color: 'text-violet-400' },
  { id: 'merge', label: 'Merge', icon: Merge, color: 'text-emerald-400' },
  { id: 'speed', label: 'Speed', icon: Gauge, color: 'text-amber-400' },
  { id: 'transition', label: 'Transition', icon: Sparkles, color: 'text-pink-400' },
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-400' },
  { id: 'subtitle', label: 'Subtitle', icon: Subtitles, color: 'text-teal-400' },
  { id: 'overlay', label: 'Overlay', icon: Layers, color: 'text-orange-400' },
  { id: 'color', label: 'Color Grading', icon: Palette, color: 'text-fuchsia-400' },
];

const formats = ['MP4', 'MOV', 'AVI', 'WebM'];

const timelineClips = [
  { id: 1, label: 'Intro', color: 'bg-violet-500/60', width: '15%' },
  { id: 2, label: 'Scene 1', color: 'bg-cyan-500/60', width: '25%' },
  { id: 3, label: 'Transition', color: 'bg-pink-500/60', width: '5%' },
  { id: 4, label: 'Scene 2', color: 'bg-emerald-500/60', width: '30%' },
  { id: 5, label: 'Scene 3', color: 'bg-amber-500/60', width: '15%' },
  { id: 6, label: 'Outro', color: 'bg-blue-500/60', width: '10%' },
];

const audioTracks = [
  { id: 1, label: 'Voice Over', color: 'bg-teal-500/40', width: '70%', offset: '5%' },
  { id: 2, label: 'Music', color: 'bg-pink-500/40', width: '100%', offset: '0%' },
];

export default function VideoEditorPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState('trim');
  const [exportFormat, setExportFormat] = useState('MP4');
  const [formatOpen, setFormatOpen] = useState(false);
  const [currentTime] = useState('00:01:24');
  const [totalTime] = useState('00:05:32');

  return (
    <div className="p-4 lg:p-6 flex flex-col h-[calc(100vh-64px)] gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-600 to-red-500">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Video Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setFormatOpen(!formatOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white/80 text-sm hover:bg-white/[0.08] transition-all"
            >
              {exportFormat}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {formatOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-28 bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl z-20"
              >
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setExportFormat(f); setFormatOpen(false); }}
                    className={cn(
                      'w-full px-4 py-2.5 text-left text-sm hover:bg-white/[0.05] transition-colors',
                      exportFormat === f ? 'text-violet-400' : 'text-white/80'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Tools Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-20 shrink-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 flex flex-col gap-1 overflow-y-auto"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  'flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-300',
                  activeTool === tool.id
                    ? 'bg-white/[0.1] border border-white/[0.15]'
                    : 'hover:bg-white/[0.05]'
                )}
              >
                <Icon className={cn('w-5 h-5', activeTool === tool.id ? tool.color : 'text-white/50')} />
                <span className={cn('text-[9px]', activeTool === tool.id ? 'text-white' : 'text-white/40')}>
                  {tool.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Preview Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl flex flex-col overflow-hidden"
        >
          {/* Preview */}
          <div className="flex-1 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-3">
                <Play className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-white/30 text-sm">Video Preview</p>
            </div>
            {/* Fullscreen button */}
            <button className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors">
              <Maximize2 className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
                <SkipBack className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
                <SkipForward className="w-4 h-4 text-white/60" />
              </button>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <span className="text-xs text-white/50 font-mono w-16">{currentTime}</span>
              <div className="flex-1 h-1.5 bg-white/[0.1] rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-violet-500/50" />
                </div>
              </div>
              <span className="text-xs text-white/50 font-mono w-16 text-right">{totalTime}</span>
            </div>

            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
              <Volume2 className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </motion.div>

        {/* Properties Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-64 shrink-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 space-y-4 overflow-y-auto hidden lg:block"
        >
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            {(() => {
              const tool = tools.find(t => t.id === activeTool);
              if (tool) {
                const Icon = tool.icon;
                return <Icon className={cn('w-4 h-4', tool.color)} />;
              }
              return null;
            })()}
            {tools.find(t => t.id === activeTool)?.label} Properties
          </h3>

          {activeTool === 'trim' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Start Time</label>
                <input defaultValue="00:00:05" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">End Time</label>
                <input defaultValue="00:03:45" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50" />
              </div>
              <button className="w-full py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors">
                Apply Trim
              </button>
            </div>
          )}

          {activeTool === 'speed' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Playback Speed</label>
                <input type="range" min="0.25" max="4" step="0.25" defaultValue="1" className="w-full accent-violet-500" />
                <div className="flex justify-between text-[10px] text-white/30">
                  <span>0.25x</span><span>1x</span><span>4x</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <input type="checkbox" className="accent-violet-500" />
                <span>Maintain Pitch</span>
              </div>
            </div>
          )}

          {activeTool === 'color' && (
            <div className="space-y-4">
              {['Brightness', 'Contrast', 'Saturation', 'Temperature'].map((prop) => (
                <div key={prop} className="space-y-2">
                  <label className="text-xs text-white/60">{prop}</label>
                  <input type="range" min="-100" max="100" defaultValue="0" className="w-full accent-violet-500" />
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {['Cinematic', 'Warm', 'Cool', 'B&W', 'Vintage', 'Neon', 'Sunset', 'Moody'].map((preset) => (
                  <button key={preset} className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-colors text-[9px] text-white/60">
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!['trim', 'speed', 'color'].includes(activeTool) && (
            <div className="space-y-3 text-sm">
              <p className="text-white/40 text-xs">Select a clip on the timeline to modify its properties.</p>
              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <p className="text-white/50 text-xs">No clip selected</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="shrink-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 space-y-3"
      >
        {/* Timeline Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
              <ZoomOut className="w-4 h-4 text-white/40" />
            </button>
            <div className="w-20 h-1 bg-white/[0.1] rounded-full">
              <div className="w-1/2 h-full bg-white/[0.3] rounded-full" />
            </div>
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
              <ZoomIn className="w-4 h-4 text-white/40" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
              <Plus className="w-4 h-4 text-white/40" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
              <Trash2 className="w-4 h-4 text-white/40" />
            </button>
          </div>
        </div>

        {/* Time Ruler */}
        <div className="flex items-end px-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="h-2 border-l border-white/[0.1]" />
              <span className="text-[9px] text-white/30">{`${Math.floor(i * 0.46)}:${String(Math.floor((i * 27.6) % 60)).padStart(2, '0')}`}</span>
            </div>
          ))}
        </div>

        {/* Video Track */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/40 w-12 shrink-0">Video</span>
            <div className="flex-1 h-10 bg-white/[0.02] rounded-lg flex overflow-hidden relative">
              {timelineClips.map((clip) => (
                <div
                  key={clip.id}
                  style={{ width: clip.width }}
                  className={cn(
                    'h-full border-r border-black/30 flex items-center justify-center px-1 cursor-pointer hover:brightness-125 transition-all',
                    clip.color
                  )}
                >
                  <span className="text-[9px] text-white/80 truncate">{clip.label}</span>
                </div>
              ))}
              {/* Playhead */}
              <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white shadow-lg shadow-white/30 z-10">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-sm rotate-45" />
              </div>
            </div>
          </div>

          {/* Audio Tracks */}
          {audioTracks.map((track) => (
            <div key={track.id} className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 w-12 shrink-0">{track.label.length > 7 ? 'Audio' : track.label}</span>
              <div className="flex-1 h-8 bg-white/[0.02] rounded-lg relative overflow-hidden">
                <div
                  style={{ width: track.width, marginLeft: track.offset }}
                  className={cn('h-full rounded-lg flex items-center px-2', track.color)}
                >
                  <span className="text-[9px] text-white/60 truncate">{track.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
