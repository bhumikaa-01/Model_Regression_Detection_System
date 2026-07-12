from fastapi import APIRouter, HTTPException

from app.report import ReportLoader

router = APIRouter()

report_loader = ReportLoader()


@router.get("/reports")
def get_reports():
    return report_loader.get_all_reports()


@router.get("/reports/latest")
def get_latest_report():
    return report_loader.get_latest_report()


@router.get("/reports/{report_id}")
def get_report(report_id: int):

    report = report_loader.get_report_by_id(report_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail=f"Report {report_id} not found."
        )

    return report