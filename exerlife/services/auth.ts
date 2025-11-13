import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  updatePassword,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/firebase/config';

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export function listenAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signUpWithEmail(payload: SignUpPayload) {
  const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

  await setDoc(doc(db, 'users', user.uid), {
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? null,
    avatar_url: null,
    goal: null,
    activity_level: null,
    weight_kg: null,
    height_cm: null,
    createdAt: new Date().toISOString(),
    achievements: [
      {
        key: 'welcome',
        label: 'Bem-vindo',
        earnedAt: new Date().toISOString(),
      },
    ],
    settings: {
      theme: 'light',
      notifications: {
        workouts: true,
        hydration: true,
        meals: true,
      },
      water_goal_ml: 2000,
    },
    points: 0,
  });

  return user;
}

export async function signInEmail(email: string, password: string) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export async function signInWithGoogle(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  const { user } = await signInWithCredential(auth, credential);
  return user;
}

export function buildRecaptchaVerifier(containerId: string) {
  return new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
}

export async function signInPhone(
  phoneNumber: string,
  verifier: RecaptchaVerifier,
): Promise<{ confirmationResult: Awaited<ReturnType<typeof signInWithPhoneNumber>> }> {
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  return { confirmationResult };
}

export async function confirmPhoneCode(
  confirmationResult: Awaited<ReturnType<typeof signInWithPhoneNumber>>,
  code: string,
) {
  const { user } = await confirmationResult.confirm(code);
  return user;
}

export async function requestPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email, {
    url: 'https://exerlife.app/reset-password',
    handleCodeInApp: true,
  });
}

export async function applyResetCode(oobCode: string, newPassword: string) {
  await confirmPasswordReset(auth, oobCode, newPassword);
}

export async function enforceNewPassword(newPassword: string) {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  await updatePassword(auth.currentUser, newPassword);
}

export async function verifyResetCode(oobCode: string) {
  await applyActionCode(auth, oobCode);
}

export async function logOut() {
  await signOut(auth);
}
