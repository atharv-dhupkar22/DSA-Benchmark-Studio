from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from app.models.algorithm_result import AlgorithmResult


@dataclass(slots=True)
class BenchmarkResult:
    """
    Complete benchmark result returned by the Benchmark Engine.

    This class combines:
    - Algorithm-specific metrics
    - Performance metrics
    - Benchmark statistics
    """

    algorithm: str

    category: str

    algorithm_result: AlgorithmResult

    execution_time_ms: float

    peak_memory_kb: float

    cpu_usage_percent: float

    runs: int = 1

    success: bool = True

    error: str | None = None

    metadata: dict[str, Any] = field(default_factory=dict)

    def set_metadata(self, key: str, value: Any) -> None:
        self.metadata[key] = value

    def to_dict(self) -> dict[str, Any]:
        return {
            "algorithm": self.algorithm,
            "category": self.category,
            "execution_time_ms": round(self.execution_time_ms, 6),
            "peak_memory_kb": round(self.peak_memory_kb, 3),
            "cpu_usage_percent": round(self.cpu_usage_percent, 2),
            "runs": self.runs,
            "success": self.success,
            "error": self.error,
            "algorithm_result": self.algorithm_result.to_dict(),
            "metadata": self.metadata,
        }