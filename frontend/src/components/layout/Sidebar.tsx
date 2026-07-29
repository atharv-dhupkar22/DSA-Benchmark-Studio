"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  GitCompare,
  History,
  Trophy,
  Activity,
  Download,
  Home,
  Cpu,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Benchmark",
    href: "/benchmark",
    icon: Cpu,
  },
  {
    title: "Comparison",
    href: "/comparison",
    icon: GitCompare,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: Activity,
  },
  {
    title: "Export",
    href: "/export",
    icon: Download,
  },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl">

            <div className="border-b border-slate-800 p-8">

                <div className="flex items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500">

                        <BarChart3 size={28} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold">
                            DSA Benchmark
                        </h1>

                        <p className="text-sm text-slate-400">
                            Studio
                        </p>

                    </div>

                </div>

            </div>

            <nav className="flex-1 space-y-2 p-5">

                {navigation.map((item) => {

                    const Icon = item.icon;

                    const active = pathname === item.href;

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
                                active
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                            }`}
                        >

                            <Icon size={22} />

                            <span className="font-medium">
                                {item.title}
                            </span>

                        </Link>

                    );
                })}

            </nav>

            <div className="border-t border-slate-800 p-6">

                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-5">

                    <h3 className="font-semibold">
                        DSA Benchmark Studio
                    </h3>

                    <p className="mt-2 text-sm text-slate-100/90">
                        Professional Algorithm Benchmarking Platform
                    </p>

                    <div className="mt-5 rounded-lg bg-white/10 px-3 py-2 text-center text-sm">
                        Version 2.0
                    </div>

                </div>

            </div>

        </aside>
    );
}