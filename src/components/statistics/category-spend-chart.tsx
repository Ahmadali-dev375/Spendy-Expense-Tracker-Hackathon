'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { transactionCategories } from '@/lib/data';
import { useSettings } from '@/context/settings-context';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useTransactions } from '@/context/transaction-context';

const chartConfig = transactionCategories.reduce((acc, category, index) => {
  acc[category] = {
    label: category,
    color: `hsl(var(--chart-${index + 1}))`,
  };
  return acc;
}, {} as any);

export function CategorySpendChart() {
  const { transactions } = useTransactions();
  const { currency, isSettingsLoading } = useSettings();

  const chartData = React.useMemo(() => {
    const totalsByCategory = new Map<string, number>();

    for (const transaction of transactions) {
      if (transaction.type !== 'expense') continue;
      totalsByCategory.set(
        transaction.category,
        (totalsByCategory.get(transaction.category) ?? 0) + transaction.amount
      );
    }

    return Array.from(totalsByCategory, ([category, amount], index) => ({
      category,
      amount,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
  }, [transactions]);

  const [activeCategory, setActiveCategory] = React.useState(
    chartData[0]?.category || 'Food'
  );

  const activeData = chartData.find((d) => d.category === activeCategory);

  React.useEffect(() => {
    if (chartData.length > 0 && !chartData.find(d => d.category === activeCategory)) {
        setActiveCategory(chartData[0].category);
    } else if (chartData.length === 0) {
        setActiveCategory('Food');
    }
  }, [chartData, activeCategory]);

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
            onMouseOver={(data) => setActiveCategory(data.name)}
          >
            {chartData.map((entry, index) => (
              <Sector
                key={`cell-${index}`}
                fill={entry.fill}
                name={entry.category}
              />
            ))}
            {chartData.length > 0 && activeData && !isSettingsLoading && <Label
                content={({ viewBox }) => {
                  if (
                    !viewBox ||
                    !('cx' in viewBox) ||
                    !('cy' in viewBox) ||
                    typeof viewBox.cx !== 'number' ||
                    typeof viewBox.cy !== 'number'
                  ) {
                    return null;
                  }

                  return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatCurrency(activeData.amount, currency, { notation: 'compact' })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {activeCategory}
                        </tspan>
                      </text>
                  );
                }}
            />}
            {isSettingsLoading && (
              <Label
                  content={({ viewBox }) => {
                    if (
                      !viewBox ||
                      !('cx' in viewBox) ||
                      !('cy' in viewBox) ||
                      typeof viewBox.cx !== 'number' ||
                      typeof viewBox.cy !== 'number'
                    ) {
                      return null;
                    }

                    return (
                        <foreignObject x={viewBox.cx - 50} y={viewBox.cy - 20} width="100" height="40">
                           <Skeleton className="h-full w-full" />
                        </foreignObject>
                    );
                  }}
              />
            )}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
