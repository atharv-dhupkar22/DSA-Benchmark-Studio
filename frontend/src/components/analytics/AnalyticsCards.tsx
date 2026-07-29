"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Timer,
  Trophy,
} from "lucide-react";

import type { HistorySummary } from "@/types/history";

interface AnalyticsCardsProps {
  summary: HistorySummary | null;
  totalAlgorithms: number;
}

export default function AnalyticsCards({
  summary,
  totalAlgorithms,
}: AnalyticsCardsProps) {
  const cards = [
    {
      title: "Total Benchmarks",
      value: summary?.total_runs ?? 0,
      icon: Activity,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Fastest Algorithm",
      value: summary?.fastest_algorithm ?? "-",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Average Execution",
      value: `${summary?.average_execution_ms.toFixed(3) ?? "0.000"} ms`,
      icon: Timer,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Algorithms Tested",
      value: totalAlgorithms,
      icon: Cpu,
      color: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-4 text-3xl font-bold break-words">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-4 shadow-lg`}
              >
                <Icon
                  size={30}
                  className="text-white"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}