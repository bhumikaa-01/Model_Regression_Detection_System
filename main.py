from collections import Counter

from app.dataset_loader import load_dataset

dataset = load_dataset()

counter = Counter(case.expected_category for case in dataset)

print(counter)