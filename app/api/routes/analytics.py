from fastapi import APIRouter, HTTPException

from app.analytics import AnalyticsService

router = APIRouter(tags=["Analytics"])

analytics_service = AnalyticsService()


@router.get(
    "/analytics",
    summary="Dashboard Analytics",
    description=(
        "Returns dashboard analytics generated from "
        "all regression reports."
    ),
)
def get_analytics():
    """
    Returns dashboard analytics.
    """

    try:

        analytics = analytics_service.get_analytics()

        return {
            "status": "success",
            "message": "Analytics retrieved successfully.",
            "data": analytics,
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )