from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Dict


@dataclass
class BenchmarkMetrics:
    """
    Standard benchmark metrics collected for every algorithm execution.

    All benchmark results in the project will use this model.
    """

    execution_time_ms: float
    memory_usage_kb: float
    input_size: int
    operation_count: int

    comparisons: int = 0
    swaps: int = 0
    recursion_depth: int = 0

    best_case_complexity: str = ""
    average_case_complexity: str = ""
    worst_case_complexity: str = ""
    space_complexity: str = ""

    stable: bool = False
    in_place: bool = False
    recursive: bool = False

    def to_dict(self) -> Dict:
        """
        Convert metrics into a dictionary.
        """
        return asdict(self)

    @property
    def execution_time_seconds(self) -> float:
        """
        Execution time in seconds.
        """
        return self.execution_time_ms / 1000

    def update_operations(
        self,
        *,
        comparisons: int = 0,
        swaps: int = 0,
        operation_count: int = 0,
    ) -> None:

        self.comparisons += comparisons
        self.swaps += swaps
        self.operation_count += operation_count

    def set_complexities(
        self,
        *,
        best: str,
        average: str,
        worst: str,
        space: str,
    ) -> None:

        self.best_case_complexity = best
        self.average_case_complexity = average
        self.worst_case_complexity = worst
        self.space_complexity = space

    def set_properties(
        self,
        *,
        stable: bool,
        in_place: bool,
        recursive: bool,
    ) -> None:

        self.stable = stable
        self.in_place = in_place
        self.recursive = recursive