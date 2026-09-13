'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// The full form includes react-hook-form, Zod, Radix, and the calendar. Keeping
// it out of the shared app shell prevents every route from paying to load it.
const AddTransactionDialog = dynamic(
  () =>
    import('./add-transaction-dialog').then(
      (module) => module.AddTransactionDialog
    ),
  { ssr: false }
);

export function LazyAddTransactionDialog() {
  const [shouldLoadDialog, setShouldLoadDialog] = useState(false);

  if (shouldLoadDialog) {
    return <AddTransactionDialog defaultOpen />;
  }

  return (
    <>
      <Button
        className="hidden md:inline-flex"
        onClick={() => setShouldLoadDialog(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      <Button
        aria-label="Add Transaction"
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={() => setShouldLoadDialog(true)}
      >
        <Plus className="h-5 w-5" />
      </Button>
    </>
  );
}
