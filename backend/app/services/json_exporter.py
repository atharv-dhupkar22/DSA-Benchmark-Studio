from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any


class JSONExporter:
    """
    Exports benchmark results as a structured JSON report.
    """

    def export(
        self,
        output_path: Path,
        data: list[dict[str, Any]],
    ) -> Path:
        """
        Export benchmark history to a formatted JSON file.
        """

        report = {
            "export_information": {
                "generated_at": datetime.utcnow().isoformat(),
                "generator": "DSA Benchmark Studio",
                "total_benchmarks": len(data),
                "report_type": "Benchmark Export",
            },
            "benchmarks": [],
        }

        for item in data:
            benchmark = {
                "id": item.get("id"),
                "created_at": item.get("created_at"),
                "algorithm": item.get("algorithm"),
                "category": item.get("category"),
                "dataset": {
                    "type": item.get("dataset_type"),
                    "size": item.get("dataset_size"),
                },
                "runs": item.get("runs"),
                "execution": {
                    "average_ms": item.get("execution", {}).get("average_ms"),
                    "median_ms": item.get("execution", {}).get("median_ms"),
                    "minimum_ms": item.get("execution", {}).get("minimum_ms"),
                    "maximum_ms": item.get("execution", {}).get(
                        "maximum_ms"
                    ),
                    "standard_deviation_ms": item.get(
                        "execution", {}
                    ).get("standard_deviation_ms"),
                },
                "memory": {
                    "peak_memory_kb": item.get("peak_memory_kb"),
                },
                "algorithm_metrics": {
                    "time_complexity": item.get(
                        "algorithm_metrics", {}
                    ).get("time_complexity"),
                    "space_complexity": item.get(
                        "algorithm_metrics", {}
                    ).get("space_complexity"),
                    "stable": item.get(
                        "algorithm_metrics", {}
                    ).get("stable"),
                    "in_place": item.get(
                        "algorithm_metrics", {}
                    ).get("in_place"),
                },
                "metadata": {
                    "python_version": item.get(
                        "metadata", {}
                    ).get("python_version"),
                    "benchmark_engine": item.get(
                        "metadata", {}
                    ).get("benchmark_engine"),
                },
            }

            report["benchmarks"].append(benchmark)

        with output_path.open(
            "w",
            encoding="utf-8",
        ) as json_file:
            json.dump(
                report,
                json_file,
                indent=4,
                ensure_ascii=False,
            )

        return output_path