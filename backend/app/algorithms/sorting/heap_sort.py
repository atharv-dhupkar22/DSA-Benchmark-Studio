from __future__ import annotations

from app.core.base_algorithm import BaseAlgorithm
from app.models.algorithm_result import AlgorithmResult


class HeapSort(BaseAlgorithm):
    """
    Heap Sort implementation using a Max Heap.

    Time Complexity
    ----------------
    Best:    O(n log n)
    Average: O(n log n)
    Worst:   O(n log n)

    Space Complexity
    ----------------
    O(1)
    """

    def __init__(self) -> None:
        super().__init__(
            name="Heap Sort",
            category="Sorting",
            best_case="O(n log n)",
            average_case="O(n log n)",
            worst_case="O(n log n)",
            space_complexity="O(1)",
            stable=False,
            in_place=True,
            recursive=True,
        )

    def run(self, data: list[int]) -> AlgorithmResult:
        """
        Execute Heap Sort.
        """

        array = list(data)

        result = AlgorithmResult(
            algorithm=self.name,
            category=self.category,
            output=[],
        )

        n = len(array)
        max_depth = 0

        def heapify(size: int, root: int, depth: int) -> None:
            nonlocal max_depth

            max_depth = max(max_depth, depth)

            largest = root
            left = (2 * root) + 1
            right = (2 * root) + 2

            if left < size:
                result.increment_comparison()

                if array[left] > array[largest]:
                    largest = left

            if right < size:
                result.increment_comparison()

                if array[right] > array[largest]:
                    largest = right

            if largest != root:
                array[root], array[largest] = (
                    array[largest],
                    array[root],
                )

                result.increment_swap()

                heapify(size, largest, depth + 1)

        # Build max heap
        for index in range((n // 2) - 1, -1, -1):
            heapify(n, index, 1)

        # Extract elements
        for index in range(n - 1, 0, -1):

            array[0], array[index] = (
                array[index],
                array[0],
            )

            result.increment_swap()

            heapify(index, 0, 1)

            result.increment_operation()

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