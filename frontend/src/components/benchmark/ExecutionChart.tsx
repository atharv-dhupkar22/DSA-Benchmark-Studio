"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { BenchmarkResponse } from "@/types/benchmark";

interface ExecutionChartProps {
  result: BenchmarkResponse | null;
}

export default function ExecutionChart({
  result,
}: ExecutionChartProps) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Execution Time Analysis
        </h2>

        <div className="flex h-[350px] items-center justify-center text-slate-400">
          Run a benchmark to visualize execution metrics.
        </div>
      </div>
    );
  }

  const chartData = [
    {
      metric: "Minimum",
      value: result.execution.minimum_ms,
    },
    {
      metric: "Median",
      value: result.execution.median_ms,
    },
    {
      metric: "Average",
      value: result.execution.average_ms,
    },
    {
      metric: "Maximum",
      value: result.execution.maximum_ms,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Execution Time Analysis
        </h2>

        <p className="mt-2 text-slate-400">
          Minimum, Median, Average and Maximum execution time.
        </p>
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="metric"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
              unit=" ms"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Minimum
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {result.execution.minimum_ms.toFixed(4)} ms
          </h3>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Median
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {result.execution.median_ms.toFixed(4)} ms
          </h3>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Average
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {result.execution.average_ms.toFixed(4)} ms
          </h3>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Maximum
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {result.execution.maximum_ms.toFixed(4)} ms
          </h3>
        </div>
      </div>
    </motion.div>
  );
}