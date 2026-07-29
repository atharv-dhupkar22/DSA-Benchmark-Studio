"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Cpu,
  MemoryStick,
} from "lucide-react";

import type { HistoryItem } from "@/types/history";

interface TopAlgorithmsProps {
  history: HistoryItem[];
}

export default function TopAlgorithms({
  history,
}: TopAlgorithmsProps) {
  const topAlgorithms = [...history]
    .sort(
      (a, b) =>
        a.execution.average_ms -
        b.execution.average_ms
    )
    .slice(0, 5);

  function RankIcon({
    rank,
  }: {
    rank: number;
  }) {
    switch (rank) {
      case 0:
        return (
          <Trophy
            className="text-yellow-400"
            size={26}
          />
        );

      case 1:
        return (
          <Medal
            className="text-slate-300"
            size={26}
          />
        );

      case 2:
        return (
          <Award
            className="text-amber-500"
            size={26}
          />
        );

      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 font-bold">
            {rank + 1}
          </div>
        );
    }
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
        delay: 0.3,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Top Performing Algorithms
        </h2>

        <p className="mt-2 text-slate-400">
          Ranked by average execution time.
        </p>
      </div>

      {topAlgorithms.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-slate-400">
          No benchmark data available.
        </div>
      ) : (
        <div className="space-y-4">
          {topAlgorithms.map(
            (algorithm, index) => (
              <motion.div
                key={`${algorithm.algorithm}-${index}`}
                whileHover={{
                  scale: 1.02,
                }}
                className={`flex flex-col gap-4 rounded-2xl border p-5 transition lg:flex-row lg:items-center lg:justify-between ${
                  index === 0
                    ? "border-yellow-500/40 bg-yellow-500/10"
                    : "border-slate-800 bg-slate-950"
                }`}
              >
                <div className="flex items-center gap-4">
                  <RankIcon rank={index} />

                  <div>
                    <h3 className="text-lg font-bold">
                      {algorithm.algorithm}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {algorithm.category}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Cpu
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="font-semibold">
                      {algorithm.execution.average_ms.toFixed(
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

                    <span className="font-semibold">
                      {algorithm.peak_memory_kb.toFixed(
                        2
                      )}{" "}
                      KB
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}