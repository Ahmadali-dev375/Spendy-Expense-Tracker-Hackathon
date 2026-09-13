'use client';

import {
  collection,
  writeBatch,
  doc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import type { Transaction } from '@/lib/types';

/**
 * Reads transactions from local storage, syncs them to Firestore in a batch,
 * and then clears the local storage data.
 * @param firestore - The Firestore instance.
 * @param userId - The UID of the user to sync data for.
 */
export async function syncLocalDataToFirestore(
  firestore: Firestore,
  userId: string
): Promise<void> {
  const localTransactionsRaw = localStorage.getItem('transactions');
  if (!localTransactionsRaw) {
    console.log('No local data to sync.');
    return;
  }

  try {
    const localTransactions: Transaction[] = JSON.parse(localTransactionsRaw);
    if (!Array.isArray(localTransactions) || localTransactions.length === 0) {
      console.log('Local data is empty or invalid, clearing storage.');
      localStorage.removeItem('transactions');
      return;
    }

    const batch = writeBatch(firestore);
    const transactionsColRef = collection(
      firestore,
      'users',
      userId,
      'transactions'
    );

    for (const transaction of localTransactions) {
      // Use the existing local UUID as the document ID
      const newTransactionRef = doc(transactionsColRef, transaction.id);
      const transactionData = {
        ...transaction,
        amount: Number(transaction.amount),
        date: transaction.date ? new Date(transaction.date as string) : serverTimestamp(),
        userId: userId,
      };
      
      // The local ID is now the document ID, so we don't need it in the data
      delete (transactionData as any).id;
      
      batch.set(newTransactionRef, transactionData);
    }

    await batch.commit();

    localStorage.removeItem('transactions');
    console.log('Local data successfully synced to Firestore and cleared.');
  } catch (error) {
    console.error('Error during data sync:', error);
    // Re-throw the error so the UI can handle it (e.g., show a toast)
    throw new Error('Failed to sync local data. Please try again.');
  }
}
