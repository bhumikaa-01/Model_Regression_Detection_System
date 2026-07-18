from app.evaluator import Evaluator
from app.result_loader import ResultLoader


class EvaluationService:
    """
    Handles the complete evaluation workflow.
    """

    def __init__(self):
        self.evaluator = Evaluator()
        self.result_loader = ResultLoader()

    def run(
        self,
        model,
        prompt_version,
        dataset,
    ):
        """
        Run an evaluation and save the results.
        """

        results = self.evaluator.evaluate(
            dataset_name=dataset
        )

        evaluation_file = self.result_loader.save_results(
            results
        )

        return {
            "status": "completed",
            "message": "Evaluation executed successfully.",
            "evaluation_file": evaluation_file,
            "total_test_cases": len(results),
            "model": model,
            "prompt_version": prompt_version,
            "dataset": dataset,
        }