"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import LeaderboardStats from "@/components/leaderboard/LeaderboardStats";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LeaderboardEmpty from "@/components/leaderboard/LeaderboardEmpty";

import api from "@/services/api";

export interface LeaderboardEntry {
  id?: string;
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
    comparisons?: number;
    swaps?: number;
    operations?: number;
    recursion_depth?: number;
  };

  metadata: Record<string, any>;
}

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [leaderboard, setLeaderboard] = useState<
    LeaderboardEntry[]
  >([]);

  const [filtered, setFiltered] = useState<
    LeaderboardEntry[]
  >([]);

  async function loadLeaderboard() {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/benchmark/leaderboard");

      const records = data.leaderboard ?? [];

      setLeaderboard(records);
      setFiltered(records);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else {
        setError(
          err.message ?? "Unable to load leaderboard."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Leaderboard"
          description="Top performing algorithms ranked by benchmark performance."
          icon={
            <Trophy className="h-8 w-8 text-white" />
          }
        />

        {loading && <Loading />}

        {!loading && error && (
          <Error
            title="Leaderboard Error"
            description={error}
            onRetry={loadLeaderboard}
          />
        )}

        {!loading && !error && (
          <>
            <LeaderboardStats
              leaderboard={leaderboard}
            />

            <LeaderboardFilters
              leaderboard={leaderboard}
              onFiltered={setFiltered}
            />

            {filtered.length === 0 ? (
              <LeaderboardEmpty />
            ) : (
              <LeaderboardTable
                leaderboard={filtered}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}