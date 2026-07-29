from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class ShellSort(BaseAlgorithm):
    """
    Shell Sort implementation using Shell's original gap sequence.

    Time Complexity
    ----------------
    Best:    O(n log n) (approx.)
    Average: O(n^1.5)   (approx.)
    Worst:   O(n²)

    Space Complexity
    ----------------
    O(1)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Shell Sort",
            category="Sorting",
            best_case="O(n log n)",
            average_case="O(n^1.5)",
            worst_case="O(n²)",
            space_complexity="O(1)",
            stable=False,
            in_place=True,
            recursive=False,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        n = len(array)
        gap = n // 2

        while gap > 0:

            for i in range(gap, n):

                temp = array[i]

                j = i

                while j >= gap:

                    result.increment_comparison()

                    if array[j - gap] <= temp:
                        break

                    array[j] = array[j - gap]

                    result.increment_swap()

                    j -= gap

                array[j] = temp

            gap //= 2

        result.output = array

        self.populate_result_metadata(
            result=result,
            input_size=len(array),
        )

        return result