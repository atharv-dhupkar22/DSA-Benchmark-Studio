"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-8 shadow-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          {icon && (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-lg">
              {icon}
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
              <span>Dashboard</span>
              <ChevronRight size={16} />
              <span className="text-indigo-400">{title}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              {title}
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
              {description}
            </p>
          </div>
        </div>

        {action && (
          <div className="flex items-center gap-3">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}