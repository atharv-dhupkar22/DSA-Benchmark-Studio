"use client";

import { Trophy } from "lucide-react";

export default function LeaderboardEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-24 text-center">
      <div className="rounded-full bg-slate-800 p-6">
        <Trophy
          className="h-14 w-14 text-slate-500"
        />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-white">
        No Leaderboard Data
      </h2>

      <p className="mt-3 max-w-lg text-slate-400">
        No benchmark results match your current filters.
        Try changing the search or dataset filter, or run
        additional benchmarks to populate the leaderboard.
      </p>
    </div>
  );
}