"use client";

import {
  Trophy,
  Zap,
  Cpu,
  Timer,
} from "lucide-react";

import type { LeaderboardEntry } from "@/app/leaderboard/page";

interface LeaderboardStatsProps {
  leaderboard: LeaderboardEntry[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
}: StatCardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${gradient} p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-300">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-300">
              {subtitle}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardStats({
  leaderboard,
}: LeaderboardStatsProps) {
  const totalBenchmarks = leaderboard.length;

  const fastest =
    leaderboard.length > 0
      ? leaderboard.reduce((best, current) =>
          current.execution.average_ms <
          best.execution.average_ms
            ? current
            : best
        )
      : null;

  const lowestMemory =
    leaderboard.length > 0
      ? leaderboard.reduce((best, current) =>
          current.peak_memory_kb <
          best.peak_memory_kb
            ? current
            : best
        )
      : null;

  const averageExecution =
    leaderboard.length > 0
      ? leaderboard.reduce(
          (sum, item) =>
            sum + item.execution.average_ms,
          0
        ) / leaderboard.length
      : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Benchmarks"
        value={totalBenchmarks}
        subtitle="Algorithms ranked"
        gradient="from-indigo-700 to-indigo-900"
        icon={
          <Trophy
            className="text-yellow-300"
            size={34}
          />
        }
      />

      <StatCard
        title="Fastest"
        value={
          fastest
            ? fastest.algorithm.replaceAll("_", " ")
            : "-"
        }
        subtitle={
          fastest
            ? `${fastest.execution.average_ms.toFixed(
                4
              )} ms`
            : "No benchmark"
        }
        gradient="from-cyan-700 to-sky-900"
        icon={
          <Zap
            className="text-yellow-300"
            size={34}
          />
        }
      />

      <StatCard
        title="Lowest Memory"
        value={
          lowestMemory
            ? lowestMemory.algorithm.replaceAll(
                "_",
                " "
              )
            : "-"
        }
        subtitle={
          lowestMemory
            ? `${lowestMemory.peak_memory_kb.toFixed(
                2
              )} KB`
            : "No benchmark"
        }
        gradient="from-emerald-700 to-green-900"
        icon={
          <Cpu
            className="text-green-300"
            size={34}
          />
        }
      />

      <StatCard
        title="Average Time"
        value={`${averageExecution.toFixed(4)} ms`}
        subtitle="Across all benchmarks"
        gradient="from-purple-700 to-fuchsia-900"
        icon={
          <Timer
            className="text-pink-300"
            size={34}
          />
        }
      />
    </div>
  );
}