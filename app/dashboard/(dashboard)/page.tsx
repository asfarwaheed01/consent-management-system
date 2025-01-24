"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const cards = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "+2350",
    description: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    value: "+573",
    description: "+201 since last hour",
    icon: Activity,
  },
];

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 32000, profit: 21000 },
  { month: "Feb", revenue: 38000, profit: 24000 },
  { month: "Mar", revenue: 35000, profit: 22000 },
  { month: "Apr", revenue: 42000, profit: 28000 },
  { month: "May", revenue: 48000, profit: 32000 },
  { month: "Jun", revenue: 52000, profit: 35000 },
];

const userActivityData = [
  { hour: "00:00", active: 234 },
  { hour: "04:00", active: 156 },
  { hour: "08:00", active: 428 },
  { hour: "12:00", active: 523 },
  { hour: "16:00", active: 612 },
  { hour: "20:00", active: 432 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.label}
              </CardTitle>
              <card.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Revenue & Profit Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#666666" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#666666" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="month"
                  stroke="#666666"
                  className="text-xs text-gray-600 dark:text-gray-400"
                />
                <YAxis
                  stroke="#666666"
                  className="text-xs text-gray-600 dark:text-gray-400"
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(31 41 55)",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000000"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                  className="dark:stroke-white dark:fill-white/10"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#666666"
                  fill="url(#colorProfit)"
                  strokeWidth={2}
                  className="dark:stroke-gray-400 dark:fill-gray-400/10"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="hour"
                  stroke="#666666"
                  className="text-xs text-gray-600 dark:text-gray-400"
                />
                <YAxis
                  stroke="#666666"
                  className="text-xs text-gray-600 dark:text-gray-400"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(31 41 55)",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "8px",
                  }}
                />
                <Bar
                  dataKey="active"
                  fill="#000000"
                  radius={[4, 4, 0, 0]}
                  className="dark:fill-white/90"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
