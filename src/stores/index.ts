import { create } from 'zustand';
import type { User, Notification, GenerationResult, SavedPrompt, Project } from '@/types';

// ============================================
// App Store — Global UI state
// ============================================
interface AppState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  activeTheme: 'dark' | 'light';
  notifications: Notification[];
  unreadCount: number;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  activeTheme: 'dark',
  notifications: [
    {
      id: '1',
      type: 'generation',
      title: 'Image Generated',
      message: 'Your "Cyberpunk City" image has been generated successfully.',
      read: false,
      createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: '2',
      type: 'system',
      title: 'New Model Available',
      message: 'Flux Pro v2.0 is now available for image generation.',
      read: false,
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    },
    {
      id: '3',
      type: 'credit',
      title: 'Credits Low',
      message: 'You have 50 credits remaining. Consider upgrading your plan.',
      read: true,
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    },
  ],
  unreadCount: 2,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setTheme: (theme) => set({ activeTheme: theme }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));

// ============================================
// User Store
// ============================================
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  updateCredits: (credits: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: '1',
    email: 'creator@draka.ai',
    name: 'Alex Creator',
    avatar: undefined,
    subscription: 'pro',
    credits: 2450,
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateCredits: (credits) =>
    set((state) => ({
      user: state.user ? { ...state.user, credits } : null,
    })),
}));

// ============================================
// Generation Store
// ============================================
interface GenerationState {
  recentGenerations: GenerationResult[];
  favoritePrompts: SavedPrompt[];
  promptHistory: string[];
  isGenerating: boolean;
  generationProgress: number;
  addGeneration: (result: GenerationResult) => void;
  setGenerating: (generating: boolean) => void;
  setProgress: (progress: number) => void;
  addToHistory: (prompt: string) => void;
  toggleFavoritePrompt: (id: string) => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  recentGenerations: [
    {
      id: '1',
      type: 'image',
      url: '/placeholder-1.jpg',
      thumbnailUrl: '/placeholder-1.jpg',
      prompt: 'A cyberpunk cityscape at night with neon lights reflecting on wet streets',
      model: 'Flux Pro',
      params: { style: 'cinematic', resolution: '1024x1024' },
      createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
      creditsUsed: 5,
      isFavorite: true,
    },
    {
      id: '2',
      type: 'image',
      url: '/placeholder-2.jpg',
      thumbnailUrl: '/placeholder-2.jpg',
      prompt: 'Beautiful anime girl in cherry blossom garden, soft lighting',
      model: 'Stability AI',
      params: { style: 'anime', resolution: '1024x1024' },
      createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
      creditsUsed: 3,
      isFavorite: false,
    },
    {
      id: '3',
      type: 'video',
      url: '/placeholder-3.mp4',
      thumbnailUrl: '/placeholder-3.jpg',
      prompt: 'Ocean waves crashing on a rocky cliff during golden hour',
      model: 'Kling AI',
      params: { duration: 10, fps: 30 },
      createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      creditsUsed: 20,
      isFavorite: true,
    },
  ],
  favoritePrompts: [
    {
      id: '1',
      text: 'A breathtaking landscape with mountains and a crystal clear lake at sunset, cinematic lighting, 8K',
      category: 'landscape',
      isFavorite: true,
      usageCount: 15,
      createdAt: '2024-01-01T00:00:00Z',
      tags: ['landscape', 'nature', 'cinematic'],
    },
    {
      id: '2',
      text: 'Professional product photography of a luxury watch on dark marble surface, studio lighting',
      category: 'product',
      isFavorite: true,
      usageCount: 8,
      createdAt: '2024-02-01T00:00:00Z',
      tags: ['product', 'luxury', 'photography'],
    },
  ],
  promptHistory: [
    'A cyberpunk cityscape at night with neon lights',
    'Beautiful anime girl in cherry blossom garden',
    'Ocean waves crashing on a rocky cliff',
    'Futuristic spaceship interior with holographic displays',
    'Portrait of a warrior in medieval armor, dramatic lighting',
  ],
  isGenerating: false,
  generationProgress: 0,

  addGeneration: (result) =>
    set((state) => ({
      recentGenerations: [result, ...state.recentGenerations].slice(0, 50),
    })),
  setGenerating: (generating) => set({ isGenerating: generating }),
  setProgress: (progress) => set({ generationProgress: progress }),
  addToHistory: (prompt) =>
    set((state) => ({
      promptHistory: [prompt, ...state.promptHistory.filter((p) => p !== prompt)].slice(0, 100),
    })),
  toggleFavoritePrompt: (id) =>
    set((state) => ({
      favoritePrompts: state.favoritePrompts.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    })),
}));

// ============================================
// Projects Store
// ============================================
interface ProjectsState {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [
    {
      id: '1',
      name: 'Brand Campaign 2024',
      description: 'Marketing visuals for Q3 campaign',
      type: 'mixed',
      itemCount: 24,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      isFavorite: true,
      tags: ['marketing', 'brand'],
    },
    {
      id: '2',
      name: 'YouTube Thumbnails',
      description: 'AI-generated thumbnails for video content',
      type: 'image',
      itemCount: 45,
      createdAt: '2024-05-15T00:00:00Z',
      updatedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      isFavorite: false,
      tags: ['youtube', 'thumbnails'],
    },
    {
      id: '3',
      name: 'Product Launch Video',
      description: 'AI-generated promotional videos',
      type: 'video',
      itemCount: 8,
      createdAt: '2024-07-01T00:00:00Z',
      updatedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      isFavorite: true,
      tags: ['product', 'video', 'promo'],
    },
    {
      id: '4',
      name: 'Character Designs',
      description: 'Game character concept art',
      type: 'image',
      itemCount: 32,
      createdAt: '2024-04-01T00:00:00Z',
      updatedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
      isFavorite: false,
      tags: ['character', 'game', 'concept-art'],
    },
  ],
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  deleteProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    })),
}));
