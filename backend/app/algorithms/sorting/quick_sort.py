from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class QuickSort(BaseAlgorithm):
    """
    Quick Sort implementation using the Lomuto partition scheme.

    Time Complexity
    ----------------
    Best:    O(n log n)
    Average: O(n log n)
    Worst:   O(n²)

    Space Complexity
    ----------------
    O(log n)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Quick Sort",
            category="Sorting",
            best_case="O(n log n)",
            average_case="O(n log n)",
            worst_case="O(n²)",
            space_complexity="O(log n)",
            stable=False,
            in_place=True,
            recursive=True,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        """
        Execute Quick Sort.
        """

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        max_depth = 0

        def partition(low: int, high: int) -> int:
            pivot = array[high]

            i = low - 1

            for j in range(low, high):

                result.increment_comparison()

                if array[j] <= pivot:

                    i += 1

                    if i != j:
                        array[i], array[j] = array[j], array[i]
                        result.increment_swap()

            if i + 1 != high:
                array[i + 1], array[high] = array[high], array[i + 1]
                result.increment_swap()

            return i + 1

        def quick_sort(low: int, high: int, depth: int) -> None:
            nonlocal max_depth

            if depth > max_depth:
                max_depth = depth

            if low >= high:
                return

            pivot_index = partition(low, high)

            result.increment_operation()

            quick_sort(low, pivot_index - 1, depth + 1)
            quick_sort(pivot_index + 1, high, depth + 1)

        quick_sort(0, len(array) - 1, 1)

        result.output = array
        result.recursion_depth = max_depth

        result.set_metadata("length", len(array))
        result.set_metadata("best_case", self.best_case)
        result.set_metadata("average_case", self.average_case)
        result.set_metadata("worst_case", self.worst_case)
        result.set_metadata("space_complexity", self.space_complexity)
        result.set_metadata("stable", self.stable)
        result.set_metadata("in_place", self.in_place)
        result.set_metadata("recursive", self.recursive)

        return result