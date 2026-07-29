from __future__ import annotations

from app.registry import registry
from app.schemas.comparison import (
    ComparisonEntry,
    ComparisonRequest,
    ComparisonResponse,
    ComparisonSummary,
)
from app.services.history_service import HistoryService
from app.utils.dataset_generator import (
    DatasetGenerator,
    DatasetType,
)


class ComparisonService:
    """
    Service responsible for comparing multiple algorithms
    using the same dataset.
    """

    def __init__(self, benchmark_engine) -> None:
        self._benchmark_engine = benchmark_engine
        self._history_service = HistoryService()

    def compare(
        self,
        request: ComparisonRequest,
    ) -> ComparisonResponse:

        dataset = self._prepare_dataset(request)

        benchmark_results = []

        for algorithm_name in request.algorithms:

            if not registry.exists(algorithm_name):
                raise ValueError(
                    f"Algorithm '{algorithm_name}' is not registered."
                )

            algorithm = registry.get(algorithm_name)

            benchmark = self._benchmark_engine.run(
                algorithm=algorithm,
                dataset=list(dataset),
                runs=request.runs,
            )

            benchmark_results.append(benchmark)

        benchmark_results.sort(
            key=lambda item: item.execution_time_ms
        )

        ranking: list[ComparisonEntry] = []

        for benchmark in benchmark_results:

            result = benchmark.algorithm_result

            ranking.append(
                ComparisonEntry(
                    algorithm=benchmark.algorithm,
                    category=benchmark.category,
                    average_execution_time_ms=benchmark.execution_time_ms,
                    peak_memory_kb=benchmark.peak_memory_kb,
                    comparisons=result.comparisons,
                    swaps=result.swaps,
                    operations=result.operations,
                    recursion_depth=result.recursion_depth,
                    metadata=benchmark.metadata,
                )
            )

        fastest = benchmark_results[0]
        slowest = benchmark_results[-1]

        least_memory = min(
            benchmark_results,
            key=lambda item: item.peak_memory_kb,
        )

        summary = ComparisonSummary(
            fastest_algorithm=fastest.algorithm,
            slowest_algorithm=slowest.algorithm,
            least_memory_algorithm=least_memory.algorithm,
            total_algorithms=len(benchmark_results),
            dataset_size=len(dataset),
            benchmark_runs=request.runs,
        )

        response = ComparisonResponse(
            ranking=ranking,
            summary=summary,
        )

        self._save_comparison_history(
            response=response,
            request=request,
        )

        return response

    def _save_comparison_history(
        self,
        response: ComparisonResponse,
        request: ComparisonRequest,
    ) -> None:

        for entry in response.ranking:

            self._history_service.storage.save(
                {
                    "algorithm": entry.algorithm,
                    "category": entry.category,
                    "dataset_type": str(request.dataset_type),
                    "dataset_size": request.dataset_size,
                    "runs": request.runs,
                    "execution": {
                        "average_ms": entry.average_execution_time_ms,
                        "median_ms": entry.average_execution_time_ms,
                        "minimum_ms": entry.average_execution_time_ms,
                        "maximum_ms": entry.average_execution_time_ms,
                        "standard_deviation_ms": 0.0,
                    },
                    "peak_memory_kb": entry.peak_memory_kb,
                    "algorithm_metrics": {
                        "comparisons": entry.comparisons,
                        "swaps": entry.swaps,
                        "operations": entry.operations,
                        "recursion_depth": entry.recursion_depth,
                    },
                    "metadata": entry.metadata,
                }
            )

    def _prepare_dataset(
        self,
        request: ComparisonRequest,
    ) -> list[int]:

        if request.dataset_type == DatasetType.CUSTOM:

            if request.custom_dataset is None:
                raise ValueError(
                    "custom_dataset must be provided."
                )

            return list(request.custom_dataset)

        return DatasetGenerator.generate(
            dataset_type=request.dataset_type,
            size=request.dataset_size,
            minimum=request.random_min,
            maximum=request.random_max,
        )