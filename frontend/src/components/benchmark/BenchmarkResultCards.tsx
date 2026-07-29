"use client";

import {
  Clock3,
  MemoryStick,
  ArrowRightLeft,
  Repeat,
  Cpu,
  GitBranch,
  Timer,
  Database,
} from "lucide-react";

import type { BenchmarkResponse } from "@/types/benchmark";

interface BenchmarkResultCardsProps {
  result: BenchmarkResponse | null;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function MetricCard({
  title,
  value,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-cyan-500">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">
          {title}
        </h3>

        <div className="text-cyan-400">
          {icon}
        </div>
      </div>

      <p className="text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default function BenchmarkResultCards({
  result,
}: BenchmarkResultCardsProps) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
        <h2 className="text-xl font-semibold text-white">
          No Benchmark Results
        </h2>

        <p className="mt-3 text-slate-400">
          Run a benchmark to see execution metrics.
        </p>
      </div>
    );
  }

  const metrics = result.algorithm_metrics ?? {};
  const metadata = result.metadata ?? {};

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Average Execution"
        value={`${result.execution.average_ms.toFixed(4)} ms`}
        icon={<Clock3 size={24} />}
      />

      <MetricCard
        title="Peak Memory"
        value={`${result.peak_memory_kb.toFixed(2)} KB`}
        icon={<MemoryStick size={24} />}
      />

      <MetricCard
        title="Comparisons"
        value={metrics.comparisons ?? "-"}
        icon={<ArrowRightLeft size={24} />}
      />

      <MetricCard
        title="Swaps"
        value={metrics.swaps ?? "-"}
        icon={<Repeat size={24} />}
      />

      <MetricCard
        title="Operations"
        value={metrics.operations ?? "-"}
        icon={<Cpu size={24} />}
      />

      <MetricCard
        title="Recursion Depth"
        value={metrics.recursion_depth ?? "-"}
        icon={<GitBranch size={24} />}
      />

      <MetricCard
        title="Time Complexity"
        value={metadata.time_complexity ?? "-"}
        icon={<Timer size={24} />}
      />

      <MetricCard
        title="Space Complexity"
        value={metadata.space_complexity ?? "-"}
        icon={<Database size={24} />}
      />
    </div>
  );
}