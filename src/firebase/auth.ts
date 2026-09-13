'use client';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';

/**
 * Initiates the Google Sign-In process.
 * This is the primary function for user authentication via Google.
 * It handles the popup and returns the authenticated user on success.
 * @param auth - The Firebase Auth instance.
 * @returns A promise that resolves with the User object on success.
 * @throws An error if the sign-in process is cancelled or fails.
 */
export async function signInWithGoogle(auth: Auth): Promise<User> {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (authError: any) {
    if (authError.code === 'auth/popup-closed-by-user') {
      // This is a normal user action, not a critical error.
      // We throw a specific, identifiable error to be caught gracefully in the UI.
      throw new Error('You cancelled the sign-in process.');
    }
    // For other errors, log them and re-throw them to be handled by the caller.
    console.error('Google Sign-In Error:', authError);
    throw authError;
  }
}
