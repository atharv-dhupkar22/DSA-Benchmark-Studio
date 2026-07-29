from fastapi import APIRouter, HTTPException

from app.benchmark import BenchmarkEngine
from app.schemas.benchmark import (
    BenchmarkRequest,
    BenchmarkResponse,
)
from app.services.benchmark_service import BenchmarkService
from app.services.history_service import HistoryService

router = APIRouter(
    prefix="/benchmark",
    tags=["Benchmark"],
)

benchmark_engine = BenchmarkEngine()
benchmark_service = BenchmarkService(benchmark_engine)
history_service = HistoryService()


@router.get(
    "/algorithms",
    response_model=list[str],
)
async def get_algorithms():
    return sorted(
        benchmark_service.algorithms.keys()
    )


@router.post(
    "",
    response_model=BenchmarkResponse,
)
async def run_benchmark(
    request: BenchmarkRequest,
):
    try:
        # Run benchmark
        result = benchmark_service.benchmark(request)

        # Save benchmark result into history
        history_service.save(
            result.model_dump()
        )

        # Return benchmark response
        return result

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Benchmark failed: {str(e)}",
        )


@router.get("/history")
async def benchmark_history():
    history = history_service.get_history()

    return {
        "total": len(history),
        "history": history,
    }


@router.get("/leaderboard")
async def benchmark_leaderboard():
    history = history_service.get_history()

    leaderboard = sorted(
        history,
        key=lambda item: item["execution"]["average_ms"],
    )

    return {
        "total": len(leaderboard),
        "leaderboard": leaderboard[:20],
    }


@router.get("/analytics")
async def benchmark_analytics():
    history = history_service.get_history()

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


@router.get("/health")
async def benchmark_health():
    return {
        "status": "healthy",
        "service": "Benchmark Service",
        "algorithms": len(
            benchmark_service.algorithms
        ),
        "history_records": history_service.count(),
    }


@router.get("/sample")
async def benchmark_sample():
    sample = BenchmarkRequest(
        algorithm="quick_sort",
        dataset_type="random",
        dataset_size=10000,
        runs=5,
        random_min=0,
        random_max=100000,
    )

    try:
        result = benchmark_service.benchmark(sample)

        history_service.save(
            result.model_dump()
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )