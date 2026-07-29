"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";

import ExportCards from "@/components/export/ExportCards";
import ExportOptions from "@/components/export/ExportOptions";
import ExportHistory from "@/components/export/ExportHistory";
import ExportEmpty from "@/components/export/ExportEmpty";

import api from "@/services/api";

export interface ExportHistoryItem {
  id: string;
  file_name: string;
  format: string;
  exported_at: string;
  records: number;
  size: string;
}

export default function ExportPage() {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [history, setHistory] = useState<
    ExportHistoryItem[]
  >([]);

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/export/history");

      setHistory(data.history ?? []);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Unable to load export history.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Export Center"
          description="Export benchmark reports, analytics and datasets."
          icon={
            <Download className="h-8 w-8 text-white" />
          }
        />

        {loading && <Loading />}

        {!loading && error && (
          <Error
            title="Export Error"
            description={error}
            onRetry={loadHistory}
          />
        )}

        {!loading && !error && (
          <>
            <ExportCards />

            <ExportOptions
              onExportComplete={loadHistory}
            />

            {history.length === 0 ? (
              <ExportEmpty />
            ) : (
              <ExportHistory
                history={history}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}