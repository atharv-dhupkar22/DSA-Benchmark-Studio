"use client";

import { motion } from "framer-motion";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HistoryItem } from "@/types/history";

interface ExecutionChartProps {
  history: HistoryItem[];
}

export default function ExecutionChart({
  history,
}: ExecutionChartProps) {
  const chartData = history.map((item, index) => ({
    name: `${index + 1}`,
    algorithm: item.algorithm,
    execution: Number(
      item.execution.average_ms.toFixed(4)
    ),
  }));

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Execution Time Trend
        </h2>

        <p className="mt-1 text-slate-400">
          Average execution time for benchmark runs.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
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
                color: "#fff",
              }}
              formatter={(value) => [
                `${value} ms`,
                "Execution",
              ]}
              labelFormatter={(label) => {
                const item =
                  chartData[Number(label) - 1];

                return item
                  ? item.algorithm
                  : label;
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="execution"
              name="Execution Time"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}