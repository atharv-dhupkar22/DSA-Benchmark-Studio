"use client";

import { Trophy, Medal, Award, Cpu, MemoryStick } from "lucide-react";

export interface ComparisonEntry {
  algorithm: string;
  category: string;
  average_execution_time_ms: number;
  peak_memory_kb: number;
  comparisons: number;
  swaps: number;
  operations: number;
  recursion_depth: number;
  metadata: Record<string, unknown>;
}

export interface ComparisonSummary {
  fastest_algorithm: string;
  slowest_algorithm: string;
  least_memory_algorithm: string;
  total_algorithms: number;
  dataset_size: number;
  benchmark_runs: number;
}

interface ComparisonTableProps {
  ranking: ComparisonEntry[];
  summary: ComparisonSummary | null;
}

function getRankIcon(index: number) {
  switch (index) {
    case 0:
      return <Trophy className="h-5 w-5 text-yellow-400" />;
    case 1:
      return <Medal className="h-5 w-5 text-slate-300" />;
    case 2:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return (
        <span className="font-semibold text-slate-400">
          #{index + 1}
        </span>
      );
  }
}

export default function ComparisonTable({
  ranking,
  summary,
}: ComparisonTableProps) {
  if (!ranking.length) return null;

  return (
    <div className="space-y-8">
      {summary && (
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-600/30 bg-emerald-500/10 p-6">
            <p className="text-sm text-slate-400">
              Fastest Algorithm
            </p>

            <h2 className="mt-3 text-2xl font-bold text-emerald-400">
              {summary.fastest_algorithm}
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-600/30 bg-blue-500/10 p-6">
            <p className="text-sm text-slate-400">
              Least Memory
            </p>

            <h2 className="mt-3 text-2xl font-bold text-blue-400">
              {summary.least_memory_algorithm}
            </h2>
          </div>

          <div className="rounded-2xl border border-red-600/30 bg-red-500/10 p-6">
            <p className="text-sm text-slate-400">
              Slowest Algorithm
            </p>

            <h2 className="mt-3 text-2xl font-bold text-red-400">
              {summary.slowest_algorithm}
            </h2>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Algorithm</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">
                Avg Time (ms)
              </th>
              <th className="px-6 py-4 text-left">
                Memory (KB)
              </th>
              <th className="px-6 py-4 text-left">
                Comparisons
              </th>
              <th className="px-6 py-4 text-left">Swaps</th>
              <th className="px-6 py-4 text-left">
                Operations
              </th>
              <th className="px-6 py-4 text-left">
                Recursion
              </th>
            </tr>
          </thead>

          <tbody>
            {ranking.map((item, index) => (
              <tr
                key={item.algorithm}
                className={`border-t border-slate-800 ${
                  index === 0
                    ? "bg-emerald-500/10"
                    : "hover:bg-slate-800/40"
                }`}
              >
                <td className="px-6 py-5">
                  {getRankIcon(index)}
                </td>

                <td className="px-6 py-5 font-semibold">
                  {item.algorithm}
                </td>

                <td className="px-6 py-5">
                  {item.category}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    {item.average_execution_time_ms.toFixed(3)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-violet-400" />
                    {item.peak_memory_kb.toFixed(2)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {item.comparisons.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {item.swaps.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {item.operations.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {item.recursion_depth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {summary && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-5 text-xl font-bold">
            Benchmark Summary
          </h3>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-slate-400">Algorithms</p>
              <p className="text-2xl font-bold">
                {summary.total_algorithms}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Dataset Size</p>
              <p className="text-2xl font-bold">
                {summary.dataset_size.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Runs</p>
              <p className="text-2xl font-bold">
                {summary.benchmark_runs}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}