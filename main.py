from app.evaluator import Evaluator
from app.report import EvaluationReport


def main():

    evaluator = Evaluator()

    results = evaluator.evaluate(sample_size=5)

    report = EvaluationReport()

    report.save_results(results)


if __name__ == "__main__":
    main()