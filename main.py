import time

from app.config import load_prompt_config, load_dataset_config
from app.result_loader import ResultLoader
from app.regression_detector import RegressionDetector
from app.report_manager import ReportManager


def main():
    # ==========================================================
    # Start execution timer
    # ==========================================================

    start_time = time.perf_counter()

    # ==========================================================
    # Load configurations
    # ==========================================================

    llm_config = load_prompt_config()
    dataset_config = load_dataset_config()

    # ==========================================================
    # Load latest evaluation results
    # ==========================================================

    loader = ResultLoader()

    (
        previous,
        current,
        previous_filename,
        current_filename,
    ) = loader.get_latest_results()

    print("\nComparing Evaluation Runs")
    print("-" * 35)
    print(f"Previous : {previous_filename}")
    print(f"Current  : {current_filename}")

    # ==========================================================
    # Compare runs
    # ==========================================================

    detector = RegressionDetector()

    comparison = detector.compare_runs(previous, current)

    # ==========================================================
    # Generate summary
    # ==========================================================

    summary = detector.generate_summary(comparison)

    # ==========================================================
    # Calculate execution time
    # ==========================================================

    execution_time = time.perf_counter() - start_time

    # ==========================================================
    # Save regression report
    # ==========================================================

    report_manager = ReportManager()

    report_path = report_manager.save_report(
        summary=summary,
        model_name=llm_config.model,
        prompt_name=llm_config.name,
        prompt_version=llm_config.version,
        dataset_name=dataset_config.name,
        dataset_version=dataset_config.version,
        previous_evaluation=previous_filename,
        current_evaluation=current_filename,
        execution_time=execution_time,
    )

    # ==========================================================
    # Print Report
    # ==========================================================

    print("\n" + "=" * 65)
    print("                    MODEL REGRESSION REPORT")
    print("=" * 65)

    print(f"Total Test Cases  : {summary['total_cases']}")
    print(f"Previous Accuracy : {summary['previous_accuracy']:.2f}%")
    print(f"Current Accuracy  : {summary['current_accuracy']:.2f}%")
    print(f"Accuracy Delta    : {summary['accuracy_delta']:+.2f}%")
    print(f"Model Status      : {summary['health_status']}")
    print(f"Recommendation    : {summary['deployment_recommendation']}")

    print("\n" + "-" * 65)

    print(f"Regressions       : {len(summary['regressions'])}")
    print(f"Improvements      : {len(summary['improvements'])}")
    print(f"Unchanged Passes  : {len(summary['unchanged_passes'])}")
    print(f"Still Failing     : {len(summary['still_failing'])}")

    print("=" * 65)

    # ==========================================================
    # Regressions
    # ==========================================================

    print("\n🔴 REGRESSIONS\n")

    if not summary["regressions"]:
        print("No regressions detected.\n")
    else:
        for item in summary["regressions"]:
            print(f"✗ Test Case : {item['id']}")
            print(f"  Expected  : {item['expected']}")
            print(f"  Previous  : {item['previous_prediction']}")
            print(f"  Current   : {item['current_prediction']}")
            print()

    # ==========================================================
    # Improvements
    # ==========================================================

    print("🟢 IMPROVEMENTS\n")

    if not summary["improvements"]:
        print("No improvements detected.\n")
    else:
        for item in summary["improvements"]:
            print(f"✓ Test Case : {item['id']}")
            print(f"  Expected  : {item['expected']}")
            print(f"  Previous  : {item['previous_prediction']}")
            print(f"  Current   : {item['current_prediction']}")
            print()

    print("=" * 65)

    # ==========================================================
    # Footer
    # ==========================================================

    print(f"\nExecution Time    : {execution_time:.4f} seconds")

    print(f"\nRegression report saved to:")
    print(report_path)


if __name__ == "__main__":
    main()