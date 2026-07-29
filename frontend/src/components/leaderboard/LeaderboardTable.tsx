"use client";

import {
  Trophy,
  Medal,
  Award,
  Clock,
  MemoryStick,
  BarChart3,
  Layers,
  GitBranch,
} from "lucide-react";

import type { LeaderboardEntry } from "@/app/leaderboard/page";

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-400" />;
    case 2:
      return <Medal className="h-5 w-5 text-slate-300" />;
    case 3:
      return <Award className="h-5 w-5 text-orange-400" />;
    default:
      return (
        <span className="font-semibold text-slate-400">
          #{rank}
        </span>
      );
  }
}

function getRankRowStyle(rank: number) {
  switch (rank) {
    case 1:
      return "bg-yellow-500/10 border-yellow-500/30";
    case 2:
      return "bg-slate-500/10 border-slate-500/30";
    case 3:
      return "bg-orange-500/10 border-orange-500/30";
    default:
      return "hover:bg-slate-800/40";
  }
}

export default function LeaderboardTable({
  leaderboard,
}: LeaderboardTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-700 bg-slate-950">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-semibold">
                Rank
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Algorithm
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Avg Time
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Memory
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Comparisons
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Swaps
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Operations
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Recursion
              </th>

              <th className="px-6 py-4 text-sm font-semibold">
                Runs
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((item, index) => {
              const rank = index + 1;

              return (
                <tr
                  key={`${item.algorithm}-${index}`}
                  className={`border-b border-slate-800 transition-all duration-300 ${getRankRowStyle(
                    rank
                  )}`}
                >
                  <td className="px-6 py-5">
                    {getRankIcon(rank)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">
                      {item.algorithm.replaceAll("_", " ")}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {item.dataset_type.replaceAll(
                        "_",
                        " "
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock
                        size={16}
                        className="text-cyan-400"
                      />

                      <span className="font-semibold">
                        {item.execution.average_ms.toFixed(4)}
                        {" ms"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <MemoryStick
                        size={16}
                        className="text-green-400"
                      />

                      {item.peak_memory_kb.toFixed(2)} KB
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <BarChart3
                        size={16}
                        className="text-purple-400"
                      />

                      {item.algorithm_metrics
                        ?.comparisons ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {item.algorithm_metrics
                      ?.swaps ?? "-"}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Layers
                        size={16}
                        className="text-orange-400"
                      />

                      {item.algorithm_metrics
                        ?.operations ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <GitBranch
                        size={16}
                        className="text-pink-400"
                      />

                      {item.algorithm_metrics
                        ?.recursion_depth ?? "-"}
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {item.runs}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}