from __future__ import annotations

from typing import Any

from app.benchmark.benchmark_result import BenchmarkResult
from app.core.base_algorithm import BaseAlgorithm
from app.utils.memory_profiler import MemoryProfiler
from app.utils.statistics import StatisticsCalculator
from app.utils.timer import HighPrecisionTimer


class BenchmarkEngine:
    """
    Executes and benchmarks algorithms.

    Responsibilities
    ----------------
    - Run an algorithm multiple times
    - Measure execution time
    - Measure peak memory usage
    - Compute benchmark statistics
    - Return a BenchmarkResult
    """

    def run(
        self,
        algorithm: BaseAlgorithm,
        dataset: list[int],
        runs: int = 10,
    ) -> BenchmarkResult:

        if runs < 1:
            raise ValueError("runs must be at least 1.")

        execution_times: list[float] = []

        peak_memory = 0.0

        last_result = None

        for _ in range(runs):

            data = list(dataset)

            timer = HighPrecisionTimer()
            memory = MemoryProfiler()

            memory.start()
            timer.start()

            result = algorithm.run(data,)

            timer.stop()
            current_memory = memory.stop()

            execution_times.append(timer.elapsed_ms)

            peak_memory = max(
                peak_memory,
                current_memory,
            )

            last_result = result

        statistics = StatisticsCalculator.calculate(
            execution_times,
        )

        benchmark = BenchmarkResult(
            algorithm=algorithm.name,
            category=algorithm.category,
            algorithm_result=last_result,
            execution_time_ms=statistics.average,
            peak_memory_kb=peak_memory,
            cpu_usage_percent=0.0,
            runs=runs,
            success=True,
        )

        benchmark.set_metadata(
            "statistics",
            statistics.to_dict(),
        )

        benchmark.set_metadata(
            "dataset_size",
            len(dataset),
        )

        benchmark.set_metadata(
            "benchmark_runs",
            runs,
        )

        benchmark.set_metadata(
            "complexity",
            {
                "best": algorithm.best_case,
                "average": algorithm.average_case,
                "worst": algorithm.worst_case,
                "space": algorithm.space_complexity,
            },
        )

        benchmark.set_metadata(
            "properties",
            {
                "stable": algorithm.stable,
                "in_place": algorithm.in_place,
                "recursive": algorithm.recursive,
            },
        )

        return benchmark