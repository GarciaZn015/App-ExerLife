import Constants from 'expo-constants';
import { FirebaseOptions, initializeApp, getApps } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const expoExtra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

const firebaseConfig: FirebaseOptions = {
  apiKey: expoExtra.firebaseApiKey ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: expoExtra.firebaseAuthDomain ?? process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: expoExtra.firebaseProjectId ?? process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: expoExtra.firebaseStorageBucket ?? process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    expoExtra.firebaseMessagingSenderId ?? process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: expoExtra.firebaseAppId ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.warn(
    'Firebase config ausente. Configure as variáveis EXPO_PUBLIC_FIREBASE_* ou expo.extra.*',
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const collections = {
  users: 'users',
  workouts: 'workouts',
  hydration: 'hydration',
  meals: 'meals',
  achievements: 'achievements',
  leaderboard: 'leaderboard',
  aiConversations: 'ai_conversations',
};
