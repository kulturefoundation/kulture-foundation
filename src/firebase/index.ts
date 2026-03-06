
// This is the primary entry point for all Firebase-related functionality.
// It initializes Firebase and exports all necessary providers and hooks.
// Components should import from this file rather than individual Firebase files.

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// This function can be used on both server and client. It ensures that
// Firebase is initialized only once.
export function initializeFirebase(): {
  firebaseApp: FirebaseApp,
  auth: Auth,
  firestore: Firestore
} {
  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app)
    };
  }
  const app = getApp();
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

// Export all provider components and hooks from the provider file.
// These are all client-side and should be used in 'use client' components.
export * from './provider';

// Export hooks for data fetching.
export * from './firestore/use-collection';
export * from './firestore/use-doc';

// NOTE: Error handling utilities are now in a separate module (/lib/errors)
// to prevent circular dependencies. They are not exported from here.
 
