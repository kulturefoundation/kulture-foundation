
'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

/**
 * Ensures Firebase is initialized only once on the client-side and provides
 * the necessary services (app, auth, firestore) to the FirebaseProvider.
 * This component should wrap your application's root layout.
 */
export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // `useMemo` with an empty dependency array ensures that `initializeFirebase`
  // is called only once when the component first mounts on the client.
  const { firebaseApp, auth, firestore } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}

