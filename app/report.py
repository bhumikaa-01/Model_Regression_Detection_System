import json
import os


class EvaluationReport:
    """
    Saves evaluation results to JSON files.
    """

    def __init__(self):

        self.results_folder = "results"

        os.makedirs(self.results_folder, exist_ok=True)

    def save_results(self, results):

        existing_files = [
            file
            for file in os.listdir(self.results_folder)
            if file.startswith("evaluation_") and file.endswith(".json")
        ]

        run_number = len(existing_files) + 1

        filename = f"evaluation_{run_number:03}.json"

        filepath = os.path.join(
            self.results_folder,
            filename
        )

        with open(filepath, "w", encoding="utf-8") as file:

            json.dump(
                results,
                file,
                indent=4,
                ensure_ascii=False,
            )

        print(f"\nEvaluation results saved to:\n{filepath}")

        return filepath