"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function Error({
  title = "Something went wrong",
  description = "An unexpected error occurred while processing your request. Please try again.",
  onRetry,
}: ErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-red-500/20 bg-slate-900/70 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle
            size={52}
            className="text-red-500"
          />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-4 text-slate-400 leading-7">
          {description}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            <RefreshCw size={18} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}