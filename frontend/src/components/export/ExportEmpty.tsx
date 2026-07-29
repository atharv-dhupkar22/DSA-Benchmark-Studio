"use client";

import { DownloadCloud } from "lucide-react";

export default function ExportEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="rounded-full bg-slate-800 p-6">
          <DownloadCloud className="h-14 w-14 text-slate-500" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          No Export History
        </h2>

        <p className="mt-3 text-slate-400">
          You haven't exported any benchmark reports yet.
          Generate a CSV, PDF, JSON, or Excel report to see
          your export history here.
        </p>
      </div>
    </div>
  );
}