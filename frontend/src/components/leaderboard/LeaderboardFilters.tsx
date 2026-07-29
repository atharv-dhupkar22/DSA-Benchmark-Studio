"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RotateCcw,
} from "lucide-react";

import type { LeaderboardEntry } from "@/app/leaderboard/page";

interface LeaderboardFiltersProps {
  leaderboard: LeaderboardEntry[];
  onFiltered: (
    data: LeaderboardEntry[]
  ) => void;
}

const DATASET_TYPES = [
  "All",
  "random",
  "sorted",
  "reverse_sorted",
  "nearly_sorted",
  "few_unique",
  "custom",
];

export default function LeaderboardFilters({
  leaderboard,
  onFiltered,
}: LeaderboardFiltersProps) {
  const [search, setSearch] = useState("");

  const [dataset, setDataset] =
    useState("All");

  useEffect(() => {
    let filtered = [...leaderboard];

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.algorithm
          .replaceAll("_", " ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (dataset !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.dataset_type === dataset
      );
    }

    filtered.sort(
      (a, b) =>
        a.execution.average_ms -
        b.execution.average_ms
    );

    onFiltered(filtered);
  }, [
    search,
    dataset,
    leaderboard,
    onFiltered,
  ]);

  function resetFilters() {
    setSearch("");
    setDataset("All");
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <Filter
          size={22}
          className="text-cyan-400"
        />

        <h2 className="text-2xl font-bold">
          Filters
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Search */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Search Algorithm
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Quick Sort..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Dataset */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Dataset Type
          </label>

          <select
            value={dataset}
            onChange={(e) =>
              setDataset(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500"
          >
            {DATASET_TYPES.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}

        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 transition hover:border-cyan-500 hover:bg-slate-800"
          >
            <RotateCcw size={18} />

            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}