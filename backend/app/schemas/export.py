from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ExportFormat(str, Enum):
    CSV = "csv"
    PDF = "pdf"
    JSON = "json"
    XLSX = "xlsx"


class ExportRequest(BaseModel):
    format: ExportFormat = Field(
        ...,
        description="Requested export format",
    )

    dataset: str = Field(
        default="all",
        min_length=1,
        description="Dataset or benchmark category",
    )


class ExportHistoryItem(BaseModel):
    id: str

    file_name: str

    format: ExportFormat

    exported_at: datetime

    records: int

    size: str

    model_config = ConfigDict(
        from_attributes=True
    )


class ExportHistoryResponse(BaseModel):
    history: list[ExportHistoryItem]


class ExportResponse(BaseModel):
    success: bool

    message: str

    file_name: str

    format: ExportFormat


class DeleteExportResponse(BaseModel):
    success: bool

    message: str


class ExportStats(BaseModel):
    total_exports: int = 0

    csv_exports: int = 0

    pdf_exports: int = 0

    json_exports: int = 0

    excel_exports: int = 0

    last_export: datetime | None = None


class ExportStatsResponse(BaseModel):
    stats: ExportStats