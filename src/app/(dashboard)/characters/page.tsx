'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users2,
  Upload,
  Plus,
  Search,
  MoreVertical,
  Image as ImageIcon,
  Trash2,
  Edit3,
  Star,
  Eye,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Character {
  id: string;
  name: string;
  description: string;
  usageCount: number;
  gradient: string;
  initials: string;
  starred: boolean;
}

const sampleCharacters: Character[] = [
  { id: '1', name: 'Dr. Elena Vasquez', description: 'Brilliant scientist, 40s, determined gaze, dark hair pulled back', usageCount: 24, gradient: 'from-violet-500 to-purple-600', initials: 'EV', starred: true },
  { id: '2', name: 'Agent Mercer', description: 'Government agent, stern, short gray hair, black suit', usageCount: 18, gradient: 'from-cyan-500 to-blue-600', initials: 'AM', starred: false },
  { id: '3', name: 'ARIA (AI)', description: 'Holographic AI assistant, ethereal blue glow, feminine form', usageCount: 31, gradient: 'from-emerald-500 to-teal-600', initials: 'AR', starred: true },
  { id: '4', name: 'Commander Liu', description: 'Military commander, strong build, decorated uniform, scar on cheek', usageCount: 12, gradient: 'from-red-500 to-orange-600', initials: 'CL', starred: false },
  { id: '5', name: 'Young Kaito', description: 'Teenage hacker, messy hair, oversized hoodie, headphones', usageCount: 9, gradient: 'from-pink-500 to-rose-600', initials: 'YK', starred: false },
  { id: '6', name: 'The Oracle', description: 'Mystical elder, flowing robes, glowing eyes, ancient symbols', usageCount: 7, gradient: 'from-amber-500 to-yellow-600', initials: 'TO', starred: true },
];

export default function CharactersPage() {
  const [characters, setCharacters] = useState(sampleCharacters);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!newName.trim()) return;
    const initials = newName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const gradients = ['from-violet-500 to-purple-600', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-pink-500 to-rose-600'];
    const newChar: Character = {
      id: Date.now().toString(),
      name: newName,
      description: newDescription,
      usageCount: 0,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      initials,
      starred: false,
    };
    setCharacters(prev => [newChar, ...prev]);
    setNewName('');
    setNewDescription('');
    setShowCreateForm(false);
  };

  const toggleStar = (id: string) => {
    setCharacters(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
  };

  const deleteCharacter = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
    setActiveMenu(null);
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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-600 to-pink-500">
            <Users2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Character Consistency</h1>
        </div>
        <p className="text-white/60 ml-14">
          Create and manage characters to maintain visual consistency across all your generations.
        </p>
      </motion.div>

      {/* Upload Character Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Upload Character Reference</h2>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          className={cn(
            'border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer',
            isDragOver
              ? 'border-violet-500/60 bg-violet-500/10'
              : 'border-white/[0.1] bg-white/[0.02] hover:border-white/[0.2] hover:bg-white/[0.04]'
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center">
              <Upload className="w-7 h-7 text-white/40" />
            </div>
            <div>
              <p className="text-white/80 font-medium">Drop character images here</p>
              <p className="text-sm text-white/40 mt-1">or click to browse — PNG, JPG up to 10MB</p>
            </div>
            <button className="mt-2 px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white/80 hover:bg-white/[0.08] transition-all">
              Browse Files
            </button>
          </div>
        </div>
      </motion.div>

      {/* Character Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Character Library</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Character
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search characters..."
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
          />
        </div>

        {/* Create New Character Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-violet-500/30 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">New Character</h3>
              <button onClick={() => setShowCreateForm(false)} className="text-white/40 hover:text-white/60">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Character Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Captain Nova"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Description</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe physical appearance, clothing, distinctive features..."
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Reference Images</label>
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl border border-dashed border-white/[0.15] flex items-center justify-center cursor-pointer hover:border-white/[0.3] transition-all"
                  >
                    <ImageIcon className="w-5 h-5 text-white/30" />
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!newName.trim()}
              className={cn(
                'w-full py-3 rounded-xl font-semibold text-white transition-all',
                newName.trim()
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/25'
                  : 'bg-white/[0.05] text-white/30 cursor-not-allowed'
              )}
            >
              Save to Library
            </motion.button>
          </motion.div>
        )}

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((char, idx) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 group hover:border-white/[0.15] transition-all duration-300 relative"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={cn('w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0', char.gradient)}>
                  <span className="text-white font-bold text-lg">{char.initials}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold truncate">{char.name}</h3>
                    <button onClick={() => toggleStar(char.id)}>
                      <Star className={cn('w-4 h-4 transition-colors', char.starred ? 'text-amber-400 fill-amber-400' : 'text-white/20 hover:text-white/40')} />
                    </button>
                  </div>
                  <p className="text-xs text-white/50 mt-1 line-clamp-2">{char.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[11px] text-white/40 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Used {char.usageCount} times
                    </span>
                  </div>
                </div>

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === char.id ? null : char.id)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4 text-white/40" />
                  </button>
                  {activeMenu === char.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-8 z-20 w-36 bg-[#1a1a2e] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl"
                    >
                      <button className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/[0.05] flex items-center gap-2">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => deleteCharacter(char.id)}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-white/[0.05] flex items-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
