from fastapi import APIRouter

from app.analytics import AnalyticsService

router = APIRouter(tags=["Analytics"])

analytics_service = AnalyticsService()


@router.get(
    "/analytics",
    summary="Analytics Dashboard",
    description="Returns overall statistics for all evaluation reports.",
)
def get_analytics():
    return analytics_service.get_analytics()