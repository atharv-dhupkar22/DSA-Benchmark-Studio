from __future__ import annotations

import traceback
from dataclasses import dataclass
from typing import Any, Callable

from app.benchmark.metrics import BenchmarkMetrics
from app.utils.memory import MemoryProfiler
from app.utils.timer import Timer


@dataclass
class BenchmarkResult:
    algorithm: str
    category: str
    metrics: BenchmarkMetrics
    output: Any
    success: bool
    error: str | None = None


class BenchmarkEngine:
    """
    Core Benchmark Engine.

    Every algorithm in the project executes through this engine.

    Responsibilities
    ----------------
    - Measure execution time
    - Measure memory usage
    - Handle runtime errors
    - Return standardized benchmark results
    """

    def __init__(self) -> None:
        self.results: list[BenchmarkResult] = []

    def benchmark(
        self,
        algorithm_name: str,
        category: str,
        function: Callable[..., Any],
        *args,
        **kwargs,
    ) -> BenchmarkResult:

        timer = Timer()
        memory = MemoryProfiler()

        try:
            memory.start()
            timer.start()

            output = function(*args, **kwargs)

            execution_time = timer.stop()
            memory_usage = memory.stop()

            metrics = BenchmarkMetrics(
                execution_time_ms=execution_time,
                memory_usage_kb=memory_usage,
                input_size=self._infer_input_size(args),
                operation_count=0,
            )

            result = BenchmarkResult(
                algorithm=algorithm_name,
                category=category,
                metrics=metrics,
                output=output,
                success=True,
            )

        except Exception as exc:

            result = BenchmarkResult(
                algorithm=algorithm_name,
                category=category,
                metrics=BenchmarkMetrics(
                    execution_time_ms=0.0,
                    memory_usage_kb=0.0,
                    input_size=0,
                    operation_count=0,
                ),
                output=None,
                success=False,
                error=f"{exc}\n\n{traceback.format_exc()}",
            )

        self.results.append(result)

        return result

    def get_results(self) -> list[BenchmarkResult]:
        return self.results

    def clear_results(self) -> None:
        self.results.clear()

    def summary(self) -> dict[str, int]:

        successful = sum(result.success for result in self.results)

        return {
            "total_runs": len(self.results),
            "successful": successful,
            "failed": len(self.results) - successful,
        }

    @staticmethod
    def _infer_input_size(args: tuple[Any, ...]) -> int:

        if not args:
            return 0

        first = args[0]

        try:
            return len(first)
        except TypeError:
            return 1