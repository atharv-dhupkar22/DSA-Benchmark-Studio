"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Trash2,
  Download,
  RefreshCw,
  Clock,
  Cpu,
  MemoryStick,
  Activity,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import { BenchmarkAPI } from "@/services/api";

import type {
  HistoryItem,
  HistoryResponse,
  HistorySummary,
} from "@/types/history";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [summary, setSummary] =
    useState<HistorySummary | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [algorithmFilter, setAlgorithmFilter] =
    useState("All");

  const [datasetFilter, setDatasetFilter] =
    useState("All");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const response: HistoryResponse =
        await BenchmarkAPI.getHistory();

      const stats =
        await BenchmarkAPI.getHistorySummary();

      setHistory(response.history);

      setSummary(stats);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          err.message ??
          "Unable to load benchmark history."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function clearHistory() {
    if (
      !window.confirm(
        "Delete complete benchmark history?"
      )
    ) {
      return;
    }

    try {
      await BenchmarkAPI.clearHistory();

      setHistory([]);

      await loadHistory();
    } catch (err: any) {
      alert(
        err?.response?.data?.detail ??
          "Unable to clear history."
      );
    }
  }

  async function exportHistory(
    format: "csv" | "json" | "pdf"
  ) {
    try {
      const blob =
        await BenchmarkAPI.exportHistory(format);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `benchmark-history.${format}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed.");
    }
  }

  const algorithms = useMemo(() => {
    const values = new Set<string>();

    history.forEach((item) =>
      values.add(item.algorithm)
    );

    return ["All", ...Array.from(values)];
  }, [history]);

  const datasets = useMemo(() => {
    const values = new Set<string>();

    history.forEach((item) =>
      values.add(item.dataset_type)
    );

    return ["All", ...Array.from(values)];
  }, [history]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const algorithmMatch =
        algorithmFilter === "All" ||
        item.algorithm === algorithmFilter;

      const datasetMatch =
        datasetFilter === "All" ||
        item.dataset_type === datasetFilter;

      const searchMatch =
        item.algorithm
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        algorithmMatch &&
        datasetMatch &&
        searchMatch
      );
    });
  }, [
    history,
    search,
    algorithmFilter,
    datasetFilter,
  ]);

  const paginatedHistory = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredHistory.slice(
      start,
      start + pageSize
    );
  }, [filteredHistory, page]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHistory.length / pageSize)
  );

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
       <Error
  title="Failed to load history"
  description={error}
  onRetry={loadHistory}
/>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <PageHeader
          title="Benchmark History"
          description="View, search and manage previous benchmark executions."
        />

        {summary && (
          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400">
                    Total Benchmarks
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {summary.total_runs}
                  </h2>

                </div>

                <Clock className="h-10 w-10 text-cyan-400" />

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400">
                    Fastest Algorithm
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {summary.fastest_algorithm ?? "-"}
                  </h2>

                </div>

                <Cpu className="h-10 w-10 text-green-400" />

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400">
                    Avg Execution
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {summary.average_execution_ms.toFixed(3)} ms
                  </h2>

                </div>

                <Activity className="h-10 w-10 text-indigo-400" />

              </div>

            </div>

          </div>
        )}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:w-96">

              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

              <input
                type="text"
                placeholder="Search algorithm or category..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500"
              />

            </div>

            <div className="flex flex-wrap gap-3">

              <select
                value={algorithmFilter}
                onChange={(e) => {
                  setAlgorithmFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              >
                {algorithms.map((algorithm) => (
                  <option
                    key={algorithm}
                    value={algorithm}
                  >
                    {algorithm}
                  </option>
                ))}
              </select>

              <select
                value={datasetFilter}
                onChange={(e) => {
                  setDatasetFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              >
                {datasets.map((dataset) => (
                  <option
                    key={dataset}
                    value={dataset}
                  >
                    {dataset}
                  </option>
                ))}
              </select>

              <button
                onClick={loadHistory}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 transition hover:bg-slate-700"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <button
                onClick={() =>
                  exportHistory("csv")
                }
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 transition hover:bg-emerald-500"
              >
                <Download size={18} />
                CSV
              </button>

              <button
                onClick={() =>
                  exportHistory("json")
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 transition hover:bg-blue-500"
              >
                <Download size={18} />
                JSON
              </button>

              <button
                onClick={() =>
                  exportHistory("pdf")
                }
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 transition hover:bg-red-500"
              >
                <Download size={18} />
                PDF
              </button>

              <button
                onClick={clearHistory}
                className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 transition hover:bg-red-600"
              >
                <Trash2 size={18} />
                Clear
              </button>

            </div>

          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="px-6 py-4 text-left">
                  Algorithm
                </th>

                <th className="px-6 py-4 text-left">
                  Category
                </th>

                <th className="px-6 py-4 text-left">
                  Dataset
                </th>

                <th className="px-6 py-4 text-right">
                  Size
                </th>

                <th className="px-6 py-4 text-right">
                  Avg Time
                </th>

                <th className="px-6 py-4 text-right">
                  Peak Memory
                </th>

                <th className="px-6 py-4 text-right">
                  Runs
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedHistory.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="py-14 text-center text-slate-400"
                  >
                    No benchmark history found.
                  </td>

                </tr>

              ) : (                paginatedHistory.map((item, index) => (
                  <tr
                    key={
                      item.id ??
                      `${item.algorithm}-${index}`
                    }
                    className="border-t border-slate-800 transition hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-5 font-semibold text-cyan-400">
                      {item.algorithm}
                    </td>

                    <td className="px-6 py-5">
                      {item.category}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                        {item.dataset_type}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      {item.dataset_size.toLocaleString()}
                    </td>

                    <td className="px-6 py-5 text-right font-medium text-emerald-400">
                      {item.execution.average_ms.toFixed(4)} ms
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <MemoryStick
                          size={16}
                          className="text-violet-400"
                        />

                        {item.peak_memory_kb.toFixed(2)} KB
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      {item.runs}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-white">
              {paginatedHistory.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {filteredHistory.length}
            </span>{" "}
            benchmark records
          </p>

          <div className="flex items-center gap-3">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((previous) =>
                  Math.max(previous - 1, 1)
                )
              }
              className="rounded-lg border border-slate-700 px-5 py-2 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold">
              {page} / {totalPages}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((previous) =>
                  Math.min(previous + 1, totalPages)
                )
              }
              className="rounded-lg border border-slate-700 px-5 py-2 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
              </div>
    </DashboardLayout>
  );
}