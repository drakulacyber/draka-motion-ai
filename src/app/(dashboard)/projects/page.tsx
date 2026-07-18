'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen,
  Plus,
  Search,
  LayoutGrid,
  List,
  Star,
  MoreHorizontal,
  Clock,
  Image,
  Video,
  Layers,
  HardDrive,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  SortAsc,
  FolderPlus,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProjectsStore } from '@/stores';
import type { Project } from '@/types';

type SortOption = 'updated' | 'name' | 'items' | 'created';
type ViewMode = 'grid' | 'list';

const gradientThumbnails = [
  'from-violet-600/40 via-fuchsia-500/30 to-pink-500/40',
  'from-cyan-500/40 via-blue-500/30 to-indigo-500/40',
  'from-emerald-500/40 via-teal-500/30 to-cyan-500/40',
  'from-amber-500/40 via-orange-500/30 to-rose-500/40',
];

const typeConfig: Record<Project['type'], { icon: React.ReactNode; label: string; color: string }> = {
  image: {
    icon: <Image className="w-3 h-3" />,
    label: 'Image',
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  video: {
    icon: <Video className="w-3 h-3" />,
    label: 'Video',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  mixed: {
    icon: <Layers className="w-3 h-3" />,
    label: 'Mixed',
    color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
  },
};

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function ProjectsPage() {
  const { projects, toggleFavorite, deleteProject } = useProjectsStore();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const totalItems = projects.reduce((sum, p) => sum + p.itemCount, 0);

  const filteredProjects = useMemo(() => {
    let result = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'items':
          return b.itemCount - a.itemCount;
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  }, [projects, search, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'updated', label: 'Last Updated' },
    { value: 'name', label: 'Name' },
    { value: 'items', label: 'Item Count' },
    { value: 'created', label: 'Date Created' },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/[0.08]">
            <FolderOpen className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="text-sm text-white/40">Organize and manage your creative work</p>
          </div>
        </div>
      </motion.div>

      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      >
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* New Project Button */}
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25">
            <Plus className="w-4 h-4" />
            New Project
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                viewMode === 'grid'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-white/40 hover:text-white/60'
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                viewMode === 'list'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-white/40 hover:text-white/60'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-white/60 hover:text-white hover:border-white/[0.15] transition-colors"
            >
              <SortAsc className="w-4 h-4" />
              <span className="hidden sm:inline">{sortOptions.find((o) => o.value === sortBy)?.label}</span>
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-[#141420] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl z-50"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        'w-full px-4 py-2.5 text-left text-sm transition-colors',
                        sortBy === option.value
                          ? 'text-violet-400 bg-violet-500/10'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="flex items-center gap-6 mb-8"
      >
        {[
          { label: 'Projects', value: projects.length, icon: <FolderOpen className="w-4 h-4 text-violet-400" /> },
          { label: 'Items', value: totalItems, icon: <Layers className="w-4 h-4 text-cyan-400" /> },
          { label: 'Storage', value: '4.2 GB', icon: <HardDrive className="w-4 h-4 text-emerald-400" /> },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 text-sm">
            {stat.icon}
            <span className="text-white font-medium">{stat.value}</span>
            <span className="text-white/40">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Project Cards Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'flex flex-col gap-3'
          )}
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={cn(
                'group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]',
                viewMode === 'list' && 'flex items-center'
              )}
            >
              {/* Thumbnail */}
              <div
                className={cn(
                  'relative overflow-hidden',
                  viewMode === 'grid' ? 'h-40' : 'w-24 h-24 flex-shrink-0 m-3 rounded-xl'
                )}
              >
                <div
                  className={cn(
                    'w-full h-full bg-gradient-to-br',
                    gradientThumbnails[idx % gradientThumbnails.length]
                  )}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white/20" />
                </div>

                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredCard === project.id && viewMode === 'grid' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      {[
                        { icon: <ExternalLink className="w-4 h-4" />, label: 'Open' },
                        { icon: <Pencil className="w-4 h-4" />, label: 'Edit' },
                        { icon: <Copy className="w-4 h-4" />, label: 'Duplicate' },
                        {
                          icon: <Trash2 className="w-4 h-4" />,
                          label: 'Delete',
                          onClick: () => deleteProject(project.id),
                          danger: true,
                        },
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={action.onClick}
                          className={cn(
                            'p-2.5 rounded-xl border transition-all duration-200 hover:scale-110',
                            'danger' in action && action.danger
                              ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                          )}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Type Badge */}
                {viewMode === 'grid' && (
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-lg border',
                        typeConfig[project.type].color
                      )}
                    >
                      {typeConfig[project.type].icon}
                      {typeConfig[project.type].label}
                    </span>
                  </div>
                )}

                {/* Favorite Star */}
                {viewMode === 'grid' && (
                  <button
                    onClick={() => toggleFavorite(project.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-colors"
                  >
                    <Star
                      className={cn(
                        'w-4 h-4 transition-colors',
                        project.isFavorite
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-white/40 hover:text-white/60'
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className={cn('p-4', viewMode === 'list' && 'flex-1 flex items-center justify-between')}>
                <div className={cn(viewMode === 'list' && 'flex-1')}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm truncate">{project.name}</h3>
                    {viewMode === 'list' && (
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border',
                          typeConfig[project.type].color
                        )}
                      >
                        {typeConfig[project.type].icon}
                        {typeConfig[project.type].label}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-white/40 text-xs mb-3 line-clamp-1">{project.description}</p>
                  )}

                  {/* Tags */}
                  {viewMode === 'grid' && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] text-white/40 bg-white/[0.05] rounded-md border border-white/[0.06]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {project.itemCount} items
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(project.updatedAt)}
                    </span>
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleFavorite(project.id)}
                      className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <Star
                        className={cn(
                          'w-4 h-4 transition-colors',
                          project.isFavorite
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-white/30 hover:text-white/50'
                        )}
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/30 hover:text-white/60">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="p-6 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <FolderPlus className="w-12 h-12 text-white/20" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-white/40 text-sm mb-6 text-center max-w-sm">
            {search
              ? 'Try adjusting your search terms'
              : 'Create your first project to start organizing your AI-generated content'}
          </p>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </motion.div>
      )}
    </div>
  );
}
