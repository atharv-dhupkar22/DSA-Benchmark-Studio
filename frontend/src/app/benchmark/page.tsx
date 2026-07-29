"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import BenchmarkForm from "@/components/benchmark/BenchmarkForm";
import BenchmarkResultCards from "@/components/benchmark/BenchmarkResultCards";
import ExecutionChart from "@/components/benchmark/ExecutionChart";

import { BenchmarkAPI } from "@/services/api";

import type {
  BenchmarkRequest,
  BenchmarkResponse,
} from "@/types/benchmark";

export default function BenchmarkPage() {
  const [result, setResult] =
    useState<BenchmarkResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function runBenchmark(
  payload: BenchmarkRequest
) {
  console.log("1. Button clicked");

  try {
    setLoading(true);
    console.log("2. Loading started");

    setError("");

    console.log("3. Calling API");

    const response =
      await BenchmarkAPI.runBenchmark(payload);

    console.log("4. API Response:", response);

    setResult(response);

    console.log("5. Result stored");
  } catch (err: any) {
    console.error("6. Error:", err);

    setError(
      err?.response?.data?.detail ??
      err.message ??
      "Benchmark failed."
    );
  } finally {
    console.log("7. Loading finished");
    setLoading(false);
  }
}

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Benchmark"
          description="Run real-time algorithm benchmarks and analyze execution performance."
          icon={
            <Activity
              className="h-8 w-8 text-white"
            />
          }
        />

        <BenchmarkForm
          loading={loading}
          onSubmit={runBenchmark}
        />

        {loading && (
          <Loading />
        )}

        {!loading && error && (
          <Error
            title="Benchmark Error"
            description={error}
            onRetry={() => setError("")}
          />
        )}

        {!loading && !error && (
          <>
            <BenchmarkResultCards
              result={result}
            />

            <ExecutionChart
              result={result}
            />
                        {result && (
              <>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h2 className="mb-6 text-2xl font-bold">
                      Performance Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Algorithm
                        </span>

                        <span className="font-semibold capitalize">
                          {result.algorithm.replaceAll(
                            "_",
                            " "
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Category
                        </span>

                        <span className="font-semibold">
                          {result.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Dataset
                        </span>

                        <span className="font-semibold capitalize">
                          {result.dataset_type.replaceAll(
                            "_",
                            " "
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Dataset Size
                        </span>

                        <span className="font-semibold">
                          {result.dataset_size.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Runs
                        </span>

                        <span className="font-semibold">
                          {result.runs}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4">
                        <span className="text-slate-400">
                          Standard Deviation
                        </span>

                        <span className="font-semibold">
                          {result.execution.standard_deviation_ms.toFixed(
                            4
                          )}{" "}
                          ms
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h2 className="mb-6 text-2xl font-bold">
                      Complexity Analysis
                    </h2>

                    <div className="space-y-4">
                      <div className="rounded-xl bg-slate-950 p-5">
                        <p className="text-sm text-slate-400">
                          Time Complexity
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {result.metadata?.time_complexity ??
                            "N/A"}
                        </h3>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-5">
                        <p className="text-sm text-slate-400">
                          Space Complexity
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {result.metadata?.space_complexity ??
                            "N/A"}
                        </h3>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-5">
                        <p className="text-sm text-slate-400">
                          Stability
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {result.metadata?.stable ??
                          result.metadata?.is_stable
                            ? "Stable"
                            : "Not Stable"}
                        </h3>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-5">
                        <p className="text-sm text-slate-400">
                          In Place
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {result.metadata?.in_place
                            ? "Yes"
                            : "No"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}