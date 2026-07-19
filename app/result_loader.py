import json
from pathlib import Path


class ResultLoader:
    """
    Handles saving, loading, and retrieving
    evaluation result files.
    """

    def __init__(self):
        self.results_dir = Path("results")
        self.results_dir.mkdir(exist_ok=True)

    def _get_result_files(self):
        """
        Returns all evaluation files sorted by evaluation number.
        """
        return sorted(
            self.results_dir.glob("evaluation_*.json")
        )

    def _next_evaluation_number(self):
        """
        Returns the next evaluation number.
        """
        files = self._get_result_files()

        if not files:
            return 1

        last_number = int(files[-1].stem.split("_")[-1])

        return last_number + 1

    def save_results(self, results):
        """
        Save evaluation results to a new file.
        """

        number = self._next_evaluation_number()

        filename = (
            self.results_dir /
            f"evaluation_{number:03}.json"
        )

        with open(
            filename,
            "w",
            encoding="utf-8",
        ) as file:

            json.dump(
                results,
                file,
                indent=4,
                ensure_ascii=False,
            )

        return {
            "filename": filename.name,
            "path": str(filename),
        }

    def load_results(self, filename):
        """
        Load an evaluation result file.
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

    def list_results(self):
        """
        Returns all evaluation filenames.
        """

        return [
            file.name
            for file in self._get_result_files()
        ]

    def get_latest_filename(self):
        """
        Returns the latest evaluation filename.
        """

        files = self._get_result_files()

        if not files:
            raise ValueError(
                "No evaluation reports found."
            )

        return files[-1].name

    def get_previous_filename(self):
        """
        Returns the previous evaluation filename.
        """

        files = self._get_result_files()

        if len(files) < 2:
            raise ValueError(
                "Need at least two evaluation reports."
            )

        return files[-2].name

    def get_latest_two_results(self):
        """
        Returns the previous and current evaluation results.
        """

        previous_filename = self.get_previous_filename()
        current_filename = self.get_latest_filename()

        previous_results = self.load_results(previous_filename)
        current_results = self.load_results(current_filename)

        return (
            previous_results,
            current_results,
            previous_filename,
            current_filename,
        )