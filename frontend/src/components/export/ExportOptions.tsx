"use client";

import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileJson,
  FileText,
  Loader2,
} from "lucide-react";

import api from "@/services/api";

interface ExportOptionsProps {
  onExportComplete: () => void;
}

type ExportFormat =
  | "csv"
  | "pdf"
  | "json"
  | "xlsx";

interface ExportResponse {
  success: boolean;
  message: string;
  file_name: string;
  format: string;
}

export default function ExportOptions({
  onExportComplete,
}: ExportOptionsProps) {
  const [format, setFormat] =
    useState<ExportFormat>("csv");

  const [dataset, setDataset] =
    useState("all");

  const [loading, setLoading] =
    useState(false);

  async function handleExport() {
    try {
      setLoading(true);

      // STEP 1
      // Generate export
      const { data } =
        await api.post<ExportResponse>(
          "/export",
          {
            format,
            dataset,
          }
        );

      // STEP 2
      // Download generated file
      const download =
        await api.get(
          `/export/download/${data.file_name}`,
          {
            responseType: "blob",
          }
        );

      const blob = new Blob([
        download.data,
      ]);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = data.file_name;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      onExportComplete();
    } catch (error) {
      console.error(error);
      alert("Export failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Export Options
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        <div>
          <label className="mb-3 block text-sm font-medium">
            Export Format
          </label>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() => setFormat("csv")}
              className={`rounded-2xl border p-5 transition ${
                format === "csv"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-cyan-500"
              }`}
            >
              <FileSpreadsheet className="mx-auto mb-3 h-8 w-8 text-green-400" />
              <p className="font-semibold">
                CSV
              </p>
            </button>

            <button
              onClick={() => setFormat("pdf")}
              className={`rounded-2xl border p-5 transition ${
                format === "pdf"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-cyan-500"
              }`}
            >
              <FileText className="mx-auto mb-3 h-8 w-8 text-red-400" />
              <p className="font-semibold">
                PDF
              </p>
            </button>

            <button
              onClick={() => setFormat("json")}
              className={`rounded-2xl border p-5 transition ${
                format === "json"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-cyan-500"
              }`}
            >
              <FileJson className="mx-auto mb-3 h-8 w-8 text-yellow-400" />
              <p className="font-semibold">
                JSON
              </p>
            </button>

            <button
              onClick={() => setFormat("xlsx")}
              className={`rounded-2xl border p-5 transition ${
                format === "xlsx"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-cyan-500"
              }`}
            >
              <FileSpreadsheet className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
              <p className="font-semibold">
                Excel
              </p>
            </button>

          </div>
        </div>

        <div>

          <label className="mb-3 block text-sm font-medium">
            Dataset
          </label>

          <select
            value={dataset}
            onChange={(e) =>
              setDataset(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-500"
          >
            <option value="all">
              All Benchmarks
            </option>

            <option value="sorting">
              Sorting
            </option>

            <option value="searching">
              Searching
            </option>

            <option value="graph">
              Graph
            </option>

            <option value="dynamic_programming">
              Dynamic Programming
            </option>

            <option value="tree">
              Tree
            </option>
          </select>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-6">

            <h3 className="mb-3 text-lg font-semibold">
              Export Summary
            </h3>

            <ul className="space-y-2 text-sm text-slate-400">

              <li>
                • Selected Format:
                <span className="ml-1 text-white">
                  {format.toUpperCase()}
                </span>
              </li>

              <li>
                • Dataset:
                <span className="ml-1 text-white">
                  {dataset.replaceAll("_", " ")}
                </span>
              </li>

              <li>
                • Execution Times
              </li>

              <li>
                • Memory Usage
              </li>

              <li>
                • Benchmark Metrics
              </li>

            </ul>

            <button
              onClick={handleExport}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-4 font-semibold hover:bg-cyan-500 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Export Report
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}