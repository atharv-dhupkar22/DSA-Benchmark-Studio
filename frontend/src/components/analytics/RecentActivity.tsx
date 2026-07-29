"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  Cpu,
  Database,
  MemoryStick,
} from "lucide-react";

import type { HistoryItem } from "@/types/history";

interface RecentActivityProps {
  history: HistoryItem[];
}

export default function RecentActivity({
  history,
}: RecentActivityProps) {
  const recentHistory = [...history]
    .reverse()
    .slice(0, 8);

  if (recentHistory.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Recent Activity
        </h2>

        <div className="flex h-64 items-center justify-center text-slate-400">
          No benchmark history available.
        </div>
      </div>
    );
  }

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
        delay: 0.4,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <p className="mt-2 text-slate-400">
            Latest benchmark executions.
          </p>
        </div>

        <Clock3 className="h-7 w-7 text-cyan-400" />
      </div>

      <div className="space-y-5">
        {recentHistory.map((item, index) => (
          <motion.div
            key={`${item.algorithm}-${index}`}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Cpu className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {item.algorithm}
                </h3>

                <p className="text-sm text-slate-400">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Database
                  size={18}
                  className="text-indigo-400"
                />

                <span>
                  {item.dataset_type} (
                  {item.dataset_size.toLocaleString()})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3
                  size={18}
                  className="text-emerald-400"
                />

                <span>
                  {item.execution.average_ms.toFixed(
                    4
                  )}{" "}
                  ms
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MemoryStick
                  size={18}
                  className="text-violet-400"
                />

                <span>
                  {item.peak_memory_kb.toFixed(
                    2
                  )}{" "}
                  KB
                </span>
              </div>

              <div className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium">
                {item.runs} Runs
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}