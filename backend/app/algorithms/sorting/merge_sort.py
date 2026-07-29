from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class MergeSort(BaseAlgorithm):
    """
    Merge Sort implementation.
    """

    def __init__(self) -> None:
        super().__init__(
            name="Merge Sort",
            category="Sorting",
            best_case="O(n log n)",
            average_case="O(n log n)",
            worst_case="O(n log n)",
            space_complexity="O(n)",
            stable=True,
            in_place=False,
            recursive=True,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        max_depth = 0

        def merge_sort(values: list[int], depth: int) -> list[int]:
            nonlocal max_depth

            if depth > max_depth:
                max_depth = depth

            if len(values) <= 1:
                return values

            middle = len(values) // 2

            left = merge_sort(values[:middle], depth + 1)
            right = merge_sort(values[middle:], depth + 1)

            return merge(left, right)

        def merge(left: list[int], right: list[int]) -> list[int]:
            merged: list[int] = []

            i = 0
            j = 0

            while i < len(left) and j < len(right):
                result.increment_comparison()

                if left[i] <= right[j]:
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1

                result.increment_operation()

            while i < len(left):
                merged.append(left[i])
                i += 1
                result.increment_operation()

            while j < len(right):
                merged.append(right[j])
                j += 1
                result.increment_operation()

            return merged

        result.output = merge_sort(array, 1)

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