"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import ComparisonForm from "@/components/comparison/ComparisonForm";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import { BenchmarkAPI } from "@/services/api";

import type {
  ComparisonRequest,
  ComparisonResponse,
} from "@/types/benchmark";

const ALGORITHMS = [
  "bubble_sort",
  "selection_sort",
  "insertion_sort",
  "merge_sort",
  "quick_sort",
  "heap_sort",
  "shell_sort",
  "counting_sort",
  "radix_sort",
];

export default function ComparisonPage() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [results, setResults] =
    useState<ComparisonResponse | null>(null);

  async function runComparison(
    payload: ComparisonRequest
  ) {
    try {
      setLoading(true);
      setError("");

      const response =
        await BenchmarkAPI.compareAlgorithms(
          payload
        );

      setResults(response);
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(
          detail
            .map((item: any) => item.msg)
            .join(", ")
        );
      } else {
        setError(
          err.message ??
            "Comparison failed."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Algorithm Comparison"
          description="Compare multiple algorithms and analyze their performance."
          icon={
            <GitCompare className="h-8 w-8 text-white" />
          }
        />

        <ComparisonForm
          algorithms={ALGORITHMS}
          loading={loading}
          onSubmit={runComparison}
        />

        {loading && <Loading />}

        {!loading && error && (
          <Error
            title="Comparison Error"
            description={error}
            onRetry={() => setError("")}
          />
        )}

        {!loading &&
          !error &&
          results && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="mb-6 text-2xl font-bold">
                Comparison Results
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="p-4 text-left">
                        Algorithm
                      </th>
                      <th className="p-4 text-left">
                        Avg Time (ms)
                      </th>
                      <th className="p-4 text-left">
                        Memory (KB)
                      </th>
                      <th className="p-4 text-left">
                        Comparisons
                      </th>
                      <th className="p-4 text-left">
                        Swaps
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.ranking.map(
                      (algorithm) => (
                        <tr
                          key={
                            algorithm.algorithm
                          }
                          className="border-b border-slate-800"
                        >
                          <td className="p-4 capitalize">
                            {algorithm.algorithm.replaceAll(
                              "_",
                              " "
                            )}
                          </td>

                          <td className="p-4">
                            {algorithm.average_execution_time_ms.toFixed(
                              4
                            )}
                          </td>

                          <td className="p-4">
                            {algorithm.peak_memory_kb.toFixed(
                              2
                            )}
                          </td>

                          <td className="p-4">
                            {
                              algorithm.comparisons
                            }
                          </td>

                          <td className="p-4">
                            {algorithm.swaps}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}