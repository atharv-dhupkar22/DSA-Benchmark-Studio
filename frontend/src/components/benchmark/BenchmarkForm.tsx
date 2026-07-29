"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

import {
  ALGORITHMS,
  DATASET_TYPES,
  BenchmarkRequest,
} from "@/types/benchmark";

interface BenchmarkFormProps {
  loading: boolean;
  onSubmit: (request: BenchmarkRequest) => void;
}

export default function BenchmarkForm({
  loading,
  onSubmit,
}: BenchmarkFormProps) {
  const [form, setForm] = useState<BenchmarkRequest>({
    algorithm: "quick_sort",
    dataset_type: "random",
    dataset_size: 1000,
    runs: 3,
    random_min: -1000,
    random_max: 1000,
    custom_dataset: undefined,
  });

  function update<K extends keyof BenchmarkRequest>(
    key: K,
    value: BenchmarkRequest[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload: BenchmarkRequest = {
      ...form,
    };

    if (payload.dataset_type !== "custom") {
      delete payload.custom_dataset;
    }

    onSubmit(payload);
  }

  function reset() {
    setForm({
      algorithm: "quick_sort",
      dataset_type: "random",
      dataset_size: 1000,
      runs: 3,
      random_min: -1000,
      random_max: 1000,
      custom_dataset: undefined,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Run Benchmark
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Algorithm
          </label>

          <select
            value={form.algorithm}
            onChange={(e) =>
              update("algorithm", e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          >
            {ALGORITHMS.map((algorithm) => (
              <option
                key={algorithm}
                value={algorithm}
              >
                {algorithm.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Dataset Type
          </label>

          <select
            value={form.dataset_type}
            onChange={(e) =>
              update(
                "dataset_type",
                e.target.value as BenchmarkRequest["dataset_type"]
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          >
            {DATASET_TYPES.map((dataset) => (
              <option
                key={dataset}
                value={dataset}
              >
                {dataset.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Dataset Size
          </label>

          <input
            type="number"
            min={1}
            value={form.dataset_size}
            onChange={(e) =>
              update(
                "dataset_size",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Runs
          </label>

          <input
            type="number"
            min={1}
            value={form.runs}
            onChange={(e) =>
              update("runs", Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Random Min
          </label>

          <input
            type="number"
            value={form.random_min}
            onChange={(e) =>
              update(
                "random_min",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Random Max
          </label>

          <input
            type="number"
            value={form.random_max}
            onChange={(e) =>
              update(
                "random_max",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play size={18} />
          {loading ? "Running..." : "Run Benchmark"}
        </button>

        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </form>
  );
}