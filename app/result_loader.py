import json
from pathlib import Path


class ResultLoader:
    """
    Handles saving and loading evaluation results.
    """

    def __init__(self):
        self.results_dir = Path("results")
        self.results_dir.mkdir(exist_ok=True)

    def _next_evaluation_number(self):
        files = sorted(
            self.results_dir.glob("evaluation_*.json")
        )

        if not files:
            return 1

        last = files[-1].stem.split("_")[-1]

        return int(last) + 1

    def save_results(self, results):
        """
        Save a new evaluation result.
        """

        number = self._next_evaluation_number()

        filename = (
            self.results_dir /
            f"evaluation_{number:03}.json"
        )

        with open(filename, "w", encoding="utf-8") as file:
            json.dump(
                results,
                file,
                indent=4,
                ensure_ascii=False,
            )

        return filename.name

    def load_results(self, filename):

        with open(
            self.results_dir / filename,
            "r",
            encoding="utf-8",
        ) as file:

            return json.load(file)

    def get_latest_results(self):

        files = sorted(
            self.results_dir.glob("evaluation_*.json")
        )

        if len(files) < 2:
            raise ValueError(
                "Need at least two evaluation files."
            )

        previous = files[-2]
        current = files[-1]

        return (
            self.load_results(previous.name),
            self.load_results(current.name),
            previous.name,
            current.name,
        )