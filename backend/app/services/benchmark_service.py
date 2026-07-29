from __future__ import annotations

import statistics
import time
import tracemalloc
from copy import deepcopy
from typing import Callable

from app.benchmark import BenchmarkEngine
from app.schemas.benchmark import (
    BenchmarkRequest,
    BenchmarkResponse,
    BenchmarkSummary,
)
from app.utils.dataset_generator import DatasetGenerator
from app.storage.history_storage import HistoryStorage


class BenchmarkService:
    def __init__(self, benchmark_engine: BenchmarkEngine):
        self.benchmark_engine = benchmark_engine
        self.history_storage = HistoryStorage()

        self.algorithms: dict[str, Callable[[list[int]], list[int]]] = {
            "bubble_sort": self._bubble_sort,
            "selection_sort": self._selection_sort,
            "insertion_sort": self._insertion_sort,
            "merge_sort": self._merge_sort,
            "quick_sort": self._quick_sort,
            "heap_sort": self._heap_sort,
            "shell_sort": self._shell_sort,
            "counting_sort": self._counting_sort,
            "radix_sort": self._radix_sort,
        }

    def run(self, request: BenchmarkRequest) -> BenchmarkResponse:
        return self.benchmark(request)

    def benchmark(
        self,
        request: BenchmarkRequest,
    ) -> BenchmarkResponse:

        if request.algorithm not in self.algorithms:
            raise ValueError(
                f"Unsupported algorithm: {request.algorithm}"
            )

        dataset = DatasetGenerator.generate(
            dataset_type=request.dataset_type,
            size=request.dataset_size,
            random_min=request.random_min,
            random_max=request.random_max,
            custom_dataset=request.custom_dataset,
        )

        execution_times: list[float] = []
        peak_memory = 0.0

        algorithm = self.algorithms[request.algorithm]

        for _ in range(request.runs):
            working_data = dataset.copy()

            # tracemalloc.start()

            start = time.perf_counter()

            algorithm(working_data)

            elapsed = (time.perf_counter() - start) * 1000

            # _, peak = tracemalloc.get_traced_memory()
            # tracemalloc.stop()

            peak = 0

            execution_times.append(elapsed)

            peak_memory = max(
                peak_memory,
                peak / 1024,
            )

        summary = BenchmarkSummary(
            average_ms=statistics.mean(execution_times),
            median_ms=statistics.median(execution_times),
            minimum_ms=min(execution_times),
            maximum_ms=max(execution_times),
            standard_deviation_ms=(
                statistics.stdev(execution_times)
                if len(execution_times) > 1
                else 0.0
            ),
        )

        return BenchmarkResponse(
            algorithm=request.algorithm,
            category="Sorting",
            dataset_type=request.dataset_type,
            dataset_size=request.dataset_size,
            runs=request.runs,
            execution=summary,
            peak_memory_kb=round(peak_memory, 2),
            algorithm_metrics={
                "time_complexity": self._time_complexity(
                    request.algorithm
                ),
                "space_complexity": self._space_complexity(
                    request.algorithm
                ),
                "stable": self._is_stable(
                    request.algorithm
                ),
                "in_place": self._is_in_place(
                    request.algorithm
                ),
            },
            metadata={
                "python_version": "3.x",
                "benchmark_engine": "DSA Benchmark Studio",
            },
        )

    def _time_complexity(self, algorithm: str) -> str:
        mapping = {
            "bubble_sort": "O(n²)",
            "selection_sort": "O(n²)",
            "insertion_sort": "O(n²)",
            "merge_sort": "O(n log n)",
            "quick_sort": "O(n log n)",
            "heap_sort": "O(n log n)",
            "shell_sort": "Depends on gap sequence",
            "counting_sort": "O(n+k)",
            "radix_sort": "O(d(n+k))",
        }

        return mapping.get(
            algorithm,
            "Unknown",
        )

    def _space_complexity(self, algorithm: str) -> str:
        mapping = {
            "bubble_sort": "O(1)",
            "selection_sort": "O(1)",
            "insertion_sort": "O(1)",
            "merge_sort": "O(n)",
            "quick_sort": "O(log n)",
            "heap_sort": "O(1)",
            "shell_sort": "O(1)",
            "counting_sort": "O(n+k)",
            "radix_sort": "O(n+k)",
        }

        return mapping.get(
            algorithm,
            "Unknown",
        )

    def _is_stable(self, algorithm: str) -> bool:
        return algorithm in {
            "bubble_sort",
            "insertion_sort",
            "merge_sort",
            "counting_sort",
            "radix_sort",
        }

    def _is_in_place(self, algorithm: str) -> bool:
        return algorithm not in {
            "merge_sort",
            "counting_sort",
            "radix_sort",
        }
    def _bubble_sort(self, arr: list[int]) -> list[int]:
        n = len(arr)

        for i in range(n):
            swapped = False

            for j in range(0, n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True

            if not swapped:
                break

        return arr

    def _selection_sort(self, arr: list[int]) -> list[int]:
        n = len(arr)

        for i in range(n):
            minimum = i

            for j in range(i + 1, n):
                if arr[j] < arr[minimum]:
                    minimum = j

            arr[i], arr[minimum] = arr[minimum], arr[i]

        return arr

    def _insertion_sort(self, arr: list[int]) -> list[int]:
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1

            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1

            arr[j + 1] = key

        return arr

    def _merge_sort(self, arr: list[int]) -> list[int]:
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2

        left = self._merge_sort(arr[:mid])
        right = self._merge_sort(arr[mid:])

        return self._merge(left, right)

    def _merge(
        self,
        left: list[int],
        right: list[int],
    ) -> list[int]:
        merged: list[int] = []

        i = 0
        j = 0

        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        while i < len(left):
            merged.append(left[i])
            i += 1

        while j < len(right):
            merged.append(right[j])
            j += 1

        return merged
    def _quick_sort(self, arr: list[int]) -> list[int]:
        if len(arr) <= 1:
            return arr

        pivot = arr[len(arr) // 2]

        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]

        return (
            self._quick_sort(left)
            + middle
            + self._quick_sort(right)
        )

    def _heap_sort(self, arr: list[int]) -> list[int]:
        import heapq

        heap = arr.copy()
        heapq.heapify(heap)

        sorted_arr = []

        while heap:
            sorted_arr.append(heapq.heappop(heap))

        return sorted_arr

    def _shell_sort(self, arr: list[int]) -> list[int]:
        gap = len(arr) // 2

        while gap > 0:
            for i in range(gap, len(arr)):
                temp = arr[i]
                j = i

                while j >= gap and arr[j - gap] > temp:
                    arr[j] = arr[j - gap]
                    j -= gap

                arr[j] = temp

            gap //= 2

        return arr

    def _counting_sort(self, arr: list[int]) -> list[int]:
        if not arr:
            return arr

        minimum = min(arr)
        maximum = max(arr)

        offset = -minimum if minimum < 0 else 0

        count = [0] * (maximum + offset + 1)

        for value in arr:
            count[value + offset] += 1

        index = 0

        for value, frequency in enumerate(count):
            while frequency > 0:
                arr[index] = value - offset
                index += 1
                frequency -= 1

        return arr

    def _radix_sort(self, arr: list[int]) -> list[int]:
        if not arr:
            return arr

        negatives = [-x for x in arr if x < 0]
        positives = [x for x in arr if x >= 0]

        positives = self._radix_positive(positives)
        negatives = self._radix_positive(negatives)

        negatives = [-x for x in reversed(negatives)]

        return negatives + positives

    def _radix_positive(self, arr: list[int]) -> list[int]:
        if not arr:
            return arr

        maximum = max(arr)
        exponent = 1

        while maximum // exponent > 0:
            self._counting_sort_digit(arr, exponent)
            exponent *= 10

        return arr

    def _counting_sort_digit(
        self,
        arr: list[int],
        exponent: int,
    ) -> None:
        size = len(arr)

        output = [0] * size
        count = [0] * 10

        for number in arr:
            index = (number // exponent) % 10
            count[index] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        for i in range(size - 1, -1, -1):
            index = (arr[i] // exponent) % 10
            output[count[index] - 1] = arr[i]
            count[index] -= 1

        for i in range(size):
            arr[i] = output[i]