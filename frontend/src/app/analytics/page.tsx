"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import AnalyticsCards from "@/components/analytics/AnalyticsCards";
import ExecutionChart from "@/components/analytics/ExecutionChart";
import MemoryChart from "@/components/analytics/MemoryChart";
import UsageChart from "@/components/analytics/UsageChart";
import TopAlgorithms from "@/components/analytics/TopAlgorithms";
import RecentActivity from "@/components/analytics/RecentActivity";

import { BenchmarkAPI } from "@/services/api";

import type {
  HistoryItem,
  HistorySummary,
  HistoryResponse,
} from "@/types/history";

export default function AnalyticsPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [summary, setSummary] =
    useState<HistorySummary | null>(null);

  const [usage, setUsage] = useState<
    Record<string, number>
  >({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const [
        historyResponse,
        summaryResponse,
        usageResponse,
      ] = await Promise.all([
        BenchmarkAPI.getHistory(),
        BenchmarkAPI.getHistorySummary(),
        BenchmarkAPI.getAlgorithmUsage(),
      ]);

      const historyData =
        historyResponse as HistoryResponse;

      setHistory(historyData.history);

      setSummary(summaryResponse);

      setUsage(usageResponse);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          err.message ??
          "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  const totalAlgorithms = useMemo(() => {
    return new Set(
      history.map((item) => item.algorithm)
    ).size;
  }, [history]);

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
          title="Analytics Error"
          description={error}
          onRetry={loadAnalytics}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <PageHeader
          title="Analytics Dashboard"
          description="Comprehensive visualization of benchmark performance and algorithm statistics."
        />

        <AnalyticsCards
          summary={summary}
          totalAlgorithms={totalAlgorithms}
        />

        <div className="grid gap-8 xl:grid-cols-2">

          <ExecutionChart
            history={history}
          />

          <MemoryChart
            history={history}
          />

        </div>
                <div className="grid gap-8 xl:grid-cols-3">

          <div className="xl:col-span-1">
            <UsageChart
              usage={usage}
            />
          </div>

          <div className="xl:col-span-2">
            <TopAlgorithms
              history={history}
            />
          </div>

        </div>

        <RecentActivity
          history={history}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Total Records
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {history.length}
            </h2>

            <p className="mt-3 text-sm text-emerald-400">
              Benchmark executions stored
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Unique Algorithms
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {totalAlgorithms}
            </h2>

            <p className="mt-3 text-sm text-cyan-400">
              Algorithms benchmarked
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Average Memory
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {history.length > 0
                ? (
                    history.reduce(
                      (sum, item) =>
                        sum +
                        item.peak_memory_kb,
                      0
                    ) / history.length
                  ).toFixed(2)
                : "0.00"}{" "}
              KB
            </h2>

            <p className="mt-3 text-sm text-violet-400">
              Peak memory usage
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Fastest Execution
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {history.length > 0
                ? Math.min(
                    ...history.map(
                      (item) =>
                        item.execution
                          .average_ms
                    )
                  ).toFixed(4)
                : "0.0000"}{" "}
              ms
            </h2>

            <p className="mt-3 text-sm text-yellow-400">
              Best benchmark result
            </p>

          </div>

        </div>
                <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h3 className="text-xl font-semibold">
              Analytics Overview
            </h3>

            <p className="mt-2 text-slate-400">
              All statistics are generated from your benchmark history.
              Refresh the dashboard to fetch the latest benchmark results.
            </p>
          </div>

          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Dashboard"}
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}