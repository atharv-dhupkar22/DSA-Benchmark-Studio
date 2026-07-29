from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(slots=True)
class AlgorithmResult:
    """
    Generic result returned by every algorithm.

    This class contains only algorithm-specific information.

    Benchmark-related information such as execution time,
    memory usage and CPU usage will be added later by the
    BenchmarkEngine.
    """

    algorithm: str

    category: str

    output: Any

    comparisons: int = 0

    swaps: int = 0

    operations: int = 0

    recursion_depth: int = 0

    metadata: dict[str, Any] = field(default_factory=dict)

    def increment_comparison(self, count: int = 1) -> None:
        self.comparisons += count
        self.operations += count

    def increment_swap(self, count: int = 1) -> None:
        self.swaps += count
        self.operations += count

    def increment_operation(self, count: int = 1) -> None:
        self.operations += count

    def set_metadata(self, key: str, value: Any) -> None:
        self.metadata[key] = value

    def to_dict(self) -> dict[str, Any]:
        return {
            "algorithm": self.algorithm,
            "category": self.category,
            "output": self.output,
            "comparisons": self.comparisons,
            "swaps": self.swaps,
            "operations": self.operations,
            "recursion_depth": self.recursion_depth,
            "metadata": self.metadata,
        }