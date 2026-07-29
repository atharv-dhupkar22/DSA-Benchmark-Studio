import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cpu,
  GitCompare,
  Trophy,
} from "lucide-react";

const features = [
  {
    title: "Benchmark Algorithms",
    description:
      "Measure execution time, memory usage, operations, swaps, and comparisons with precision.",
    icon: BarChart3,
  },
  {
    title: "Compare Algorithms",
    description:
      "Run multiple algorithms on the same dataset and compare their performance visually.",
    icon: GitCompare,
  },
  {
    title: "Leaderboard",
    description:
      "Automatically rank algorithms based on speed, efficiency, and memory consumption.",
    icon: Trophy,
  },
  {
    title: "Performance Analytics",
    description:
      "Gain deep insights using interactive charts and benchmark statistics.",
    icon: Cpu,
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          🚀 Professional DSA Benchmark Platform
        </div>

        <h1 className="max-w-5xl text-6xl font-extrabold leading-tight">
          Benchmark, Compare &
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            {" "}
            Visualize Algorithms
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          Analyze algorithm performance using execution time, memory usage,
          comparisons, swaps, recursion depth and advanced analytics—all in one
          beautiful dashboard.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/benchmark"
            className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-500"
          >
            Start Benchmark
          </Link>

          <Link
            href="/comparison"
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 transition hover:border-indigo-500"
          >
            Compare Algorithms
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-24 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-lg transition hover:border-indigo-500"
              >
                <div className="mb-5 inline-flex rounded-xl bg-indigo-500/10 p-3">
                  <Icon className="text-indigo-400" size={28} />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid w-full gap-6 md:grid-cols-4">
          <StatCard title="Algorithms" value="9+" />
          <StatCard title="Benchmark Metrics" value="6" />
          <StatCard title="Comparison Engine" value="100%" />
          <StatCard title="Interactive Charts" value="Live" />
        </div>

        <div className="mt-24 flex items-center gap-3 text-slate-500">
          <BrainCircuit className="text-indigo-400" size={20} />
          Powered by FastAPI • Next.js • TypeScript • Tailwind CSS
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="text-4xl font-bold text-indigo-400">{value}</div>

      <div className="mt-2 text-slate-400">
        {title}
      </div>
    </div>
  );
}