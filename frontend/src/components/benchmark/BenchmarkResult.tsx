"use client";

import {
  BarChart3,
  Clock3,
 Database,
  Layers3,
  Activity,
  Cpu,
  CheckCircle2,
} from "lucide-react";

export interface BenchmarkResultData {
  algorithm: string;
  category: string;
  dataset_type: string;
  dataset_size: number;
  runs: number;

  execution: {
    average_ms: number;
    median_ms: number;
    minimum_ms: number;
    maximum_ms: number;
    standard_deviation_ms: number;
  };

  peak_memory_kb: number;

  algorithm_metrics: {
    time_complexity: string;
    space_complexity: string;
    stable: boolean;
    in_place: boolean;
  };

  metadata: Record<string, unknown>;
}

interface Props {
  result: BenchmarkResultData | null;
}

export default function BenchmarkResult({
  result,
}: Props) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-14 text-center">
        <BarChart3
          size={70}
          className="mx-auto mb-6 text-indigo-500"
        />

        <h2 className="text-3xl font-bold">
          No Benchmark Result
        </h2>

        <p className="mt-4 text-slate-400">
          Execute a benchmark to view performance statistics.
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Average Time",
      value: `${result.execution.average_ms.toFixed(4)} ms`,
      icon: Clock3,
    },
    {
      title: "Median Time",
      value: `${result.execution.median_ms.toFixed(4)} ms`,
      icon: Activity,
    },
    {
      title: "Peak Memory",
      value: `${result.peak_memory_kb.toFixed(2)} KB`,
      icon: Database,
    },
    {
      title: "Runs",
      value: result.runs,
      icon: Layers3,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500">
                <Icon size={26} />
              </div>

              <p className="mt-6 text-sm text-slate-400">
                {item.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Benchmark Details
          </h2>

          <InfoRow
            title="Algorithm"
            value={result.algorithm}
          />

          <InfoRow
            title="Category"
            value={result.category}
          />

          <InfoRow
            title="Dataset Type"
            value={result.dataset_type}
          />

          <InfoRow
            title="Dataset Size"
            value={result.dataset_size}
          />

          <InfoRow
            title="Runs"
            value={result.runs}
          />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="mb-6 text-2xl font-bold">
            Execution Statistics
          </h2>

          <InfoRow
            title="Average"
            value={`${result.execution.average_ms.toFixed(4)} ms`}
          />

          <InfoRow
            title="Median"
            value={`${result.execution.median_ms.toFixed(4)} ms`}
          />

          <InfoRow
            title="Minimum"
            value={`${result.execution.minimum_ms.toFixed(4)} ms`}
          />

          <InfoRow
            title="Maximum"
            value={`${result.execution.maximum_ms.toFixed(4)} ms`}
          />

          <InfoRow
            title="Std Deviation"
            value={`${result.execution.standard_deviation_ms.toFixed(4)} ms`}
          />

          <InfoRow
            title="Peak Memory"
            value={`${result.peak_memory_kb.toFixed(2)} KB`}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="mb-8 flex items-center gap-3">
          <Cpu
            className="text-indigo-400"
            size={28}
          />

          <h2 className="text-2xl font-bold">
            Algorithm Properties
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Metric
            title="Time Complexity"
            value={result.algorithm_metrics.time_complexity}
          />

          <Metric
            title="Space Complexity"
            value={result.algorithm_metrics.space_complexity}
          />

          <Metric
            title="Stable"
            value={
              result.algorithm_metrics.stable ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                "No"
              )
            }
          />

          <Metric
            title="In Place"
            value={
              result.algorithm_metrics.in_place ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                "No"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-5 py-4">
      <span className="text-slate-400">
        {title}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <div className="mt-4 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}