from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class CountingSort(BaseAlgorithm):
    """
    Stable Counting Sort implementation supporting
    both positive and negative integers.

    Time Complexity
    ----------------
    Best:    O(n + k)
    Average: O(n + k)
    Worst:   O(n + k)

    Space Complexity
    ----------------
    O(n + k)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Counting Sort",
            category="Sorting",
            best_case="O(n + k)",
            average_case="O(n + k)",
            worst_case="O(n + k)",
            space_complexity="O(n + k)",
            stable=True,
            in_place=False,
            recursive=False,
        )

    def run(self, data: list[int]) -> AlgorithmResult:

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        if not array:
            result.output = []
            self.populate_result_metadata(result, 0)
            return result

        minimum = min(array)
        maximum = max(array)

        offset = -minimum

        count = [0] * (maximum - minimum + 1)

        for value in array:
            count[value + offset] += 1
            result.increment_operation()

        for i in range(1, len(count)):
            count[i] += count[i - 1]
            result.increment_operation()

        output = [0] * len(array)

        for value in reversed(array):
            index = value + offset
            output[count[index] - 1] = value
            count[index] -= 1
            result.increment_operation()

        result.output = output

        self.populate_result_metadata(
            result=result,
            input_size=len(array),
        )

        return result