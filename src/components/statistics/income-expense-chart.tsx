'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { format, toDate } from 'date-fns';
import { useSettings } from '@/context/settings-context';
import { formatCurrency } from '@/lib/utils';
import { useTransactions } from '@/context/transaction-context';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-2))',
  },
  expense: {
    label: 'Expense',
    color: 'hsl(var(--chart-1))',
  },
};

export function IncomeExpenseChart() {
  const { transactions } = useTransactions();
  const { currency, isSettingsLoading } = useSettings();

  const chartData = useMemo(() => {
    const monthlyData = new Map<string, { month: string; sortDate: Date; income: number; expense: number }>();

    for (const transaction of transactions) {
      const date = transaction.date instanceof Date ? transaction.date : toDate(transaction.date);
      const month = format(date, 'MMM yyyy');
      const current = monthlyData.get(month) ?? {
        month,
        sortDate: new Date(date.getFullYear(), date.getMonth(), 1),
        income: 0,
        expense: 0,
      };

      current[transaction.type] += transaction.amount;
      monthlyData.set(month, current);
    }

    return Array.from(monthlyData.values())
      .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
      .map(({ month, income, expense }) => ({ month, income, expense }));
  }, [transactions]);


  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis 
          tickFormatter={(value) => isSettingsLoading ? '' : formatCurrency(Number(value), currency, { notation: 'compact' })}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
