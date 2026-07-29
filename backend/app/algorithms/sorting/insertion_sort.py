from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class InsertionSort(BaseAlgorithm):
    """
    Insertion Sort implementation.

    Time Complexity
    ----------------
    Best:    O(n)
    Average: O(n²)
    Worst:   O(n²)

    Space Complexity
    ----------------
    O(1)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Insertion Sort",
            category="Sorting",
            best_case="O(n)",
            average_case="O(n²)",
            worst_case="O(n²)",
            space_complexity="O(1)",
            stable=True,
            in_place=True,
            recursive=False,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        """
        Execute Insertion Sort.
        """

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        n = len(array)

        for i in range(1, n):

            key = array[i]

            j = i - 1

            while j >= 0:

                result.increment_comparison()

                if array[j] <= key:
                    break

                array[j + 1] = array[j]

                result.increment_swap()

                j -= 1

            array[j + 1] = key

            result.increment_operation()

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