'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, useUserStore } from '@/stores';
import {
  Search, Bell, Zap, Menu, Command, Moon, Sun,
  X, Sparkles, Image, Video, Film, PenTool,
  ArrowUpCircle, Music, Settings, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const quickActions = [
  { title: 'Text to Image', href: '/text-to-image', icon: Image, shortcut: '⌘1' },
  { title: 'Text to Video', href: '/text-to-video', icon: Video, shortcut: '⌘2' },
  { title: 'Image to Video', href: '/image-to-video', icon: Film, shortcut: '⌘3' },
  { title: 'Image Upscaler', href: '/upscaler', icon: ArrowUpCircle, shortcut: '⌘4' },
  { title: 'Prompt Studio', href: '/prompt-studio', icon: PenTool, shortcut: '⌘5' },
  { title: 'AI Music', href: '/ai-music', icon: Music, shortcut: '⌘6' },
  { title: 'Settings', href: '/account', icon: Settings, shortcut: '⌘,' },
];

export function Header() {
  const { toggleSidebar, commandPaletteOpen, setCommandPaletteOpen, notifications, unreadCount, markAllNotificationsRead } = useAppStore();
  const { user } = useUserStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut for command palette
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const filteredActions = quickActions.filter((action) =>
    action.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-2xl">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left: Mobile menu + Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-white/[0.06] text-white/60 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search / Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-3 h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all w-64 lg:w-80"
            >
              <Search className="w-4 h-4 text-white/30" />
              <span className="text-sm text-white/30 flex-1 text-left">Search or command...</span>
              <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/30 font-mono">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Credits */}
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all group"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-amber-300">
                {user?.credits?.toLocaleString() || 0}
              </span>
            </Link>

            {/* Upgrade Button */}
            <Link
              href="/account"
              className="hidden md:flex items-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-sm font-semibold text-white transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02]"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade</span>
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-white/[0.06] text-white/50 hover:text-white transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-[9px] font-bold flex items-center justify-center text-white"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[#12121a]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      <button
                        onClick={() => markAllNotificationsRead()}
                        className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={cn(
                            'px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer',
                            !notif.read && 'bg-violet-500/[0.03]'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              'w-2 h-2 mt-1.5 rounded-full flex-shrink-0',
                              !notif.read ? 'bg-violet-400' : 'bg-white/20'
                            )} />
                            <div>
                              <p className="text-sm font-medium text-white/90">{notif.title}</p>
                              <p className="text-xs text-white/40 mt-0.5">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <Link href="/account" className="p-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold hover:shadow-lg hover:shadow-violet-500/20 transition-shadow">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setCommandPaletteOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[61] rounded-2xl bg-[#12121a]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.06]">
                <Search className="w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/[0.06]"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <div className="py-2 max-h-80 overflow-y-auto">
                <p className="px-4 py-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Quick Actions</p>
                {filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      onClick={() => {
                        setCommandPaletteOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.05] transition-colors mx-2 rounded-xl"
                    >
                      <Icon className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white/80 flex-1">{action.title}</span>
                      <kbd className="text-[10px] text-white/20 font-mono">{action.shortcut}</kbd>
                    </Link>
                  );
                })}
                {filteredActions.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-white/30">No results found</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
