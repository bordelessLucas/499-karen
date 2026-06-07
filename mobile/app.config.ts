import type { ConfigContext, ExpoConfig } from 'expo/config'

type FirebaseExtraConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

function readFirebaseEnv(): FirebaseExtraConfig {
  return {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
  }
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const firebase = readFirebaseEnv()

  return {
    ...config,
    name: 'Summus Edge',
    slug: '499-borderless',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'summus-edge',
    userInterfaceStyle: 'dark',
    backgroundColor: '#050A18',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.borderless.app',
    },
    android: {
      package: 'com.borderless.app',
      versionCode: 1,
      adaptiveIcon: {
        backgroundColor: '#050A18',
        foregroundImage: './assets/images/android-icon-foreground.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 220,
          resizeMode: 'contain',
          backgroundColor: '#050A18',
        },
      ],
    ],
    experiments: {
      typedRoutes: false,
    },
    extra: {
      ...config?.extra,
      firebase,
      eas: {
        projectId: '64b83486-e3e3-4b1c-9ed4-68c2f5092dc9',
      },
    },
  }
}
