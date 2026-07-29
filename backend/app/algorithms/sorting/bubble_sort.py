from __future__ import annotations

from typing import List

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class BubbleSort(BaseAlgorithm):
    """
    Bubble Sort Algorithm
    """

    def __init__(self) -> None:
        super().__init__(
            name="Bubble Sort",
            category="Sorting",
            best_case="O(n)",
            average_case="O(n²)",
            worst_case="O(n²)",
            space_complexity="O(1)",
            stable=True,
            in_place=True,
            recursive=False,
        )

    def run(self, data: List[int]) -> AlgorithmResult:
        """
        Execute Bubble Sort.
        """

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=array,
        )

        n = len(array)

        for i in range(n):

            swapped = False

            for j in range(0, n - i - 1):

                result.increment_comparison()

                if array[j] > array[j + 1]:
                    array[j], array[j + 1] = array[j + 1], array[j]

                    result.increment_swap()

                    swapped = True

            if not swapped:
                break

        result.output = array

        result.set_metadata("length", len(array))
        result.set_metadata("best_case", self.best_case)
        result.set_metadata("average_case", self.average_case)
        result.set_metadata("worst_case", self.worst_case)
        result.set_metadata("space_complexity", self.space_complexity)
        result.set_metadata("stable", self.stable)
        result.set_metadata("in_place", self.in_place)
        result.set_metadata("recursive", self.recursive)

        return result