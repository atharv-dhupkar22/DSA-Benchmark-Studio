from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class SelectionSort(BaseAlgorithm):
    """
    Selection Sort implementation.

    Time Complexity
    ----------------
    Best:    O(n²)
    Average: O(n²)
    Worst:   O(n²)

    Space Complexity
    ----------------
    O(1)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Selection Sort",
            category="Sorting",
            best_case="O(n²)",
            average_case="O(n²)",
            worst_case="O(n²)",
            space_complexity="O(1)",
            stable=False,
            in_place=True,
            recursive=False,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        """
        Execute Selection Sort.
        """

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        n = len(array)

        for i in range(n):

            minimum_index = i

            for j in range(i + 1, n):

                result.increment_comparison()

                if array[j] < array[minimum_index]:
                    minimum_index = j

            if minimum_index != i:
                array[i], array[minimum_index] = (
                    array[minimum_index],
                    array[i],
                )

                result.increment_swap()

        result.output = array

        result.set_metadata(
            "length",
            len(array),
        )

        result.set_metadata(
            "best_case",
            self.best_case,
        )

        result.set_metadata(
            "average_case",
            self.average_case,
        )

        result.set_metadata(
            "worst_case",
            self.worst_case,
        )

        result.set_metadata(
            "space_complexity",
            self.space_complexity,
        )

        result.set_metadata(
            "stable",
            self.stable,
        )

        result.set_metadata(
            "in_place",
            self.in_place,
        )

        result.set_metadata(
            "recursive",
            self.recursive,
        )

        return result