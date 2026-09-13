'use client';

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChartLoading = () => <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />;

const IncomeExpenseChart = dynamic(
  () => import('@/components/statistics/income-expense-chart').then((module) => module.IncomeExpenseChart),
  { ssr: false, loading: ChartLoading }
);

const CategorySpendChart = dynamic(
  () => import('@/components/statistics/category-spend-chart').then((module) => module.CategorySpendChart),
  { ssr: false, loading: ChartLoading }
);

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Statistics</h1>
      <p className="text-muted-foreground">
        Analyze your financial trends and spending habits.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Income vs. Expense</CardTitle>
            <CardDescription>A monthly comparison of your cash flow.</CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Category Breakdown</CardTitle>
            <CardDescription>How your expenses are distributed across categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySpendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
