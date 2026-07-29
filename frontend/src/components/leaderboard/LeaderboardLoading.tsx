"use client";

export default function LeaderboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-3xl bg-slate-800"
          />
        ))}
      </div>

      {/* Filters */}
      <div className="h-32 rounded-3xl bg-slate-800" />

      {/* Table */}
      <div className="rounded-3xl bg-slate-800 p-6">
        <div className="space-y-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-14 rounded-xl bg-slate-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
}