from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any
from uuid import uuid4

from app.schemas.export import (
    ExportFormat,
    ExportHistoryItem,
    ExportRequest,
    ExportStats,
)
from app.services.csv_exporter import CSVExporter
from app.services.excel_exporter import ExcelExporter
from app.services.json_exporter import JSONExporter
from app.services.pdf_exporter import PDFExporter


class ExportService:
    """
    Handles report generation and export management.
    """

    def __init__(self) -> None:

        self.export_directory = (
            Path(__file__).resolve().parent.parent / "exports"
        )

        self.export_directory.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.csv_exporter = CSVExporter()
        self.json_exporter = JSONExporter()
        self.pdf_exporter = PDFExporter()
        self.excel_exporter = ExcelExporter()

        self._history: list[ExportHistoryItem] = []

    # ----------------------------------------------------
    # Export
    # ----------------------------------------------------

    def export(
        self,
        request: ExportRequest,
        data: list[dict[str, Any]],
    ) -> Path:

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        extension = self._extension(request.format)

        filename = f"benchmark_{timestamp}.{extension}"

        output_path = self.export_directory / filename

        if request.format == ExportFormat.CSV:
            self.csv_exporter.export(output_path, data)

        elif request.format == ExportFormat.JSON:
            self.json_exporter.export(output_path, data)

        elif request.format == ExportFormat.PDF:
            self.pdf_exporter.export(output_path, data)

        elif request.format == ExportFormat.XLSX:
            self.excel_exporter.export(output_path, data)

        else:
            raise ValueError(
                f"Unsupported export format: {request.format}"
            )

        file_size_kb = (
            output_path.stat().st_size / 1024
            if output_path.exists()
            else 0
        )

        self._history.append(
            ExportHistoryItem(
                id=str(uuid4()),
                file_name=filename,
                format=request.format,
                exported_at=datetime.now(),
                records=len(data),
                size=f"{file_size_kb:.2f} KB",
            )
        )

        return output_path

    # ----------------------------------------------------
    # History
    # ----------------------------------------------------

    def get_history(
        self,
    ) -> list[ExportHistoryItem]:

        return sorted(
            self._history,
            key=lambda item: item.exported_at,
            reverse=True,
        )

    # ----------------------------------------------------
    # Statistics
    # ----------------------------------------------------

    def get_stats(
        self,
    ) -> ExportStats:

        csv_exports = sum(
            1
            for item in self._history
            if item.format == ExportFormat.CSV
        )

        pdf_exports = sum(
            1
            for item in self._history
            if item.format == ExportFormat.PDF
        )

        json_exports = sum(
            1
            for item in self._history
            if item.format == ExportFormat.JSON
        )

        excel_exports = sum(
            1
            for item in self._history
            if item.format == ExportFormat.XLSX
        )

        last_export = (
            self._history[0].exported_at
            if self._history
            else None
        )

        return ExportStats(
            total_exports=len(self._history),
            csv_exports=csv_exports,
            pdf_exports=pdf_exports,
            json_exports=json_exports,
            excel_exports=excel_exports,
            last_export=last_export,
        )

    # ----------------------------------------------------
    # Delete
    # ----------------------------------------------------

    def delete_export(
        self,
        export_id: str,
    ) -> bool:

        for item in self._history:

            if item.id == export_id:

                file_path = (
                    self.export_directory / item.file_name
                )

                if file_path.exists():
                    file_path.unlink()

                self._history.remove(item)

                return True

        return False

    # ----------------------------------------------------
    # Helpers
    # ----------------------------------------------------

    @staticmethod
    def _extension(
        export_format: ExportFormat,
    ) -> str:

        mapping = {
            ExportFormat.CSV: "csv",
            ExportFormat.JSON: "json",
            ExportFormat.PDF: "pdf",
            ExportFormat.XLSX: "xlsx",
        }

        return mapping[export_format]