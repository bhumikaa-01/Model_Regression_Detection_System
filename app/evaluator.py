from app.classifier import EmailClassifier
from app.dataset_loader import load_dataset
from app.metrics import (
    calculate_category_accuracy,
    calculate_overall_accuracy,
)


class Evaluator:
    """
    Runs evaluation on the entire golden dataset.
    """

    def __init__(self):
        self.classifier = EmailClassifier()

    def evaluate(self, sample_size=None):

        # Load dataset
        dataset = load_dataset()

        # Use only a subset during development
        if sample_size is not None:
            dataset = dataset[:sample_size]

        results = []

        print(f"\nEvaluating {len(dataset)} test cases...\n")

        # Evaluate each test case
        for test_case in dataset:

            print(f"Processing {test_case.id}...")

            prediction = self.classifier.classify(test_case.email)

            # Handle failed API response
            if prediction is None:

                print(f"ERROR: {test_case.id} could not be classified.\n")

                results.append(
                    {
                        "id": test_case.id,
                        "expected": test_case.expected_category,
                        "predicted": None,
                        "correct": False,
                    }
                )

                continue

            print(prediction)

            is_correct = calculate_category_accuracy(
                test_case.expected_category,
                prediction.category,
            )

            result = {
                "id": test_case.id,
                "expected": test_case.expected_category,
                "predicted": prediction.category,
                "correct": is_correct,
            }

            results.append(result)

            status = "PASS" if is_correct else "FAIL"

            print(
                f"{status} | "
                f"{test_case.id} | "
                f"Expected: {test_case.expected_category} | "
                f"Predicted: {prediction.category}\n"
            )

        # -------------------------------
        # Evaluation Summary
        # -------------------------------

        total_cases = len(results)

        passed = sum(result["correct"] for result in results)

        failed = total_cases - passed

        accuracy = calculate_overall_accuracy(results)

        print("\n" + "=" * 45)
        print("          Evaluation Summary")
        print("=" * 45)
        print(f"Total Test Cases : {total_cases}")
        print(f"Passed           : {passed}")
        print(f"Failed           : {failed}")
        print(f"Accuracy         : {accuracy:.2f}%")
        print("=" * 45)

        return results