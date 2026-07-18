import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.draka.motionai',
  appName: 'Draka Motion AI',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#0a0a0f',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0a0a0f',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      backgroundColor: '#0a0a0f',
      style: 'DARK',
    },
  },
};

export default config;
