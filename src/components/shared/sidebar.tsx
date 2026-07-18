'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, useUserStore } from '@/stores';
import {
  LayoutDashboard, Image, Video, Film, ArrowUpCircle,
  BookOpen, PenTool, Layers, Users2, Mic2,
  Scissors, Music, AudioWaveform as Waves, FolderOpen, UsersRound,
  Store, Settings, Shield, ChevronLeft, ChevronRight,
  Sparkles, Zap, Crown, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navSections = [
  {
    title: 'Create',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Text to Image', href: '/text-to-image', icon: Image, isNew: false },
      { title: 'Text to Video', href: '/text-to-video', icon: Video, isNew: true },
      { title: 'Image to Video', href: '/image-to-video', icon: Film },
      { title: 'Image Upscaler', href: '/upscaler', icon: ArrowUpCircle },
    ],
  },
  {
    title: 'Tools',
    items: [
      { title: 'Prompt Studio', href: '/prompt-studio', icon: BookOpen },
      { title: 'AI Script Writer', href: '/script-writer', icon: PenTool },
      { title: 'Storyboard', href: '/storyboard', icon: Layers },
      { title: 'Characters', href: '/characters', icon: Users2 },
      { title: 'Voice AI', href: '/voice-ai', icon: Mic2 },
    ],
  },
  {
    title: 'Studio',
    items: [
      { title: 'Video Editor', href: '/video-editor', icon: Scissors },
      { title: 'AI Music', href: '/ai-music', icon: Music, isPremium: true },
      { title: 'AI Sound FX', href: '/ai-sfx', icon: Waves },
    ],
  },
  {
    title: 'Manage',
    items: [
      { title: 'Projects', href: '/projects', icon: FolderOpen },
      { title: 'Team', href: '/team', icon: UsersRound },
      { title: 'Marketplace', href: '/marketplace', icon: Store },
    ],
  },
  {
    title: 'Settings',
    items: [
      { title: 'Account', href: '/account', icon: Settings },
      { title: 'Admin', href: '/admin', icon: Shield, isPremium: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapse } = useAppStore();
  const { user } = useUserStore();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed top-0 left-0 h-full z-50 flex flex-col',
          'bg-[#0a0a0f]/95 backdrop-blur-2xl border-r border-white/[0.06]',
          'transition-all duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06]">
          {!sidebarCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight gradient-text">DRAKA MOTION</span>
                <span className="text-[10px] text-white/40 font-medium tracking-widest">AI STUDIO</span>
              </div>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/dashboard" className="mx-auto">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </Link>
          )}

          {/* Close button (mobile) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.06] text-white/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              {!sidebarCollapsed && (
                <p className="px-3 mb-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (sidebarOpen) toggleSidebar();
                      }}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                        'transition-all duration-200 group relative',
                        isActive
                          ? 'bg-gradient-to-r from-violet-500/15 to-cyan-500/10 text-white border border-violet-500/20'
                          : 'text-white/50 hover:text-white/90 hover:bg-white/[0.04]',
                        sidebarCollapsed && 'justify-center px-0'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-violet-400 to-cyan-400"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={cn(
                        'w-[18px] h-[18px] flex-shrink-0',
                        isActive ? 'text-violet-400' : 'text-white/40 group-hover:text-white/70'
                      )} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="truncate">{item.title}</span>
                          {'isNew' in item && item.isNew && (
                            <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white uppercase tracking-wider">
                              New
                            </span>
                          )}
                          {'isPremium' in item && item.isPremium && (
                            <Crown className="ml-auto w-3.5 h-3.5 text-amber-400" />
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:block border-t border-white/[0.06]">
          <button
            onClick={toggleSidebarCollapse}
            className="w-full flex items-center justify-center py-3 text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Card */}
        {!sidebarCollapsed && (
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-white/50">{user?.credits?.toLocaleString() || 0} credits</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
}
