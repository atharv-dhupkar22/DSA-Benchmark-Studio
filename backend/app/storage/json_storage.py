from __future__ import annotations

import json
import threading
from pathlib import Path
from typing import Any


class JSONStorage:
    """
    Thread-safe JSON file storage.

    Responsible only for reading and writing JSON files.

    Higher level modules (History, Leaderboard, Analytics)
    should use this class instead of directly touching files.
    """

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.lock = threading.Lock()

        self.file_path.parent.mkdir(parents=True, exist_ok=True)

        if not self.file_path.exists():
            self.file_path.write_text(
                "[]",
                encoding="utf-8",
            )

    def read(self) -> list[dict[str, Any]]:
        with self.lock:
            try:
                with open(
                    self.file_path,
                    "r",
                    encoding="utf-8",
                ) as file:
                    data = json.load(file)

                    if isinstance(data, list):
                        return data

                    return []

            except json.JSONDecodeError:
                return []

            except FileNotFoundError:
                return []

    def write(
        self,
        data: list[dict[str, Any]],
    ) -> None:

        with self.lock:
            with open(
                self.file_path,
                "w",
                encoding="utf-8",
            ) as file:
                json.dump(
                    data,
                    file,
                    indent=4,
                    ensure_ascii=False,
                )

    def append(
        self,
        item: dict[str, Any],
    ) -> None:

        data = self.read()

        data.append(item)

        self.write(data)

    def clear(self) -> None:
        self.write([])

    def exists(self) -> bool:
        return self.file_path.exists()

    def count(self) -> int:
        return len(self.read())