from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any

from app.models.algorithm_result import AlgorithmResult


class BaseAlgorithm(ABC):
    """
    Base class for every algorithm in DSA Benchmark Studio.

    Every algorithm must inherit from this class and implement
    the `run()` method.
    """

    def __init__(
        self,
        name: str,
        category: str,
        best_case: str,
        average_case: str,
        worst_case: str,
        space_complexity: str,
        stable: bool,
        in_place: bool,
        recursive: bool,
    ) -> None:

        self.name = name
        self.category = category

        self.best_case = best_case
        self.average_case = average_case
        self.worst_case = worst_case
        self.space_complexity = space_complexity

        self.stable = stable
        self.in_place = in_place
        self.recursive = recursive

    @abstractmethod
    def run(self, data: Any) -> AlgorithmResult:
        """
        Execute the algorithm.
        """
        raise NotImplementedError

    def metadata(self) -> dict[str, Any]:
        """
        Return metadata describing this algorithm.
        """

        return {
            "name": self.name,
            "category": self.category,
            "complexity": {
                "best": self.best_case,
                "average": self.average_case,
                "worst": self.worst_case,
                "space": self.space_complexity,
            },
            "properties": {
                "stable": self.stable,
                "in_place": self.in_place,
                "recursive": self.recursive,
            },
        }

    def populate_result_metadata(
        self,
        result: AlgorithmResult,
        input_size: int,
    ) -> None:
        """
        Populate the common metadata for an AlgorithmResult.

        Every algorithm should call this once before returning
        instead of repeating multiple set_metadata() calls.
        """

        result.set_metadata("length", input_size)

        result.set_metadata("best_case", self.best_case)
        result.set_metadata("average_case", self.average_case)
        result.set_metadata("worst_case", self.worst_case)

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

    def __str__(self) -> str:
        return f"{self.category} :: {self.name}"

    def __repr__(self) -> str:
        return (
            f"{self.__class__.__name__}"
            f"(name='{self.name}', category='{self.category}')"
        )