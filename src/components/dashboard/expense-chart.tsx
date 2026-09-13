'use client';

import { useMemo } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTransactions } from '@/context/transaction-context';

const chartConfig = {
  amount: {
    label: 'Amount',
  },
};

export function ExpenseChart() {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    const totalsByCategory = new Map<string, number>();

    for (const transaction of transactions) {
      if (transaction.type !== 'expense') continue;
      totalsByCategory.set(
        transaction.category,
        (totalsByCategory.get(transaction.category) ?? 0) + transaction.amount
      );
    }

    return Array.from(totalsByCategory, ([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 10, right: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="category"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={80}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <ChartTooltip cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
