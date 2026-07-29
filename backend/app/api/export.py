from __future__ import annotations

from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.schemas.export import (
    DeleteExportResponse,
    ExportHistoryResponse,
    ExportRequest,
    ExportResponse,
    ExportStatsResponse,
)
from app.services.export_service import ExportService
from app.services.history_service import HistoryService

router = APIRouter(
    prefix="/export",
    tags=["Export"],
)

export_service = ExportService()
history_service = HistoryService()


@router.get(
    "/history",
    response_model=ExportHistoryResponse,
)
async def get_export_history():
    return ExportHistoryResponse(
        history=export_service.get_history()
    )


@router.get(
    "/stats",
    response_model=ExportStatsResponse,
)
async def get_export_stats():
    return ExportStatsResponse(
        stats=export_service.get_stats()
    )


@router.post(
    "",
    response_model=ExportResponse,
)
async def create_export(
    request: ExportRequest,
):
    benchmark_data: list[dict[str, Any]] = history_service.get_history()

    output_file = export_service.export(
        request=request,
        data=benchmark_data,
    )

    return ExportResponse(
        success=True,
        message="Export created successfully.",
        file_name=output_file.name,
        format=request.format,
    )


@router.get("/download/{file_name}")
async def download_export(
    file_name: str,
):
    file_path = Path("app/exports") / file_name

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Export file not found.",
        )

    return FileResponse(
        path=file_path,
        filename=file_name,
        media_type="application/octet-stream",
    )


@router.delete(
    "/history/{export_id}",
    response_model=DeleteExportResponse,
)
async def delete_export(
    export_id: str,
):
    deleted = export_service.delete_export(
        export_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Export not found.",
        )

    return DeleteExportResponse(
        success=True,
        message="Export deleted successfully.",
    )