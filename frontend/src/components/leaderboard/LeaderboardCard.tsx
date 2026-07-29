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

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  rank: number;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-7 w-7 text-yellow-400" />;
    case 2:
      return <Medal className="h-7 w-7 text-slate-300" />;
    case 3:
      return <Award className="h-7 w-7 text-orange-400" />;
    default:
      return (
        <span className="text-lg font-bold text-slate-300">
          #{rank}
        </span>
      );
  }
}

function getBorder(rank: number) {
  switch (rank) {
    case 1:
      return "border-yellow-500/40";
    case 2:
      return "border-slate-500/40";
    case 3:
      return "border-orange-500/40";
    default:
      return "border-slate-800";
  }
}

export default function LeaderboardCard({
  entry,
  rank,
}: LeaderboardCardProps) {
  return (
    <div
      className={`rounded-3xl border ${getBorder(
        rank
      )} bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <div>{getRankIcon(rank)}</div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {entry.category}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-white">
          {entry.algorithm.replaceAll("_", " ")}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Dataset:{" "}
          {entry.dataset_type.replaceAll("_", " ")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Clock size={18} />
            <span className="text-xs uppercase">
              Avg Time
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.execution.average_ms.toFixed(4)} ms
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-green-400">
            <MemoryStick size={18} />
            <span className="text-xs uppercase">
              Memory
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.peak_memory_kb.toFixed(2)} KB
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-purple-400">
            <BarChart3 size={18} />
            <span className="text-xs uppercase">
              Comparisons
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.algorithm_metrics?.comparisons ?? "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-orange-400">
            <Layers size={18} />
            <span className="text-xs uppercase">
              Operations
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.algorithm_metrics?.operations ?? "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-pink-400">
            <GitBranch size={18} />
            <span className="text-xs uppercase">
              Recursion
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.algorithm_metrics?.recursion_depth ?? "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy size={18} />
            <span className="text-xs uppercase">
              Runs
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold">
            {entry.runs}
          </p>
        </div>
      </div>
    </div>
  );
}