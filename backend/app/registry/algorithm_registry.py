from __future__ import annotations

from typing import Dict, List

from app.core.base_algorithm import BaseAlgorithm


class AlgorithmRegistry:
    """
    Global registry for all algorithms.

    Algorithms register themselves once during application startup.

    Example
    -------
    registry.register(BubbleSort())

    algorithm = registry.get("Bubble Sort")
    """

    def __init__(self) -> None:
        self._algorithms: Dict[str, BaseAlgorithm] = {}

    def register(self, algorithm: BaseAlgorithm) -> None:
        """
        Register an algorithm.

        Raises
        ------
        ValueError
            If an algorithm with the same name is already registered.
        """

        key = algorithm.name.lower()

        if key in self._algorithms:
            raise ValueError(
                f"Algorithm '{algorithm.name}' is already registered."
            )

        self._algorithms[key] = algorithm

    def unregister(self, name: str) -> None:
        """
        Remove an algorithm from the registry.
        """

        self._algorithms.pop(name.lower(), None)

    def get(self, name: str) -> BaseAlgorithm:
        """
        Retrieve an algorithm by name.
        """

        key = name.lower()

        if key not in self._algorithms:
            raise KeyError(
                f"Algorithm '{name}' is not registered."
            )

        return self._algorithms[key]

    def exists(self, name: str) -> bool:
        """
        Check whether an algorithm exists.
        """

        return name.lower() in self._algorithms

    def list(self) -> List[BaseAlgorithm]:
        """
        Return all registered algorithms.
        """

        return list(self._algorithms.values())

    def list_names(self) -> List[str]:
        """
        Return algorithm names.
        """

        return sorted(
            algorithm.name
            for algorithm in self._algorithms.values()
        )

    def list_categories(self) -> Dict[str, List[str]]:
        """
        Group algorithms by category.
        """

        result: Dict[str, List[str]] = {}

        for algorithm in self._algorithms.values():

            result.setdefault(
                algorithm.category,
                []
            ).append(algorithm.name)

        for category in result:
            result[category].sort()

        return result

    def count(self) -> int:
        """
        Number of registered algorithms.
        """

        return len(self._algorithms)

    def clear(self) -> None:
        """
        Remove every registered algorithm.
        """

        self._algorithms.clear()


registry = AlgorithmRegistry()