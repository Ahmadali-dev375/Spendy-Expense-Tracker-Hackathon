'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/context/transaction-context';
import type { Transaction } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const TransactionsTable = dynamic(
  () => import('@/components/transactions/transactions-table').then((m) => m.TransactionsTable),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    ),
  }
);

const Filters = dynamic(
  () => import('@/components/transactions/filters').then((m) => m.Filters),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[180px]" />
        <Skeleton className="h-9 w-[180px]" />
      </div>
    ),
  }
);

export default function TransactionsPage() {
  const { transactions, isLoading } = useTransactions();
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    return (transactions || []).filter((transaction) => {
      const typeMatch = !typeFilter || transaction.type === typeFilter;
      const categoryMatch = !categoryFilter || transaction.category === categoryFilter;
      return typeMatch && categoryMatch;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const handleClearFilters = () => {
    setTypeFilter(null);
    setCategoryFilter(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Transactions
      </h1>
      <p className="text-muted-foreground">
        View and manage all your income and expenses.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">All Transactions</CardTitle>
          <Filters
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onClearFilters={handleClearFilters}
          />
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={filteredTransactions}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
