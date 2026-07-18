'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap, Image, Video, Film, ArrowUpCircle, HardDrive,
  Heart, Copy, Clock, Sparkles, ChevronRight, Star,
  TrendingUp, Play, MoreHorizontal
} from 'lucide-react';
import { useUserStore, useGenerationStore, useProjectsStore } from '@/stores';

const quickActions = [
  { title: 'Text to Image', icon: Image, href: '/text-to-image', gradient: 'from-violet-500 to-purple-600' },
  { title: 'Text to Video', icon: Video, href: '/text-to-video', gradient: 'from-cyan-500 to-blue-600' },
  { title: 'Image to Video', icon: Film, href: '/image-to-video', gradient: 'from-fuchsia-500 to-pink-600' },
  { title: 'Upscale', icon: ArrowUpCircle, href: '/upscaler', gradient: 'from-emerald-500 to-teal-600' },
];

const aiModels = [
  { name: 'Flux Pro', provider: 'Black Forest', status: 'online', type: 'Image' },
  { name: 'Stability XL', provider: 'Stability AI', status: 'online', type: 'Image' },
  { name: 'Kling v2', provider: 'Kuaishou', status: 'online', type: 'Video' },
  { name: 'Runway Gen-4', provider: 'Runway', status: 'busy', type: 'Video' },
  { name: 'Pika v2', provider: 'Pika Labs', status: 'online', type: 'Video' },
  { name: 'DALL-E 3', provider: 'OpenAI', status: 'online', type: 'Image' },
  { name: 'Midjourney v6', provider: 'Midjourney', status: 'offline', type: 'Image' },
];

const templates = [
  { name: 'Cyberpunk Portrait', category: 'Portrait', uses: '12.5K', gradient: 'from-violet-600 via-purple-600 to-fuchsia-600' },
  { name: 'Product Showcase', category: 'Product', uses: '8.2K', gradient: 'from-cyan-600 via-blue-600 to-indigo-600' },
  { name: 'Anime Character', category: 'Anime', uses: '15.8K', gradient: 'from-pink-500 via-rose-500 to-red-500' },
  { name: 'Cinematic Landscape', category: 'Landscape', uses: '9.7K', gradient: 'from-emerald-600 via-teal-600 to-cyan-600' },
];

const recentCreations = [
  { prompt: 'A cyberpunk cityscape at night with neon lights reflecting on wet streets', model: 'Flux Pro', type: 'image', time: '1h ago', gradient: 'from-violet-600 via-indigo-700 to-blue-800', fav: true },
  { prompt: 'Beautiful anime girl in cherry blossom garden, soft lighting', model: 'Stability XL', type: 'image', time: '3h ago', gradient: 'from-pink-500 via-rose-500 to-fuchsia-600', fav: false },
  { prompt: 'Ocean waves crashing on rocky cliff during golden hour', model: 'Kling v2', type: 'video', time: '5h ago', gradient: 'from-cyan-500 via-teal-600 to-emerald-700', fav: true },
  { prompt: 'Futuristic spaceship interior with holographic displays', model: 'DALL-E 3', type: 'image', time: '8h ago', gradient: 'from-blue-600 via-purple-600 to-violet-700', fav: false },
  { prompt: 'Portrait of warrior in medieval armor, dramatic lighting', model: 'Flux Pro', type: 'image', time: '12h ago', gradient: 'from-amber-600 via-orange-700 to-red-800', fav: false },
  { prompt: 'Magical forest with bioluminescent mushrooms and fireflies', model: 'Stability XL', type: 'image', time: '1d ago', gradient: 'from-emerald-500 via-green-600 to-teal-700', fav: true },
];

export default function DashboardPage() {
  const { user } = useUserStore();
  const { promptHistory } = useGenerationStore();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Welcome & Quick Actions */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{getGreeting()}, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Creator'}</span></h1>
            <p className="text-white/40 mt-1">What will you create today?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div key={action.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link href={action.href} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{action.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Credits Remaining', value: user?.credits?.toLocaleString() || '0', icon: Zap, gradient: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/20', iconColor: 'text-amber-400' },
          { label: 'Images Generated', value: '1,284', icon: Image, gradient: 'from-violet-500/20 to-purple-500/10', border: 'border-violet-500/20', iconColor: 'text-violet-400' },
          { label: 'Videos Created', value: '156', icon: Video, gradient: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/20', iconColor: 'text-cyan-400' },
          { label: 'Storage Used', value: '4.2 GB', icon: HardDrive, gradient: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/20', iconColor: 'text-emerald-400' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.border} backdrop-blur-xl`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </motion.section>

      {/* Recent Creations */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Creations</h2>
          <Link href="/projects" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCreations.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
              className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:border-white/[0.15] transition-all hover:scale-[1.01]">
              <div className={`h-40 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}>
                {item.type === 'video' && (
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-medium text-white/80 uppercase">{item.type}</span>
                </div>
                <button className="absolute top-3 left-3">
                  <Heart className={`w-4 h-4 ${item.fav ? 'fill-rose-500 text-rose-500' : 'text-white/60 hover:text-rose-400'} transition-colors`} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">{item.prompt}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-violet-400 font-medium">{item.model}</span>
                  <span className="text-[11px] text-white/30">{item.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Models Status */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-lg font-bold mb-4">AI Models</h2>
          <div className="space-y-2">
            {aiModels.map((model) => (
              <div key={model.name} className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  model.status === 'online' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/40' :
                  model.status === 'busy' ? 'bg-amber-400 shadow-lg shadow-amber-400/40' :
                  'bg-red-400 shadow-lg shadow-red-400/40'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{model.name}</p>
                  <p className="text-[11px] text-white/30">{model.provider}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[10px] text-white/40 font-medium">{model.type}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="space-y-8">
          {/* Templates */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Trending Templates</h2>
              <Link href="/marketplace" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">Explore <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((t) => (
                <div key={t.name} className="rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer hover:scale-[1.02]">
                  <div className={`h-24 bg-gradient-to-br ${t.gradient} flex items-end p-3`}>
                    <div>
                      <p className="text-xs font-bold text-white">{t.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-white/60 px-1.5 py-0.5 rounded bg-black/30">{t.category}</span>
                        <span className="text-[9px] text-white/50">{t.uses} uses</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Prompt History */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Prompts</h2>
              <Link href="/prompt-studio" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">View All <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {promptHistory.slice(0, 5).map((prompt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all group">
                  <Clock className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                  <p className="text-sm text-white/50 flex-1 truncate group-hover:text-white/70 transition-colors">{prompt}</p>
                  <button onClick={() => handleCopy(prompt, i)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/20 hover:text-white/60 transition-all flex-shrink-0">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <Link href="/text-to-image" className="p-1.5 rounded-lg hover:bg-violet-500/20 text-white/20 hover:text-violet-400 transition-all flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
