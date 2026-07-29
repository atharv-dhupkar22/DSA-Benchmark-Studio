from fastapi import APIRouter, HTTPException

from app.benchmark import BenchmarkEngine
from app.schemas.comparison import (
    ComparisonRequest,
    ComparisonResponse,
    ComparisonEntry,
    ComparisonSummary,
)
from app.schemas.benchmark import BenchmarkRequest
from app.services.benchmark_service import BenchmarkService

router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"],
)

benchmark_engine = BenchmarkEngine()
benchmark_service = BenchmarkService(benchmark_engine)


@router.post(
    "",
    response_model=ComparisonResponse,
)
async def compare_algorithms(
    request: ComparisonRequest,
):
    try:
        ranking: list[ComparisonEntry] = []

        for algorithm in request.algorithms:
            benchmark_request = BenchmarkRequest(
                algorithm=algorithm,
                dataset_type=request.dataset_type,
                dataset_size=request.dataset_size,
                runs=request.runs,
                random_min=request.random_min,
                random_max=request.random_max,
                custom_dataset=request.custom_dataset,
            )

            result = benchmark_service.benchmark(
                benchmark_request
            )

            ranking.append(
                ComparisonEntry(
                    algorithm=result.algorithm,
                    category=result.category,
                    average_execution_time_ms=result.execution.average_ms,
                    peak_memory_kb=result.peak_memory_kb,
                    comparisons=0,
                    swaps=0,
                    operations=0,
                    recursion_depth=0,
                    metadata=result.metadata,
                )
            )

        ranking.sort(
            key=lambda x: x.average_execution_time_ms
        )

        summary = ComparisonSummary(
            fastest_algorithm=ranking[0].algorithm,
            slowest_algorithm=ranking[-1].algorithm,
            least_memory_algorithm=min(
                ranking,
                key=lambda x: x.peak_memory_kb,
            ).algorithm,
            total_algorithms=len(ranking),
            dataset_size=request.dataset_size,
            benchmark_runs=request.runs,
        )

        return ComparisonResponse(
            ranking=ranking,
            summary=summary,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )