import json
from pathlib import Path

from app.dataset_models import GoldenTestCase


def load_dataset(dataset_name="golden_dataset_v1.json"):
    """
    Load any golden dataset by filename.

    Example:
        load_dataset("golden_dataset_dev.json")
        load_dataset("golden_dataset_v1.json")
    """

    dataset_path = Path("datasets") / dataset_name

    with open(dataset_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return [GoldenTestCase(**item) for item in data]