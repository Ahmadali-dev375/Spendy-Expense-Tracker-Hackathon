'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { transactionCategories } from '@/lib/data';
import { Filter, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface FiltersProps {
  typeFilter: string | null;
  setTypeFilter: Dispatch<SetStateAction<string | null>>;
  categoryFilter: string | null;
  setCategoryFilter: Dispatch<SetStateAction<string | null>>;
  onClearFilters: () => void;
}

export function Filters({
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  onClearFilters,
}: FiltersProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Filter by:
        </span>
      </div>
      <Select
        value={typeFilter || ''}
        onValueChange={(value) => setTypeFilter(value || null)}
      >
        <SelectTrigger className="w-full sm:w-[180px] h-9">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={categoryFilter || ''}
        onValueChange={(value) => setCategoryFilter(value || null)}
      >
        <SelectTrigger className="w-full sm:w-[180px] h-9">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {transactionCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(typeFilter || categoryFilter) && (
        <Button variant="ghost" className="h-9 px-2 lg:px-3" onClick={onClearFilters}>
          Clear
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
