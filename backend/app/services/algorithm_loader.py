from __future__ import annotations

from app.algorithms.sorting import (
    BubbleSort,
    SelectionSort,
    InsertionSort,
    MergeSort,
    SelectionSort,
    HeapSort,
    CountingSort,
    RadixSort,
    ShellSort,
)
from app.registry import registry


class AlgorithmLoader:
    """
    Loads and registers all algorithms available in the application.
    """

    @staticmethod
    def load() -> None:
        """
        Register every algorithm with the global registry.
        """

        registry.clear()

        algorithms = [
            BubbleSort(),
            SelectionSort(),
            InsertionSort(),
            MergeSort(),
            SelectionSort(),
            HeapSort(),
            CountingSort(),
            RadixSort(),
            ShellSort(),
        ]

        for algorithm in algorithms:
            registry.register(algorithm)