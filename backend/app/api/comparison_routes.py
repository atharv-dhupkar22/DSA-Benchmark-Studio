from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.benchmark import BenchmarkEngine
from app.schemas.comparison import (
    ComparisonRequest,
    ComparisonResponse,
)
from app.services.comparison_service import ComparisonService

router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"],
)


@router.post(
    "",
    response_model=ComparisonResponse,
)
def compare_algorithms(
    request: ComparisonRequest,
) -> ComparisonResponse:
    """
    Compare multiple algorithms using the same dataset.
    """

    try:

        engine = BenchmarkEngine()

        service = ComparisonService(engine)

        return service.compare(request)

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc


@router.get("/health")
def comparison_health() -> dict[str, str]:
    """
    Health endpoint.
    """

    return {
        "status": "ok",
        "service": "comparison",
    }