from __future__ import annotations

from typing import Any

from app.storage.history_storage import HistoryStorage


class HistoryService:
    """
    Service layer for benchmark history.
    """

    def __init__(self) -> None:
        self.storage = HistoryStorage()

    def save(
        self,
        benchmark: dict[str, Any],
    ) -> dict[str, Any]:
        return self.storage.save(benchmark)

    def get_history(self) -> list[dict[str, Any]]:
        return self.storage.get_all()

    def get_by_id(
        self,
        benchmark_id: str,
    ) -> dict[str, Any] | None:
        return self.storage.get_by_id(benchmark_id)

    def delete(
        self,
        benchmark_id: str,
    ) -> bool:
        return self.storage.delete(benchmark_id)

    def clear(self) -> None:
        self.storage.clear()

    def count(self) -> int:
        return self.storage.count()

    def filter(
        self,
        algorithm: str | None = None,
        dataset_type: str | None = None,
    ) -> list[dict[str, Any]]:
        return self.storage.filter(
            algorithm=algorithm,
            dataset_type=dataset_type,
        )