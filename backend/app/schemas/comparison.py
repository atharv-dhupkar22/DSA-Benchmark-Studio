from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.schemas.benchmark import DatasetType


class ComparisonRequest(BaseModel):
    """
    Request model for comparing multiple algorithms
    on the same dataset.
    """

    model_config = ConfigDict(
        extra="forbid",
        use_enum_values=True,
    )

    algorithms: list[str] = Field(
        ...,
        min_length=2,
        max_length=50,
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

    random_min: int = Field(
        default=0,
    )

    random_max: int = Field(
        default=100000,
    )

    custom_dataset: list[int] | None = None

    @field_validator("algorithms")
    @classmethod
    def validate_algorithms(
        cls,
        value: list[str],
    ) -> list[str]:

        cleaned = []

        for algorithm in value:
            algorithm = algorithm.strip()

            if not algorithm:
                raise ValueError(
                    "Algorithm names cannot be empty."
                )

            cleaned.append(algorithm)

        if len(set(cleaned)) != len(cleaned):
            raise ValueError(
                "Duplicate algorithms are not allowed."
            )

        return cleaned

    @field_validator("random_max")
    @classmethod
    def validate_random_range(
        cls,
        value: int,
        info,
    ) -> int:

        minimum = info.data.get("random_min", 0)

        if value < minimum:
            raise ValueError(
                "random_max must be greater than or equal to random_min."
            )

        return value


class ComparisonEntry(BaseModel):
    """
    Benchmark result for one algorithm.
    """

    algorithm: str

    category: str

    average_execution_time_ms: float

    peak_memory_kb: float

    comparisons: int

    swaps: int

    operations: int

    recursion_depth: int

    metadata: dict[str, Any] = Field(
        default_factory=dict,
    )


class ComparisonSummary(BaseModel):
    """
    Overall comparison statistics.
    """

    fastest_algorithm: str

    slowest_algorithm: str

    least_memory_algorithm: str

    total_algorithms: int

    dataset_size: int

    benchmark_runs: int


class ComparisonResponse(BaseModel):
    """
    Response returned by the comparison engine.
    """

    model_config = ConfigDict(extra="forbid")

    ranking: list[ComparisonEntry]

    summary: ComparisonSummary