from __future__ import annotations

from pathlib import Path

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


@router.post(
    "",
    response_model=ExportResponse,
)
def export_report(
    request: ExportRequest,
):
    benchmark_data = history_service.get_history()

    if request.dataset != "all":
        benchmark_data = [
            item
            for item in benchmark_data
            if item.get("dataset_type") == request.dataset
        ]

    output_path = export_service.export(
        request=request,
        data=benchmark_data,
    )

    return ExportResponse(
        success=True,
        message="Export created successfully.",
        file_name=output_path.name,
        format=request.format,
    )


@router.get("/download/{file_name}")
def download_export(
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


@router.get(
    "/history",
    response_model=ExportHistoryResponse,
)
def get_export_history():
    return ExportHistoryResponse(
        history=export_service.get_history()
    )


@router.get(
    "/stats",
    response_model=ExportStatsResponse,
)
def get_export_statistics():
    return ExportStatsResponse(
        stats=export_service.get_stats()
    )


@router.delete(
    "/history/{export_id}",
    response_model=DeleteExportResponse,
)
def delete_export(
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