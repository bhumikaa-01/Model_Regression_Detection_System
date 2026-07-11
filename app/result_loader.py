import json
from pathlib import Path


class ResultLoader:

    def __init__(self):
        self.results_dir = Path("results")

    def load_results(self, filename):

        with open(self.results_dir / filename, "r", encoding="utf-8") as f:
            return json.load(f)

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