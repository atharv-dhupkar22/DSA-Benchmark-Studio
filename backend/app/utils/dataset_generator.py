from __future__ import annotations

import random
from typing import List

from app.schemas.benchmark import DatasetType


class DatasetGenerator:
    """
    Generates datasets for benchmarking algorithms.
    """

    @staticmethod
    def generate(
        dataset_type: DatasetType,
        size: int,
        random_min: int = 0,
        random_max: int = 100000,
        custom_dataset: List[int] | None = None,
    ) -> List[int]:
        """
        Generate dataset based on the requested type.
        """

        if dataset_type == DatasetType.CUSTOM:
            if not custom_dataset:
                raise ValueError("Custom dataset cannot be empty.")
            return custom_dataset.copy()

        if size <= 0:
            raise ValueError("Dataset size must be greater than zero.")

        if random_max < random_min:
            raise ValueError(
                "random_max must be greater than or equal to random_min."
            )

        if dataset_type == DatasetType.RANDOM:
            return DatasetGenerator._random(
                size,
                random_min,
                random_max,
            )

        if dataset_type == DatasetType.SORTED:
            return DatasetGenerator._sorted(
                size,
                random_min,
                random_max,
            )

        if dataset_type == DatasetType.REVERSE_SORTED:
            return DatasetGenerator._reverse_sorted(
                size,
                random_min,
                random_max,
            )

        if dataset_type == DatasetType.NEARLY_SORTED:
            return DatasetGenerator._nearly_sorted(
                size,
                random_min,
                random_max,
            )

        if dataset_type == DatasetType.FEW_UNIQUE:
            return DatasetGenerator._few_unique(
                size,
                random_min,
                random_max,
            )

        raise ValueError(f"Unsupported dataset type: {dataset_type}")

    @staticmethod
    def _random(
        size: int,
        minimum: int,
        maximum: int,
    ) -> List[int]:
        return [
            random.randint(minimum, maximum)
            for _ in range(size)
        ]

    @staticmethod
    def _sorted(
        size: int,
        minimum: int,
        maximum: int,
    ) -> List[int]:
        data = DatasetGenerator._random(
            size,
            minimum,
            maximum,
        )

        data.sort()

        return data

    @staticmethod
    def _reverse_sorted(
        size: int,
        minimum: int,
        maximum: int,
    ) -> List[int]:
        data = DatasetGenerator._sorted(
            size,
            minimum,
            maximum,
        )

        data.reverse()

        return data

    @staticmethod
    def _nearly_sorted(
        size: int,
        minimum: int,
        maximum: int,
    ) -> List[int]:
        data = DatasetGenerator._sorted(
            size,
            minimum,
            maximum,
        )

        swaps = max(1, size // 20)

        for _ in range(swaps):
            i = random.randint(0, size - 1)
            j = random.randint(0, size - 1)
            data[i], data[j] = data[j], data[i]

        return data

    @staticmethod
    def _few_unique(
        size: int,
        minimum: int,
        maximum: int,
    ) -> List[int]:
        unique_count = min(10, size)

        values = [
            random.randint(minimum, maximum)
            for _ in range(unique_count)
        ]

        return [
            random.choice(values)
            for _ in range(size)
        ]