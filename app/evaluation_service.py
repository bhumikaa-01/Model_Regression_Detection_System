import time

from app.evaluator import Evaluator
from app.result_loader import ResultLoader
from app.regression_detector import RegressionDetector
from app.report_manager import ReportManager


class EvaluationService:
    """
    Handles the complete evaluation workflow.
    """

    def __init__(self):
        self.evaluator = Evaluator()
        self.result_loader = ResultLoader()
        self.regression_detector = RegressionDetector()
        self.report_manager = ReportManager()

    def run(
        self,
        model,
        prompt_version,
        dataset,
    ):
        """
        Run an evaluation, save the results,
        perform regression analysis,
        and generate a regression report.
        """

        start_time = time.perf_counter()

        # ----------------------------------------
        # Run Evaluation
        # ----------------------------------------

        results = self.evaluator.evaluate(
            dataset_name=dataset
        )

        evaluation_info = self.result_loader.save_results(
            results
        )

        execution_time = round(
            time.perf_counter() - start_time,
            2,
        )

        regression_summary = None
        regression_report = None

        # ----------------------------------------
        # Perform Regression Analysis
        # ----------------------------------------

        try:

            (
                previous_results,
                current_results,
                previous_file,
                current_file,
            ) = self.result_loader.get_latest_two_results()

            comparison = self.regression_detector.compare_runs(
                previous_results,
                current_results,
            )

            regression_summary = (
                self.regression_detector.generate_summary(
                    comparison
                )
            )

            regression_summary["previous_file"] = previous_file
            regression_summary["current_file"] = current_file

            # ----------------------------------------
            # Save Regression Report
            # ----------------------------------------

            regression_report = self.report_manager.save_report(
                summary=regression_summary,
                model_name=model,
                prompt_name="Customer Support Email Classifier",
                prompt_version=prompt_version,
                dataset_name=dataset,
                dataset_version="v1",
                previous_evaluation=previous_file,
                current_evaluation=current_file,
                execution_time=execution_time,
            )

        except ValueError:
            # First evaluation.
            # No previous report exists yet.
            regression_summary = None

        return {
            "status": "completed",
            "message": "Evaluation executed successfully.",
            "evaluation_file": evaluation_info["filename"],
            "regression_report": regression_report,
            "total_test_cases": len(results),
            "execution_time_seconds": execution_time,
            "model": model,
            "prompt_version": prompt_version,
            "dataset": dataset,
            "regression": regression_summary,
        }