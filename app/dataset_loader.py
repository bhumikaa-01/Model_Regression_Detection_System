import json

from app.dataset_models import GoldenTestCase


def load_dataset(path="datasets/golden_dataset_v1.json"):

    with open(path, "r", encoding="utf-8") as file:
        data = json.load(file)

    return [GoldenTestCase(**item) for item in data]