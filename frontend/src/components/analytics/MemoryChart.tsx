"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HistoryItem } from "@/types/history";

interface MemoryChartProps {
  history: HistoryItem[];
}

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#14b8a6",
  "#ec4899",
  "#84cc16",
];

export default function MemoryChart({
  history,
}: MemoryChartProps) {
  const chartData = history.map((item, index) => ({
    name: `${index + 1}`,
    algorithm: item.algorithm,
    memory: Number(
      item.peak_memory_kb.toFixed(2)
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
        delay: 0.1,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Peak Memory Usage
        </h2>

        <p className="mt-1 text-slate-400">
          Peak memory consumed by each benchmark.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
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
              unit=" KB"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              formatter={(value) => [
                `${value} KB`,
                "Peak Memory",
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

            <Bar
              dataKey="memory"
              name="Peak Memory"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}