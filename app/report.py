import json
from pathlib import Path


class ReportLoader:
    """
    Loads regression reports.
    """

    def __init__(self):
        self.results_dir = Path("results")

    def get_latest_report(self):
        """
        Returns the latest regression report.
        """

        reports = sorted(
            self.results_dir.glob("regression_report_*.json")
        )

        if not reports:
            raise FileNotFoundError(
                "No regression reports found."
            )

        latest_report = reports[-1]

        with open(latest_report, "r", encoding="utf-8") as file:
            return json.load(file)

    def get_all_reports(self):
        """
        Returns all regression reports sorted newest first.
        """

        reports = sorted(
            self.results_dir.glob("regression_report_*.json"),
            reverse=True,
        )

        report_list = []

        for report in reports:

            with open(report, "r", encoding="utf-8") as file:
                report_list.append(json.load(file))

        return report_list

    def get_report_by_id(self, report_id: int):
        """
        Returns a specific regression report by ID.
        """

        report_file = (
            self.results_dir /
            f"regression_report_{report_id:03}.json"
        )

        if not report_file.exists():
            return None

        with open(report_file, "r", encoding="utf-8") as file:
            return json.load(file)