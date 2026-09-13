'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileWarning } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { format, toDate } from 'date-fns';
import type { Transaction } from '@/lib/types';
import React from 'react';
import { useSettings } from '@/context/settings-context';
import { Skeleton } from '../ui/skeleton';
import { EditTransactionDialog } from './edit-transaction-dialog';
import { useTransactions } from '@/context/transaction-context';

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionsTable({
  transactions,
  isLoading,
}: TransactionsTableProps) {
  const { currency, isSettingsLoading } = useSettings();
  const { deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] =
    React.useState<Transaction | null>(null);

  const { groupedTransactions, sortedDates } = React.useMemo(() => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = format(
        transaction.date instanceof Date ? transaction.date : toDate(transaction.date),
        'yyyy-MM-dd'
      );
      (acc[date] ??= []).push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);

    for (const transactionsForDate of Object.values(grouped)) {
      transactionsForDate.sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : toDate(a.date);
        const dateB = b.date instanceof Date ? b.date : toDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return {
      groupedTransactions: grouped,
      sortedDates: Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      ),
    };
  }, [transactions]);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCloseDialog = () => {
    setEditingTransaction(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-8 w-1/4 mb-2" />
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Skeleton className="h-5 w-24" />
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      <Skeleton className="h-5 w-16" />
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Skeleton className="h-5 w-20" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-5 w-20 ml-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(2)].map((_, j) => (
                    <TableRow key={j}>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-5 w-20 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileWarning className="h-8 w-8" />
                    <p>No transactions found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedDates.map((date) => (
                <React.Fragment key={date}>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableCell
                      colSpan={5}
                      className="py-2 px-4 font-semibold text-muted-foreground"
                    >
                      {format(new Date(date), 'EEEE, MMMM do, yyyy')}
                    </TableCell>
                  </TableRow>
                  {groupedTransactions[date].map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{transaction.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(transaction.date instanceof Date ? transaction.date : toDate(transaction.date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-right',
                            transaction.type === 'income' ? 'text-success' : ''
                          )}
                        >
                          {isSettingsLoading ? (
                            <Skeleton className="h-5 w-20 ml-auto" />
                          ) : (
                            <>
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(transaction.amount, currency)}
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() => handleEdit(transaction)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteTransaction(transaction.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          isOpen={!!editingTransaction}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}
