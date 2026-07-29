"use client";

export default function ExportLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-3xl bg-slate-800"
          />
        ))}
      </div>

      {/* Export Options */}
      <div className="rounded-3xl bg-slate-800 p-8">
        <div className="mb-8 h-8 w-56 rounded bg-slate-700" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 rounded-2xl bg-slate-700"
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-12 rounded-xl bg-slate-700" />

            <div className="h-52 rounded-2xl bg-slate-700" />

            <div className="h-12 rounded-xl bg-slate-700" />
          </div>
        </div>
      </div>

      {/* History */}
      <div className="rounded-3xl bg-slate-800 p-8">
        <div className="mb-6 h-8 w-48 rounded bg-slate-700" />

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl bg-slate-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
}