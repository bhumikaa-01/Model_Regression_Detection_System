class RegressionDetector:
    """
    Detects regressions and improvements
    between two evaluation runs.
    """

    def compare_runs(self, previous_results, current_results):

        comparison = []

        for previous, current in zip(previous_results, current_results):

            previous_correct = previous["correct"]
            current_correct = current["correct"]

            if previous_correct and current_correct:
                status = "UNCHANGED_PASS"

            elif (not previous_correct) and (not current_correct):
                status = "STILL_FAILING"

            elif previous_correct and (not current_correct):
                status = "REGRESSION"

            else:
                status = "IMPROVEMENT"

            comparison.append(
                {
                    "id": previous["id"],
                    "expected": previous["expected"],
                    "previous_prediction": previous["predicted"],
                    "current_prediction": current["predicted"],
                    "previous_correct": previous_correct,
                    "current_correct": current_correct,
                    "status": status,
                }
            )

        return comparison

    def generate_summary(self, comparison):

        regressions = []
        improvements = []
        unchanged = []
        still_failing = []

        previous_pass = 0
        current_pass = 0

        for item in comparison:

            if item["previous_correct"]:
                previous_pass += 1

            if item["current_correct"]:
                current_pass += 1

            if item["status"] == "REGRESSION":
                regressions.append(item)

            elif item["status"] == "IMPROVEMENT":
                improvements.append(item)

            elif item["status"] == "UNCHANGED_PASS":
                unchanged.append(item)

            elif item["status"] == "STILL_FAILING":
                still_failing.append(item)

        total = len(comparison)

        previous_accuracy = (previous_pass / total) * 100
        current_accuracy = (current_pass / total) * 100

        accuracy_delta = current_accuracy - previous_accuracy

        # ---------------------------------------
        # Overall Model Health
        # ---------------------------------------

        if accuracy_delta > 0:
            health_status = "🟢 Model Improved"

        elif accuracy_delta < 0:
            health_status = "🔴 Regression Detected"

        else:
            health_status = "🟡 No Significant Change"

        # ---------------------------------------
        # Deployment Recommendation
        # ---------------------------------------

        if len(regressions) > 0:
            deployment_recommendation = "❌ Do Not Deploy"

        elif accuracy_delta > 0:
            deployment_recommendation = "✅ Safe to Deploy"

        else:
            deployment_recommendation = "⚠️ Manual Review Recommended"

        return {
            "total_cases": total,
            "previous_accuracy": previous_accuracy,
            "current_accuracy": current_accuracy,
            "accuracy_delta": accuracy_delta,
            "health_status": health_status,
            "deployment_recommendation": deployment_recommendation,
            "regressions": regressions,
            "improvements": improvements,
            "unchanged_passes": unchanged,
            "still_failing": still_failing,
        }