"use client";

import {
  FileSpreadsheet,
  FileText,
  Download,
  Clock,
} from "lucide-react";

interface ExportCardsProps {
  totalExports?: number;
  csvExports?: number;
  pdfExports?: number;
  lastExport?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradient,
}: StatCardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${gradient} p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-300">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function ExportCards({
  totalExports = 0,
  csvExports = 0,
  pdfExports = 0,
  lastExport = "Never",
}: ExportCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Exports"
        value={totalExports}
        subtitle="All downloaded reports"
        gradient="from-indigo-700 to-indigo-900"
        icon={
          <Download
            className="text-cyan-300"
            size={34}
          />
        }
      />

      <StatCard
        title="CSV Files"
        value={csvExports}
        subtitle="Spreadsheet exports"
        gradient="from-emerald-700 to-green-900"
        icon={
          <FileSpreadsheet
            className="text-green-300"
            size={34}
          />
        }
      />

      <StatCard
        title="PDF Reports"
        value={pdfExports}
        subtitle="Generated reports"
        gradient="from-red-700 to-rose-900"
        icon={
          <FileText
            className="text-red-300"
            size={34}
          />
        }
      />

      <StatCard
        title="Last Export"
        value={lastExport}
        subtitle="Latest generated file"
        gradient="from-purple-700 to-fuchsia-900"
        icon={
          <Clock
            className="text-yellow-300"
            size={34}
          />
        }
      />
    </div>
  );
}