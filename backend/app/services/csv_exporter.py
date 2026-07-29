from __future__ import annotations

import csv
from pathlib import Path
from typing import Any


class CSVExporter:
    """
    Exports benchmark results to CSV.
    """

    HEADERS = [
        "ID",
        "Created At",
        "Algorithm",
        "Category",
        "Dataset Type",
        "Dataset Size",
        "Runs",
        "Average (ms)",
        "Median (ms)",
        "Minimum (ms)",
        "Maximum (ms)",
        "Std Dev (ms)",
        "Peak Memory (KB)",
        "Time Complexity",
        "Space Complexity",
        "Stable",
        "In Place",
        "Python Version",
        "Benchmark Engine",
    ]

    def export(
        self,
        output_path: Path,
        data: list[dict[str, Any]],
    ) -> Path:
        """
        Export benchmark history to CSV.
        """

        with output_path.open(
            "w",
            newline="",
            encoding="utf-8",
        ) as csv_file:

            writer = csv.writer(csv_file)

            writer.writerow(self.HEADERS)

            for item in data:
                execution = item.get("execution", {})
                metrics = item.get("algorithm_metrics", {})
                metadata = item.get("metadata", {})

                writer.writerow(
                    [
                        item.get("id", ""),
                        item.get("created_at", ""),
                        item.get("algorithm", ""),
                        item.get("category", ""),
                        item.get("dataset_type", ""),
                        item.get("dataset_size", ""),
                        item.get("runs", ""),
                        execution.get("average_ms", ""),
                        execution.get("median_ms", ""),
                        execution.get("minimum_ms", ""),
                        execution.get("maximum_ms", ""),
                        execution.get("standard_deviation_ms", ""),
                        item.get("peak_memory_kb", ""),
                        metrics.get("time_complexity", ""),
                        metrics.get("space_complexity", ""),
                        metrics.get("stable", ""),
                        metrics.get("in_place", ""),
                        metadata.get("python_version", ""),
                        metadata.get("benchmark_engine", ""),
                    ]
                )

        return output_path