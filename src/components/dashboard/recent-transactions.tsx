'use client';

import { useMemo, type FC } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatCurrency } from "@/lib/utils";
import { ShoppingCart, Utensils, Fuel, Wifi, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { toDate } from "date-fns";
import { useSettings } from "@/context/settings-context";
import { Skeleton } from "../ui/skeleton";
import { useTransactions } from "@/context/transaction-context";

const categoryIcons: Record<Transaction['category'], LucideIcon | FC<any>> = {
    'Food': Utensils,
    'Travel': Fuel,
    'Bills': Wifi,
    'Shopping': ShoppingCart,
    'Salary': Wallet,
    'Other': Wallet
};

export function RecentTransactions() {
  const { transactions } = useTransactions();
  const { currency, isSettingsLoading } = useSettings();
  const recent = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => {
          const dateA = a.date instanceof Date ? a.date : toDate(a.date);
          const dateB = b.date instanceof Date ? b.date : toDate(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5),
    [transactions]
  );

  if (recent.length === 0) {
    return <p className="text-sm text-muted-foreground">No recent transactions.</p>;
  }

  return (
    <div className="space-y-4">
      {recent.map((transaction) => {
        const Icon = categoryIcons[transaction.category];
        return (
          <div key={transaction.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback className={cn(
                'bg-muted'
              )}>
                <Icon className={cn('h-4 w-4 text-muted-foreground')} />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.category}</p>
            </div>
            {isSettingsLoading ? (
              <Skeleton className="ml-auto h-5 w-16" />
            ) : (
              <div className={cn(
                "ml-auto font-medium",
                transaction.type === 'income' ? 'text-success' : 'text-foreground'
              )}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
