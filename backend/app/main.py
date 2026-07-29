from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.benchmark import router as benchmark_router
from app.api.comparison import router as comparison_router
from app.api.history import router as history_router
from app.api.export import router as export_router
app = FastAPI(
    title="DSA Benchmark Studio API",
    description="Benchmarking platform for Data Structures and Algorithms",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    benchmark_router,
    prefix="/api",
)

app.include_router(
    comparison_router,
    prefix="/api",
)

app.include_router(
    history_router,
    prefix="/api",
)

app.include_router(
    export_router,
    prefix="/api",
)



@app.get("/")
async def root():
    return {
        "project": "DSA Benchmark Studio",
        "version": "2.0.0",
        "status": "running",
        "features": [
            "Benchmark",
            "Comparison",
            "History",
            "Export",
            "Persistent Storage",
        ],
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "DSA Benchmark Studio",
    }


@app.get("/info")
async def info():
    return {
        "project": "DSA Benchmark Studio",
        "version": "2.0.0",
        "algorithms": [
            "bubble_sort",
            "selection_sort",
            "insertion_sort",
            "merge_sort",
            "quick_sort",
            "heap_sort",
            "shell_sort",
            "counting_sort",
            "radix_sort",
        ],
        "dataset_types": [
            "random",
            "sorted",
            "reverse_sorted",
            "nearly_sorted",
            "few_unique",
            "custom",
        ],
        "endpoints": {
            "benchmark": "/api/benchmark",
            "comparison": "/api/comparison",
            "history": "/api/history",
            "export_json": "/api/export/json",
            "export_csv": "/api/export/csv",
            "summary": "/api/export/summary",
            "docs": "/docs",
        },
    }


@app.get("/leaderboard")
async def leaderboard():
    from app.services.history_service import HistoryService

    history = HistoryService().get_history()

    leaderboard = sorted(
        history,
        key=lambda item: item["execution"]["average_ms"],
    )

    return {
        "total": len(leaderboard),
        "leaderboard": leaderboard[:20],
    }


@app.get("/analytics")
async def analytics():
    from app.services.history_service import HistoryService

    history = HistoryService().get_history()

    if not history:
        return {
            "total_runs": 0,
            "average_execution_ms": 0,
            "average_memory_kb": 0,
        }

    average_execution = sum(
        item["execution"]["average_ms"]
        for item in history
    ) / len(history)

    average_memory = sum(
        item["peak_memory_kb"]
        for item in history
    ) / len(history)

    return {
        "total_runs": len(history),
        "average_execution_ms": round(
            average_execution,
            4,
        ),
        "average_memory_kb": round(
            average_memory,
            2,
        ),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )