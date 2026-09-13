'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Plus, Minus, FileWarning, Loader2 } from 'lucide-react';
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { useSettings } from "@/context/settings-context";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import dynamic from 'next/dynamic';
import { useTransactions } from "@/context/transaction-context";

const ExpenseChart = dynamic(
  () => import('@/components/dashboard/expense-chart').then((module) => module.ExpenseChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[250px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    ),
  }
);

export default function DashboardPage() {
  const { currency, isSettingsLoading } = useSettings();
  const { transactions, isLoading: isTransactionsLoading } = useTransactions();
  
  const { totalBalance, totalIncome, totalExpenses } = React.useMemo(() => {
    return transactions.reduce(
      (totals, transaction) => {
        if (transaction.type === 'income') {
          totals.totalIncome += transaction.amount;
          totals.totalBalance += transaction.amount;
        } else {
          totals.totalExpenses += transaction.amount;
          totals.totalBalance -= transaction.amount;
        }
        return totals;
      },
      { totalBalance: 0, totalIncome: 0, totalExpenses: 0 }
    );
  }, [transactions]);

  const isLoading = isSettingsLoading || isTransactionsLoading;

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(totalBalance, currency)}</div>
            )}
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <Plus className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <Skeleton className="h-8 w-3/4" />
            ) : (
                <div className="text-2xl font-bold text-success">+{formatCurrency(totalIncome, currency)}</div>
            )}
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <Minus className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <Skeleton className="h-8 w-3/4" />
            ) : (
                <div className="text-2xl font-bold text-destructive">-{formatCurrency(totalExpenses, currency)}</div>
            )}
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Expense Overview</CardTitle>
            <CardDescription>Your spending by category this month.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading ? <div className="flex h-[250px] w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div> : <ExpenseChart />}
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="ml-4 space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <Skeleton className="ml-auto h-5 w-16" />
                  </div>
                ))}
              </div> : <RecentTransactions />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
