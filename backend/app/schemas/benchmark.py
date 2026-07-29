from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    ValidationInfo,
    field_validator,
    model_validator,
)


class DatasetType(str, Enum):
    RANDOM = "random"
    SORTED = "sorted"
    REVERSE_SORTED = "reverse_sorted"
    NEARLY_SORTED = "nearly_sorted"
    FEW_UNIQUE = "few_unique"
    CUSTOM = "custom"


class BenchmarkRequest(BaseModel):
    """
    Request model for running an algorithm benchmark.
    """

    model_config = ConfigDict(
        extra="forbid",
        use_enum_values=True,
    )

    algorithm: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )

    dataset_type: DatasetType = Field(
        default=DatasetType.RANDOM,
    )

    dataset_size: int = Field(
        default=1000,
        ge=1,
        le=1_000_000,
    )

    runs: int = Field(
        default=10,
        ge=1,
        le=100,
    )

    custom_dataset: list[int] | None = Field(
        default=None,
    )

    random_min: int = Field(
        default=0,
    )

    random_max: int = Field(
        default=100000,
    )

    @field_validator("algorithm")
    @classmethod
    def validate_algorithm(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Algorithm name cannot be empty.")

        return value

    @field_validator("random_max")
    @classmethod
    def validate_random_range(
        cls,
        value: int,
        info: ValidationInfo,
    ) -> int:
        minimum = info.data.get("random_min", 0)

        if value < minimum:
            raise ValueError(
                "random_max must be greater than or equal to random_min."
            )

        return value

    @model_validator(mode="after")
    def validate_custom_dataset(self):
        """
        Validate custom_dataset only when dataset_type is CUSTOM.
        """

        if self.dataset_type == DatasetType.CUSTOM:
            if self.custom_dataset is None or len(self.custom_dataset) == 0:
                raise ValueError("Custom dataset cannot be empty.")

        return self


class BenchmarkSummary(BaseModel):
    """
    Statistical summary of benchmark execution.
    """

    average_ms: float
    median_ms: float
    minimum_ms: float
    maximum_ms: float
    standard_deviation_ms: float


class BenchmarkResponse(BaseModel):
    """
    API response returned after a benchmark finishes.
    """

    model_config = ConfigDict(extra="forbid")

    algorithm: str
    category: str

    dataset_type: DatasetType
    dataset_size: int

    runs: int

    execution: BenchmarkSummary

    peak_memory_kb: float

    algorithm_metrics: dict[str, Any]

    metadata: dict[str, Any] = Field(default_factory=dict)