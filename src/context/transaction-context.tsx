'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { useUser, useFirestore } from '@/firebase/provider';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, Timestamp } from 'firebase/firestore';
import type { Transaction } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toDate } from 'date-fns';

type TransactionInput = Omit<Transaction, 'id' | 'userId'>;

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  addTransaction: (transaction: TransactionInput) => Promise<void>;
  updateTransaction: (id: string, transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const createTransactionId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [storagePreference, setStoragePreference] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs once on mount to get the initial preference.
    const pref = typeof window !== 'undefined' ? localStorage.getItem('storagePreference') : null;
    setStoragePreference(pref);
  }, []);

  // New effect to re-check storage preference when user logs in/out.
  // This is key for the auto-refresh.
  useEffect(() => {
    if (!isUserLoading) {
      const pref = localStorage.getItem('storagePreference');
      setStoragePreference(pref);
    }
  }, [isUserLoading, user]);


  // Load transactions from localStorage
  const loadLocalTransactions = useCallback(() => {
    setIsLoading(true);
    try {
      const localData = localStorage.getItem('transactions');
      if (localData) {
        const parsedData: Transaction[] = JSON.parse(localData).map((t: any) => ({
          ...t,
          date: toDate(t.date),
        }));
        setTransactions(parsedData);
      } else {
        setTransactions([]);
      }
    } catch (e) {
      console.error("Failed to load local transactions:", e);
      setError(e as Error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Firestore listener
  useEffect(() => {
    // Don't do anything until we know the user status and storage preference
    if (isUserLoading || storagePreference === null) {
      setIsLoading(true);
      return;
    }
    
    if (user && storagePreference === 'firebase') {
      const transactionsCol = collection(firestore, 'users', user.uid, 'transactions');
      const q = query(transactionsCol);

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const fetchedTransactions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              date: (data.date as Timestamp).toDate(),
            } as Transaction;
          });
          setTransactions(fetchedTransactions);
          setError(null);
          setIsLoading(false);
        },
        (err) => {
          console.error("Firestore snapshot error:", err);
          setError(err);
          const contextualError = new FirestorePermissionError({
            operation: 'list',
            path: `users/${user.uid}/transactions`,
          });
          errorEmitter.emit('permission-error', contextualError);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } else if (storagePreference === 'local') {
      loadLocalTransactions();
    } else {
      // No user and no local preference, or preference is still null
      setIsLoading(false);
      setTransactions([]);
    }

  }, [user, isUserLoading, firestore, loadLocalTransactions, storagePreference]);
  
  const addTransaction = useCallback(async (transactionInput: TransactionInput) => {
    if (user && storagePreference === 'firebase') {
      const newTransaction = {
        ...transactionInput,
        userId: user.uid,
        date: Timestamp.fromDate(transactionInput.date as Date),
      };
      const transactionsCol = collection(firestore, 'users', user.uid, 'transactions');
      addDoc(transactionsCol, newTransaction).catch(err => {
         errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `users/${user.uid}/transactions`,
            operation: 'create',
            requestResourceData: newTransaction,
         }));
      });
    } else {
      const newTransaction: Transaction = {
        ...transactionInput,
        id: createTransactionId(),
        date: (transactionInput.date as Date).toISOString(),
      };
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }
  }, [user, firestore, transactions, storagePreference]);

  const updateTransaction = useCallback(async (id: string, transactionInput: TransactionInput) => {
    if (user && storagePreference === 'firebase') {
        const transactionRef = doc(firestore, 'users', user.uid, 'transactions', id);
        const updatedData = {
          ...transactionInput,
          date: Timestamp.fromDate(transactionInput.date as Date),
        };
        updateDoc(transactionRef, updatedData).catch(err => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: transactionRef.path,
                operation: 'update',
                requestResourceData: updatedData,
            }));
        });
    } else {
        const updatedTransactions = transactions.map(t =>
            t.id === id ? { ...t, ...transactionInput, date: (transactionInput.date as Date).toISOString() } : t
        );
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }
  }, [user, firestore, transactions, storagePreference]);

  const deleteTransaction = useCallback(async (id: string) => {
    if (user && storagePreference === 'firebase') {
        const transactionRef = doc(firestore, 'users', user.uid, 'transactions', id);
        deleteDoc(transactionRef).catch(err => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: transactionRef.path,
                operation: 'delete',
            }));
        });
    } else {
        const updatedTransactions = transactions.filter(t => t.id !== id);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }
  }, [user, firestore, transactions, storagePreference]);

  const contextValue = useMemo(() => ({
    transactions,
    isLoading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }), [transactions, isLoading, error, addTransaction, updateTransaction, deleteTransaction]);

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
