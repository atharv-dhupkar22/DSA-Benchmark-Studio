from __future__ import annotations

from dataclasses import dataclass
from typing import List


@dataclass
class SortingResult:
    """
    Standard result returned by every sorting algorithm.
    """

    algorithm: str

    sorted_array: List[int]

    comparisons: int

    swaps: int

    operations: int

    execution_time_ms: float = 0.0

    memory_usage_kb: float = 0.0

    best_case: str = ""

    average_case: str = ""

    worst_case: str = ""

    space_complexity: str = ""

    stable: bool = False

    in_place: bool = False

    recursive: bool = False