"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { ComparisonRequest } from "@/types/benchmark";

interface ComparisonFormProps {
  algorithms: string[];
  loading: boolean;
  onSubmit: (request: ComparisonRequest) => void;
}

export default function ComparisonForm({
  algorithms,
  loading,
  onSubmit,
}: ComparisonFormProps) {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([
    "quick_sort",
    "merge_sort",
  ]);

  const [datasetType, setDatasetType] =
    useState<ComparisonRequest["dataset_type"]>("random");

  const [datasetSize, setDatasetSize] = useState(10000);

  const [runs, setRuns] = useState(5);

  const [randomMin, setRandomMin] = useState(0);

  const [randomMax, setRandomMax] = useState(100000);

  function toggleAlgorithm(name: string) {
    setSelectedAlgorithms((previous) =>
      previous.includes(name)
        ? previous.filter((algorithm) => algorithm !== name)
        : [...previous, name]
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (selectedAlgorithms.length < 2) {
      alert("Please select at least two algorithms.");
      return;
    }

    onSubmit({
      algorithms: selectedAlgorithms,
      dataset_type: datasetType,
      dataset_size: datasetSize,
      runs,
      random_min: randomMin,
      random_max: randomMax,
      custom_dataset: null,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
    >
      <div>
        <h2 className="text-2xl font-bold">
          Compare Algorithms
        </h2>

        <p className="mt-2 text-slate-400">
          Select multiple algorithms and benchmark them on
          the same dataset.
        </p>
      </div>

      <div>
        <label className="mb-3 block font-medium">
          Algorithms
        </label>

        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {algorithms.map((algorithm) => (
            <button
              key={algorithm}
              type="button"
              onClick={() =>
                toggleAlgorithm(algorithm)
              }
              className={`rounded-xl border px-4 py-3 transition-all ${
                selectedAlgorithms.includes(algorithm)
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-slate-700 bg-slate-950 hover:border-indigo-500"
              }`}
            >
              {algorithm}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block">
            Dataset Type
          </label>

          <select
            value={datasetType}
            onChange={(e) =>
              setDatasetType(
                e.target
                  .value as ComparisonRequest["dataset_type"]
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="random">Random</option>
            <option value="sorted">Sorted</option>
            <option value="reverse_sorted">
              Reverse Sorted
            </option>
            <option value="nearly_sorted">
              Nearly Sorted
            </option>
            <option value="few_unique">
              Few Unique
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Dataset Size
          </label>

          <input
            type="number"
            min={1}
            value={datasetSize}
            onChange={(e) =>
              setDatasetSize(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Benchmark Runs
          </label>

          <input
            type="number"
            min={1}
            value={runs}
            onChange={(e) =>
              setRuns(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Random Minimum
          </label>

          <input
            type="number"
            value={randomMin}
            onChange={(e) =>
              setRandomMin(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Random Maximum
          </label>

          <input
            type="number"
            value={randomMax}
            onChange={(e) =>
              setRandomMax(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Play size={20} />

        {loading
          ? "Running Comparison..."
          : "Run Comparison"}
      </button>
    </form>
  );
}