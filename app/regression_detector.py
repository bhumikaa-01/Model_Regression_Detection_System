class RegressionStatus:
    REGRESSION = "REGRESSION"
    IMPROVEMENT = "IMPROVEMENT"
    UNCHANGED_PASS = "UNCHANGED_PASS"
    STILL_FAILING = "STILL_FAILING"


class ModelHealth:
    IMPROVED = "IMPROVED"
    REGRESSION = "REGRESSION"
    STABLE = "STABLE"


class DeploymentRecommendation:
    SAFE_TO_DEPLOY = "SAFE_TO_DEPLOY"
    DO_NOT_DEPLOY = "DO_NOT_DEPLOY"
    MANUAL_REVIEW = "MANUAL_REVIEW"


class RegressionDetector:
    """
    Compares two evaluation runs and detects
    regressions, improvements, and overall model health.
    """

    def compare_runs(self, previous_results, current_results):
        """
        Compare two evaluation reports.

        Matching is done using the test case ID instead
        of relying on list ordering.
        """

        previous_lookup = {
            item["id"]: item
            for item in previous_results
        }

        current_lookup = {
            item["id"]: item
            for item in current_results
        }

        if set(previous_lookup.keys()) != set(current_lookup.keys()):
            raise ValueError(
                "Previous and current evaluation reports contain different test cases."
            )

        comparison = []

        for test_case_id in sorted(previous_lookup.keys()):

            previous = previous_lookup[test_case_id]
            current = current_lookup[test_case_id]

            previous_correct = previous["correct"]
            current_correct = current["correct"]

            if previous_correct and current_correct:
                status = RegressionStatus.UNCHANGED_PASS

            elif (not previous_correct) and (not current_correct):
                status = RegressionStatus.STILL_FAILING

            elif previous_correct and (not current_correct):
                status = RegressionStatus.REGRESSION

            else:
                status = RegressionStatus.IMPROVEMENT

            comparison.append(
                {
                    "id": test_case_id,
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
        """
        Generate summary statistics for comparison results.
        """

        regressions = []
        improvements = []
        unchanged_passes = []
        still_failing = []

        previous_pass = 0
        current_pass = 0

        for item in comparison:

            if item["previous_correct"]:
                previous_pass += 1

            if item["current_correct"]:
                current_pass += 1

            if item["status"] == RegressionStatus.REGRESSION:
                regressions.append(item)

            elif item["status"] == RegressionStatus.IMPROVEMENT:
                improvements.append(item)

            elif item["status"] == RegressionStatus.UNCHANGED_PASS:
                unchanged_passes.append(item)

            elif item["status"] == RegressionStatus.STILL_FAILING:
                still_failing.append(item)

        total_cases = len(comparison)

        previous_accuracy = round(
            (previous_pass / total_cases) * 100,
            2,
        )

        current_accuracy = round(
            (current_pass / total_cases) * 100,
            2,
        )

        accuracy_delta = round(
            current_accuracy - previous_accuracy,
            2,
        )

        # --------------------------------------------------
        # Model Health
        # --------------------------------------------------

        if accuracy_delta > 0:
            health_status = ModelHealth.IMPROVED

        elif accuracy_delta < 0:
            health_status = ModelHealth.REGRESSION

        else:
            health_status = ModelHealth.STABLE

        # --------------------------------------------------
        # Deployment Recommendation
        # --------------------------------------------------

        if regressions:
            deployment_recommendation = (
                DeploymentRecommendation.DO_NOT_DEPLOY
            )

        elif accuracy_delta > 0:
            deployment_recommendation = (
                DeploymentRecommendation.SAFE_TO_DEPLOY
            )

        else:
            deployment_recommendation = (
                DeploymentRecommendation.MANUAL_REVIEW
            )

        # --------------------------------------------------
        # Severity
        # --------------------------------------------------

        if accuracy_delta >= 0:
            severity = "NONE"

        elif accuracy_delta > -2:
            severity = "LOW"

        elif accuracy_delta > -5:
            severity = "MEDIUM"

        else:
            severity = "HIGH"

        return {
            "total_cases": total_cases,
            "previous_accuracy": previous_accuracy,
            "current_accuracy": current_accuracy,
            "accuracy_delta": accuracy_delta,
            "health_status": health_status,
            "deployment_recommendation": deployment_recommendation,
            "severity": severity,
            "regression_count": len(regressions),
            "improvement_count": len(improvements),
            "unchanged_pass_count": len(unchanged_passes),
            "still_failing_count": len(still_failing),
            "regressions": regressions,
            "improvements": improvements,
            "unchanged_passes": unchanged_passes,
            "still_failing": still_failing,
        }