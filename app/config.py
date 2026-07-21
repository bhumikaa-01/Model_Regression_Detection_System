from pathlib import Path
import yaml

from app.models import PromptConfig, DatasetConfig


DEFAULT_PROMPT_PATH = Path("prompts") / "v1.yaml"
DEFAULT_DATASET_PATH = Path("datasets") / "dataset_config.yaml"


def load_prompt_config(path=DEFAULT_PROMPT_PATH):
    with open(path, "r", encoding="utf-8") as file:
        config = yaml.safe_load(file)

    return PromptConfig(**config)


def load_dataset_config(path=DEFAULT_DATASET_PATH):
    with open(path, "r", encoding="utf-8") as file:
        config = yaml.safe_load(file)

    return DatasetConfig(**config)