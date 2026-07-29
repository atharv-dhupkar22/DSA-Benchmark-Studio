"use client";

import { Bell, Search, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-2xl font-bold text-white">
          DSA Benchmark Studio
        </h1>

        <p className="text-sm text-slate-400">
          Benchmark • Compare • Analyze Algorithms
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            placeholder="Search..."
            className="w-80 rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-indigo-500">
          <Bell size={20} />
        </button>

        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-indigo-500">
          <Settings size={20} />
        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 transition hover:border-indigo-500">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
            <User size={18} />
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-white">
              Developer
            </p>

            <p className="text-xs text-slate-400">
              DSA Benchmark
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}