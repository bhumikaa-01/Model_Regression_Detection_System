import json
from pathlib import Path
from datetime import datetime


class ReportManager:
    """
    Handles creation and saving of regression reports.
    """

    def __init__(self):

        self.results_dir = Path("results")
        self.results_dir.mkdir(exist_ok=True)

    def _next_report_number(self):
        """
        Returns the next available report number.
        """

        reports = sorted(
            self.results_dir.glob("regression_report_*.json")
        )

        if not reports:
            return 1

        last_report = reports[-1].stem.split("_")[-1]

        return int(last_report) + 1

    def save_report(
    self,
    summary,
    model_name,
    prompt_name,
    prompt_version,
    dataset_name,
    dataset_version,
    previous_evaluation,
    current_evaluation,
    execution_time,
):
        """
        Saves the regression report as JSON.
        """

        report_number = self._next_report_number()

        filename = (
            self.results_dir
            / f"regression_report_{report_number:03}.json"
        )

        report = {

    "report_id": report_number,
    "timestamp": datetime.now().isoformat(),

    "model": model_name,

    "prompt_name": prompt_name,
    "prompt_version": prompt_version,

    "dataset_name": dataset_name,
    "dataset_version": dataset_version,

    "previous_evaluation": previous_evaluation,
    "current_evaluation": current_evaluation,

    "execution_time_seconds": execution_time,

    "total_test_cases": summary["total_cases"],

    "previous_accuracy": summary["previous_accuracy"],
    "current_accuracy": summary["current_accuracy"],
    "accuracy_delta": summary["accuracy_delta"],

    "health_status": summary["health_status"],
    "deployment_recommendation": summary["deployment_recommendation"],

    "regressions": summary["regressions"],
    "improvements": summary["improvements"],
    "unchanged_passes": summary["unchanged_passes"],
    "still_failing": summary["still_failing"],
}
    def _get_report_files(self):
        """
        Returns all regression report files sorted by report number.
        """
        return sorted(
            self.results_dir.glob("regression_report_*.json")
        )

    def list_reports(self):
        """
        Returns all regression report filenames.
        """
        return [
            report.name
            for report in self._get_report_files()
        ]

    def load_report(self, filename):
        """
        Loads a regression report.
        """

        filepath = self.results_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(
                f"{filename} does not exist."
            )

        with open(
            filepath,
            "r",
            encoding="utf-8",
        ) as file:

            return json.load(file)

    def get_latest_report(self):
        """
        Returns the latest regression report.
        """

        reports = self._get_report_files()

        if not reports:
            raise ValueError(
                "No regression reports found."
            )

        latest = reports[-1]

        return self.load_report(latest.name)
    
        with open(filename, "w", encoding="utf-8") as file:

            json.dump(
                report,
                file,
                indent=4,
                ensure_ascii=False,
            )

        return filename