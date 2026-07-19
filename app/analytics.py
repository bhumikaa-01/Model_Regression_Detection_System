from app.report import ReportLoader


class AnalyticsService:
    """
    Generates dashboard analytics from regression reports.
    """

    def __init__(self):
        self.loader = ReportLoader()

    def get_analytics(self):

        reports = self.loader.get_all_reports()

        if not reports:
            return {
                "summary": {
                    "total_runs": 0,
                    "average_accuracy": 0,
                    "latest_accuracy": 0,
                    "best_accuracy": 0,
                    "latest_health_status": None,
                    "latest_deployment_status": None,
                    "total_regressions": 0,
                    "total_improvements": 0,
                },
                "accuracy_history": [],
                "regression_history": [],
                "health_distribution": {},
                "recent_reports": [],
            }

        # ---------------------------------------
        # Sort oldest -> newest
        # ---------------------------------------

        reports = sorted(
            reports,
            key=lambda report: report["report_id"]
        )

        latest = reports[-1]

        total_runs = len(reports)

        average_accuracy = round(
            sum(
                report["current_accuracy"]
                for report in reports
            ) / total_runs,
            2,
        )

        best_accuracy = max(
            report["current_accuracy"]
            for report in reports
        )

        latest_accuracy = latest["current_accuracy"]

        total_regressions = sum(
            len(report["regressions"])
            for report in reports
        )

        total_improvements = sum(
            len(report["improvements"])
            for report in reports
        )

        # ---------------------------------------
        # Accuracy Trend
        # ---------------------------------------

        accuracy_history = [

            {
                "report_id": report["report_id"],
                "accuracy": report["current_accuracy"],
            }

            for report in reports
        ]

        # ---------------------------------------
        # Regression Trend
        # ---------------------------------------

        regression_history = [

            {
                "report_id": report["report_id"],
                "regressions": len(report["regressions"]),
                "improvements": len(report["improvements"]),
            }

            for report in reports
        ]

        # ---------------------------------------
        # Health Distribution
        # ---------------------------------------

        health_distribution = {}

        for report in reports:

            status = report["health_status"]

            health_distribution[status] = (
                health_distribution.get(status, 0) + 1
            )

        # ---------------------------------------
        # Recent Reports
        # ---------------------------------------

        recent_reports = sorted(
            reports,
            key=lambda report: report["report_id"],
            reverse=True,
        )[:5]

        # ---------------------------------------
        # Dashboard Summary
        # ---------------------------------------

        summary = {

            "total_runs": total_runs,

            "average_accuracy": average_accuracy,

            "latest_accuracy": latest_accuracy,

            "best_accuracy": best_accuracy,

            "latest_health_status": latest[
                "health_status"
            ],

            "latest_deployment_status": latest[
                "deployment_recommendation"
            ],

            "total_regressions": total_regressions,

            "total_improvements": total_improvements,
        }

        return {

            "summary": summary,

            "accuracy_history": accuracy_history,

            "regression_history": regression_history,

            "health_distribution": health_distribution,

            "recent_reports": recent_reports,
        }