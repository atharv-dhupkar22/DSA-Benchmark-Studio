"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface UsageChartProps {
  usage: Record<string, number>;
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
  "#f97316",
];

export default function UsageChart({
  usage,
}: UsageChartProps) {
  const chartData = Object.entries(usage).map(
    ([algorithm, count]) => ({
      algorithm,
      count,
    })
  );

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
        delay: 0.2,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Algorithm Usage
        </h2>

        <p className="mt-2 text-slate-400">
          Distribution of benchmark executions by
          algorithm.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[360px] items-center justify-center text-slate-400">
          No benchmark history available.
        </div>
      ) : (
        <div className="h-[360px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="algorithm"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={55}
                paddingAngle={3}
                animationDuration={1200}
                label={({ percent }) =>
                  `${((percent ?? 0) * 100).toFixed(
                    0
                  )}%`
                }
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
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border:
                    "1px solid #334155",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}
                formatter={(value) => [
                  value,
                  "Runs",
                ]}
              />

              <Legend
                verticalAlign="bottom"
                height={40}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}