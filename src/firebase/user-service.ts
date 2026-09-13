'use client';
import {
  doc,
  getDoc,
  setDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';

/**
 * Saves or updates the user's profile in Firestore in a non-blocking way.
 * The operation runs in the background using promises.
 * @param firestore - The Firestore instance.
 * @param user - The Firebase Auth user object.
 */
export function saveUserProfile(firestore: Firestore, user: User): void {
  const userRef = doc(firestore, 'users', user.uid);

  getDoc(userRef).then(docSnap => {
    if (!docSnap.exists()) {
      // New user: create the document.
      return setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        currency: 'USD',
      });
    } else {
      // Existing user: update the lastLogin timestamp.
      return setDoc(userRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
    }
  }).catch(error => {
    // Emit a specific, contextual error for debugging.
    const permissionError = new FirestorePermissionError({
      path: userRef.path,
      operation: 'write',
      requestResourceData: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    });
    errorEmitter.emit('permission-error', permissionError);
    
    // Log the error but don't re-throw to avoid unhandled promise rejections.
    console.error('Could not save user profile.', error);
  });
}
