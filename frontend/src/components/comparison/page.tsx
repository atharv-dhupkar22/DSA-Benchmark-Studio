"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";
import ComparisonForm from "@/components/comparison/ComparisonForm";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import { BenchmarkAPI } from "@/services/api";
import {
  ALGORITHMS,
  ComparisonRequest,
  ComparisonResponse,
} from "@/types/benchmark";

export default function ComparisonPage() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [response, setResponse] =
    useState<ComparisonResponse | null>(null);

  async function handleCompare(
    request: ComparisonRequest
  ) {
    try {
      setLoading(true);
      setError("");

      const result =
        await BenchmarkAPI.compareAlgorithms(request);

      setResponse(result);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          err?.message ??
          "Comparison failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Algorithm Comparison"
          description="Benchmark multiple algorithms on the same dataset and compare execution time, memory usage, and algorithm statistics."
        />

        <ComparisonForm
          algorithms={ALGORITHMS}
          loading={loading}
          onSubmit={handleCompare}
        />

        {loading && <Loading />}

        {!loading && error && (
          <Error message={error} />
        )}

        {!loading && response && (
          <ComparisonTable
            ranking={response.ranking}
            summary={response.summary}
          />
        )}
      </div>
    </DashboardLayout>
  );
}