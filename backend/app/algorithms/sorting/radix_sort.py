from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class RadixSort(BaseAlgorithm):
    """
    Stable LSD Radix Sort supporting signed integers.

    Time Complexity
    ----------------
    Best:    O(d(n + b))
    Average: O(d(n + b))
    Worst:   O(d(n + b))

    Space Complexity
    ----------------
    O(n + b)

    where:
        d = number of digits
        b = radix/base (10)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Radix Sort",
            category="Sorting",
            best_case="O(d(n+b))",
            average_case="O(d(n+b))",
            worst_case="O(d(n+b))",
            space_complexity="O(n+b)",
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

        negatives = [-x for x in array if x < 0]
        positives = [x for x in array if x >= 0]

        self._radix_sort(negatives, result)
        self._radix_sort(positives, result)

        negatives = [-x for x in reversed(negatives)]

        result.output = negatives + positives

        self.populate_result_metadata(
            result=result,
            input_size=len(array),
        )

        return result

    def _radix_sort(
        self,
        array: list[int],
        result: AlgorithmResult,
    ) -> None:

        if len(array) <= 1:
            return

        maximum = max(array)

        exponent = 1

        while maximum // exponent > 0:

            self._counting_pass(
                array,
                exponent,
                result,
            )

            exponent *= 10

    def _counting_pass(
        self,
        array: list[int],
        exponent: int,
        result: AlgorithmResult,
    ) -> None:

        output = [0] * len(array)

        count = [0] * 10

        for value in array:
            digit = (value // exponent) % 10
            count[digit] += 1
            result.increment_operation()

        for i in range(1, 10):
            count[i] += count[i - 1]

        for value in reversed(array):
            digit = (value // exponent) % 10
            output[count[digit] - 1] = value
            count[digit] -= 1
            result.increment_operation()

        array[:] = output