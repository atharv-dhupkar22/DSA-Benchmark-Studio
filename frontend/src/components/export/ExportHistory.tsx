"use client";

import {
  Download,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileJson,
  FileArchive,
} from "lucide-react";

import type { ExportHistoryItem } from "@/app/export/page";

interface ExportHistoryProps {
  history: ExportHistoryItem[];
}

function getFileIcon(format: string) {
  switch (format.toLowerCase()) {
    case "csv":
      return (
        <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
      );

    case "pdf":
      return (
        <FileText className="h-5 w-5 text-red-400" />
      );

    case "json":
      return (
        <FileJson className="h-5 w-5 text-yellow-400" />
      );

    case "xlsx":
        return (
          <FileSpreadsheet className="h-5 w-5 text-cyan-400" />
        );

    default:
      return (
        <FileArchive className="h-5 w-5 text-slate-400" />
      );
  }
}

function getBadgeColor(format: string) {
  switch (format.toLowerCase()) {
    case "csv":
      return "bg-emerald-500/15 text-emerald-300";

    case "pdf":
      return "bg-red-500/15 text-red-300";

    case "json":
      return "bg-yellow-500/15 text-yellow-300";

    case "xlsx":
      return "bg-cyan-500/15 text-cyan-300";

    default:
      return "bg-slate-700 text-slate-300";
  }
}

export default function ExportHistory({
  history,
}: ExportHistoryProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">
          Export History
        </h2>

        <p className="mt-1 text-slate-400">
          Previously generated benchmark reports.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-950">
            <tr className="text-left">
              <th className="px-6 py-4">File</th>

              <th className="px-6 py-4">
                Format
              </th>

              <th className="px-6 py-4">
                Records
              </th>

              <th className="px-6 py-4">
                Size
              </th>

              <th className="px-6 py-4">
                Exported At
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {getFileIcon(item.format)}

                    <div>
                      <p className="font-semibold text-white">
                        {item.file_name}
                      </p>

                      <p className="text-xs text-slate-500">
                        Export ID: {item.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeColor(
                      item.format
                    )}`}
                  >
                    {item.format.toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {item.records}
                </td>

                <td className="px-6 py-5">
                  {item.size}
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    item.exported_at
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="rounded-lg bg-cyan-600 p-2 transition hover:bg-cyan-500"
                      title="Download Again"
                    >
                      <Download className="h-4 w-4 text-white" />
                    </button>

                    <button
                      className="rounded-lg bg-red-600 p-2 transition hover:bg-red-500"
                      title="Delete History"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {history.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-400"
                >
                  No export history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}