from typing import List

from fastapi import APIRouter, HTTPException

from app.api.schemas import ReportResponse
from app.report import ReportLoader

router = APIRouter(tags=["Reports"])

report_loader = ReportLoader()

@router.get(
    "/reports",
    response_model=List[ReportResponse],
    summary="List all reports",
    description="Returns every regression report stored in the results directory.",
)
def get_all_reports():
    return report_loader.get_all_reports()


@router.get(
    "/reports/latest",
    response_model=ReportResponse,
    summary="Latest report",
    description="Returns the most recently generated regression report.",
)
def get_latest_report():
    return report_loader.get_latest_report()


@router.get(
    "/reports/{report_id}",
    response_model=ReportResponse,
    summary="Report by ID",
    description="Returns a specific regression report using its report ID.",
)
def get_report(report_id: int):

    report = report_loader.get_report_by_id(report_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail=f"Report {report_id} not found."
        )

    return report