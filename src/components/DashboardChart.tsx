"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Job } from "@/types/job.types";
import { format } from "date-fns";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardChart({ data }: { data: Job[] }) {
  return (
    <>
      <MarketingChart data={data} />
      <ProfitChart data={data} />
    </>
  );
}

function groupDataByMonth(data: Job[]) {
  const result: Record<string, number> = {};

  data.forEach((job) => {
    const month = format(job.period_job, "MMMM yyyy");
    if (!result[month]) {
      result[month] = 0;
    }
    result[month] += job.gross_profit;
  });

  return Object.entries(result).map(([month, gross_profit]) => ({
    month,
    gross_profit,
  }));
}

const ProfitChart = ({ data }: { data: Job[] }) => {
  const chartData = groupDataByMonth(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Chart</CardTitle>
        <CardDescription>Gross profit grouped by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="gross_profit"
              fill="var(--color-desktop)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing gross profit for the selected period
        </div>
      </CardFooter>
    </Card>
  );
};

function MarketingChart({ data }: { data: Job[] }) {
  const sortedData = data
    .reduce(
      (acc, job) => {
        const existingEmployee = acc.find(
          (employee) => employee.employee === job.employee.name,
        );

        if (existingEmployee) {
          existingEmployee.amount += job.amount;
        } else {
          acc.push({
            employee: job.employee.name,
            amount: job.amount,
          });
        }

        return acc;
      },
      [] as { employee: string; amount: number }[],
    )
    .sort((a, b) => b.amount - a.amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Chart</CardTitle>
        <CardDescription>
          Employees with their respective job counts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis type="number" dataKey="amount" hide />
            <YAxis
              dataKey="employee"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing all employees with their job counts in the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
