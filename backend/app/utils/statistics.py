from __future__ import annotations

import statistics
from dataclasses import dataclass


@dataclass(slots=True)
class StatisticsResult:
    """
    Stores statistical information for benchmark runs.
    """

    average: float
    median: float
    minimum: float
    maximum: float
    standard_deviation: float

    def to_dict(self) -> dict:
        return {
            "average": round(self.average, 6),
            "median": round(self.median, 6),
            "minimum": round(self.minimum, 6),
            "maximum": round(self.maximum, 6),
            "standard_deviation": round(self.standard_deviation, 6),
        }


class StatisticsCalculator:
    """
    Computes statistics for repeated benchmark runs.
    """

    @staticmethod
    def calculate(values: list[float]) -> StatisticsResult:
        """
        Calculate benchmark statistics.

        Parameters
        ----------
        values:
            List of execution times.

        Returns
        -------
        StatisticsResult
        """

        if not values:
            raise ValueError("Values list cannot be empty.")

        if len(values) == 1:
            value = values[0]

            return StatisticsResult(
                average=value,
                median=value,
                minimum=value,
                maximum=value,
                standard_deviation=0.0,
            )

        return StatisticsResult(
            average=statistics.mean(values),
            median=statistics.median(values),
            minimum=min(values),
            maximum=max(values),
            standard_deviation=statistics.stdev(values),
        )