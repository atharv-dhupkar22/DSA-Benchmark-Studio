from __future__ import annotations

from fastapi import APIRouter, HTTPException, status

from app.benchmark import BenchmarkEngine
from app.registry import registry
from app.schemas.benchmark import BenchmarkRequest
from app.services import BenchmarkService

router = APIRouter(
    prefix="/api",
    tags=["Benchmark"],
)

benchmark_engine = BenchmarkEngine()
benchmark_service = BenchmarkService(benchmark_engine)


@router.get("/algorithms")
async def get_algorithms() -> dict:
    """
    List all registered algorithms.
    """

    algorithms = []

    for algorithm in registry.list():
        algorithms.append(
            {
                "name": algorithm.name,
                "category": algorithm.category,
                "complexity": {
                    "best": algorithm.best_case,
                    "average": algorithm.average_case,
                    "worst": algorithm.worst_case,
                    "space": algorithm.space_complexity,
                },
                "properties": {
                    "stable": algorithm.stable,
                    "in_place": algorithm.in_place,
                    "recursive": algorithm.recursive,
                },
            }
        )

    return {
        "count": len(algorithms),
        "algorithms": algorithms,
    }


@router.get("/algorithms/{algorithm_name}")
async def get_algorithm(
    algorithm_name: str,
) -> dict:
    """
    Get information about a single algorithm.
    """

    try:
        algorithm = registry.get(algorithm_name)

    except KeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc

    return algorithm.metadata()


@router.post("/benchmark/run")
async def run_benchmark(
    request: BenchmarkRequest,
):
    """
    Execute a benchmark.
    """

    try:
        result = benchmark_service.run(request)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except KeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc

    return result.to_dict()


@router.get("/registry")
async def registry_status():
    """
    Registry diagnostics.
    """

    return {
        "registered_algorithms": registry.count(),
        "categories": registry.list_categories(),
    }