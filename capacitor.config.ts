import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'La-Luna-Magnifica',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 10000,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      fadeOutDuration: 500,
    },
  },
};

export default config;
