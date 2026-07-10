from typing import List


def calculate_category_accuracy(expected: str, predicted: str) -> bool:
    """
    Checks whether the predicted category matches the expected category.

    Args:
        expected (str): Ground truth category.
        predicted (str): Category predicted by the LLM.

    Returns:
        bool: True if the prediction is correct, otherwise False.
    """

    return expected.strip().lower() == predicted.strip().lower()


def calculate_overall_accuracy(results: List[dict]) -> float:
    """
    Calculates the overall accuracy of an evaluation run.

    Args:
        results (List[dict]): List containing evaluation results.

    Returns:
        float: Accuracy percentage.
    """

    if not results:
        return 0.0

    correct = sum(result["correct"] for result in results)

    accuracy = (correct / len(results)) * 100

    return round(accuracy, 2)