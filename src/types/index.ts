// ============================================
// AI Model & Provider Types
// ============================================
export type AIProvider =
  | 'openai' | 'stability' | 'flux' | 'runway' | 'kling'
  | 'pika' | 'luma' | 'midjourney' | 'leonardo' | 'ideogram'
  | 'google' | 'claude' | 'minimax' | 'hailuo' | 'veo'
  | 'pixverse' | 'wan' | 'comfyui' | 'automatic1111' | 'forge'
  | 'ollama' | 'openrouter' | 'custom';

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  type: 'text-to-image' | 'text-to-video' | 'image-to-video' | 'upscale' | 'voice' | 'music' | 'sfx';
  description: string;
  icon: string;
  maxResolution?: string;
  maxDuration?: number;
  costPerCredit: number;
  isAvailable: boolean;
  isPremium: boolean;
}

// ============================================
// Generation Types
// ============================================
export type GenerationStatus = 'idle' | 'queued' | 'generating' | 'processing' | 'completed' | 'failed';

export type ImageStyle =
  | 'realistic' | 'anime' | 'pixar' | 'disney' | 'cinematic'
  | 'photorealistic' | '3d-render' | 'fantasy' | 'architecture'
  | 'product-photography' | 'fashion' | 'portrait' | 'concept-art'
  | 'ui-design' | 'logo' | 'sticker' | 'comic' | 'manga'
  | 'interior' | 'food-photography' | 'vehicle' | 'macro' | 'landscape';

export type AspectRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16' | '21:9' | '2:3' | '3:2';
export type Resolution = '512x512' | '768x768' | '1024x1024' | '1536x1536' | '2048x2048' | '4096x4096';
export type VideoResolution = '720p' | '1080p' | '2K' | '4K' | '8K';
export type VideoDuration = 5 | 10 | 15 | 20 | 30 | 60;
export type VideoFPS = 24 | 30 | 60;
export type UpscaleFactor = 2 | 4 | 8 | 16;

export type CameraMovement =
  | 'static' | 'pan-left' | 'pan-right' | 'tilt-up' | 'tilt-down'
  | 'zoom-in' | 'zoom-out' | 'orbit' | 'drone' | 'tracking'
  | 'handheld' | 'dolly' | 'crane';

export interface TextToImageParams {
  prompt: string;
  negativePrompt?: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  model: string;
  seed?: number;
  cfgScale: number;
  samplingMethod: string;
  numberOfImages: number;
  referenceImage?: string;
  cameraLens?: string;
  lighting?: string;
  quality: 'draft' | 'standard' | 'high' | 'ultra';
}

export interface TextToVideoParams {
  prompt: string;
  negativePrompt?: string;
  duration: VideoDuration;
  fps: VideoFPS;
  resolution: VideoResolution;
  model: string;
  cameraMovement: CameraMovement;
  characterConsistency: boolean;
  motionControl: number;
  lipSync: boolean;
  emotion?: string;
  weather?: string;
  timeOfDay?: string;
  soundPrompt?: string;
  musicPrompt?: string;
  narrationPrompt?: string;
  voicePrompt?: string;
  seed?: number;
}

export interface ImageToVideoParams {
  sourceImage: string;
  prompt?: string;
  duration: VideoDuration;
  fps: VideoFPS;
  resolution: VideoResolution;
  model: string;
  cameraMovement: CameraMovement;
  animationType: string[];
  loop: boolean;
}

export interface UpscaleParams {
  sourceImage: string;
  factor: UpscaleFactor;
  restoreFace: boolean;
  restoreDetails: boolean;
  sharpen: boolean;
  noiseReduction: boolean;
  colorCorrection: boolean;
}

export interface GenerationResult {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnailUrl: string;
  prompt: string;
  model: string;
  params: Record<string, unknown>;
  createdAt: string;
  creditsUsed: number;
  isFavorite: boolean;
}

// ============================================
// Project Types
// ============================================
export interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  type: 'image' | 'video' | 'mixed';
  itemCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  tags: string[];
}

// ============================================
// User Types
// ============================================
export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';
export type UserRole = 'user' | 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: SubscriptionTier;
  credits: number;
  role: UserRole;
  createdAt: string;
}

// ============================================
// Prompt Types
// ============================================
export interface SavedPrompt {
  id: string;
  text: string;
  category: string;
  isFavorite: boolean;
  usageCount: number;
  createdAt: string;
  tags: string[];
}

// ============================================
// Navigation Types
// ============================================
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  isNew?: boolean;
  isPremium?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ============================================
// Notification Types
// ============================================
export interface Notification {
  id: string;
  type: 'generation' | 'system' | 'credit' | 'team' | 'update';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
