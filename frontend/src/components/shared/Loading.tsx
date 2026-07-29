"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  title?: string;
  description?: string;
  fullScreen?: boolean;
}

export default function Loading({
  title = "Loading...",
  description = "Please wait while we process your request.",
  fullScreen = false,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/30" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500">
          <Loader2 className="animate-spin text-white" size={38} />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-2 max-w-md text-slate-400">
          {description}
        </p>
      </div>

      <div className="h-2 w-72 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      {content}
    </div>
  );
}