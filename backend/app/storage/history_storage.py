from __future__ import annotations

from datetime import datetime
from pathlib import Path
from uuid import uuid4
from typing import Any

from app.storage.json_storage import JSONStorage


class HistoryStorage:
    """
    Persistent storage for benchmark history.
    """

    def __init__(self) -> None:
        data_path = (
            Path(__file__).resolve().parent.parent
            / "data"
            / "benchmark_history.json"
        )

        self.storage = JSONStorage(str(data_path))

    def save(self, benchmark: dict[str, Any]) -> dict[str, Any]:
        """
        Save benchmark result.
        """

        record = {
            "id": str(uuid4()),
            "created_at": datetime.utcnow().isoformat(),
            **benchmark,
        }

        self.storage.append(record)

        return record

    def get_all(self) -> list[dict[str, Any]]:
        data = self.storage.read()

        return sorted(
            data,
            key=lambda item: item["created_at"],
            reverse=True,
        )

    def get_by_id(
        self,
        benchmark_id: str,
    ) -> dict[str, Any] | None:

        for item in self.storage.read():
            if item["id"] == benchmark_id:
                return item

        return None

    def delete(
        self,
        benchmark_id: str,
    ) -> bool:

        data = self.storage.read()

        filtered = [
            item
            for item in data
            if item["id"] != benchmark_id
        ]

        if len(filtered) == len(data):
            return False

        self.storage.write(filtered)

        return True

    def clear(self) -> None:
        self.storage.clear()

    def count(self) -> int:
        return self.storage.count()

    def filter(
        self,
        algorithm: str | None = None,
        dataset_type: str | None = None,
    ) -> list[dict[str, Any]]:

        results = self.storage.read()

        if algorithm:
            results = [
                item
                for item in results
                if item["algorithm"] == algorithm
            ]

        if dataset_type:
            results = [
                item
                for item in results
                if item["dataset_type"] == dataset_type
            ]

        return sorted(
            results,
            key=lambda item: item["created_at"],
            reverse=True,
        )