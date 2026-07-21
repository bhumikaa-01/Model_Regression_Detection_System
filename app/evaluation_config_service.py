from pathlib import Path
import yaml


class EvaluationConfigService:
    """
    Provides configuration required by the evaluation UI.
    """

    DATASET_CATALOG = Path("datasets") / "catalog.yaml"

    def __init__(self):
        self._catalog = self._load_catalog()

    def _load_catalog(self):
        with open(self.DATASET_CATALOG, "r", encoding="utf-8") as file:
            return yaml.safe_load(file)

    def get_models(self):
        # Later these can come from models.yaml
        return [
            {
                "id": "gemini-2.5-flash",
                "name": "Gemini 2.5 Flash",
            },
            {
                "id": "gemini-2.5-pro",
                "name": "Gemini 2.5 Pro",
            },
        ]

    def get_prompt_versions(self):
        # Later these can come from the prompts folder
        return [
            {
                "id": "v1",
                "name": "Version 1",
            },
            {
                "id": "v2",
                "name": "Version 2",
            },
        ]

    def get_datasets(self):
        return self._catalog["datasets"]

    def get_default_dataset(self):
        for dataset in self._catalog["datasets"]:
            if dataset.get("default", False):
                return dataset["id"]

        return self._catalog["datasets"][0]["id"]

    def get_config(self):
        return {
            "models": self.get_models(),
            "prompt_versions": self.get_prompt_versions(),
            "datasets": self.get_datasets(),
            "defaults": {
                "model": self.get_models()[0]["id"],
                "prompt_version": self.get_prompt_versions()[0]["id"],
                "dataset": self.get_default_dataset(),
            },
        }