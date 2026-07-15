from app.report import ReportLoader


class AnalyticsService:
    def __init__(self):
        self.loader = ReportLoader()

    def get_analytics(self):
        reports = self.loader.get_all_reports()

        if not reports:
            return {
                "total_runs": 0,
                "average_accuracy": 0,
                "total_regressions": 0,
                "accuracy_history": [],
                "regression_history": [],
                "health_distribution": {},
                "recent_reports": [],
            }

        total_runs = len(reports)

        average_accuracy = (
            sum(report["current_accuracy"] for report in reports)
            / total_runs
        )

        total_regressions = sum(
            len(report["regressions"])
            for report in reports
        )

        accuracy_history = [
            {
                "report_id": report["report_id"],
                "accuracy": report["current_accuracy"],
            }
            for report in reports
        ]

        regression_history = [
            {
                "report_id": report["report_id"],
                "regressions": len(report["regressions"]),
            }
            for report in reports
        ]

        health_distribution = {}

        for report in reports:
            status = report["health_status"]

            health_distribution[status] = (
                health_distribution.get(status, 0) + 1
            )

        # Latest reports (newest first)
        recent_reports = sorted(
            reports,
            key=lambda report: report["report_id"],
            reverse=True,
        )[:5]

        return {
            "total_runs": total_runs,
            "average_accuracy": round(average_accuracy, 2),
            "total_regressions": total_regressions,
            "accuracy_history": accuracy_history,
            "regression_history": regression_history,
            "health_distribution": health_distribution,
            "recent_reports": recent_reports,
        }