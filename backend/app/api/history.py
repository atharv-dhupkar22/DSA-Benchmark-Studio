from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.services.history_service import HistoryService

router = APIRouter(
    prefix="/history",
    tags=["History"],
)

history_service = HistoryService()


@router.get("")
async def get_history(
    algorithm: Optional[str] = Query(default=None),
    dataset_type: Optional[str] = Query(default=None),
):
    if algorithm or dataset_type:
        history = history_service.filter(
            algorithm=algorithm,
            dataset_type=dataset_type,
        )
    else:
        history = history_service.get_history()

    return {
        "total": len(history),
        "history": history,
    }


@router.get("/{history_id}")
async def get_history_item(
    history_id: str,
):
    item = history_service.get_by_id(history_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="History item not found.",
        )

    return item


@router.delete("/{history_id}")
async def delete_history_item(
    history_id: str,
):
    deleted = history_service.delete(history_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="History item not found.",
        )

    return {
        "message": "History item deleted successfully."
    }


@router.delete("")
async def clear_history():
    history_service.clear()

    return {
        "message": "History cleared successfully."
    }


@router.get("/stats/summary")
async def history_summary():
    history = history_service.get_history()

    if not history:
        return {
            "total_runs": 0,
            "fastest_algorithm": None,
            "average_execution_ms": 0,
        }

    fastest = min(
        history,
        key=lambda item: item["execution"]["average_ms"],
    )

    average = (
        sum(
            item["execution"]["average_ms"]
            for item in history
        )
        / len(history)
    )

    return {
        "total_runs": len(history),
        "fastest_algorithm": fastest["algorithm"],
        "average_execution_ms": round(
            average,
            4,
        ),
    }


@router.get("/algorithms/usage")
async def algorithm_usage():
    history = history_service.get_history()

    usage: dict[str, int] = {}

    for item in history:
        algorithm = item["algorithm"]
        usage[algorithm] = usage.get(algorithm, 0) + 1

    return usage