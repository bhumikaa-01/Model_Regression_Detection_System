export const mockEvaluationDetails = {
  id: "eval_001",

  overview: {
    model: "GPT-4o",
    provider: "OpenAI",
    dataset: "Golden Dataset v2",
    prompt: "Customer Support Email Classification",
    status: "Passed",
    accuracy: 98.7,
    executionTime: 612,
    totalTests: 250,
    summary:
      "The evaluation completed successfully with excellent overall performance. No significant regressions were detected compared to the previous baseline.",
  },

  metrics: {
    accuracy: 98.7,
    precision: 98.2,
    recall: 97.9,
    executionTime: 612,
    regressions: 0,

    metricSummary: [
      {
        key: 1,
        metric: "Accuracy",
        value: "98.7%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 2,
        metric: "Precision",
        value: "98.2%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 3,
        metric: "Recall",
        value: "97.9%",
        threshold: ">95%",
        status: "Pass",
      },
      {
        key: 4,
        metric: "Latency",
        value: "612 ms",
        threshold: "<700 ms",
        status: "Pass",
      },
      {
        key: 5,
        metric: "Regression",
        value: "0",
        threshold: "0",
        status: "Pass",
      },
    ],
  },

  timeline: [
    {
      title: "Evaluation Started",
      timestamp: "23 Jul 2026 • 10:00 AM",
      status: "completed",
      description:
        "Evaluation job initialized and resources allocated.",
    },
    {
      title: "Dataset Loaded",
      timestamp: "23 Jul 2026 • 10:01 AM",
      status: "completed",
      description:
        "250 evaluation samples loaded successfully.",
    },
    {
      title: "Prompt Executed",
      timestamp: "23 Jul 2026 • 10:02 AM",
      status: "completed",
      description:
        "Inference completed for all evaluation samples.",
    },
    {
      title: "Metrics Computed",
      timestamp: "23 Jul 2026 • 10:03 AM",
      status: "completed",
      description:
        "Accuracy, precision, recall and latency calculated.",
    },
    {
      title: "Regression Analysis",
      timestamp: "23 Jul 2026 • 10:03 AM",
      status: "completed",
      description:
        "No regressions detected against baseline.",
    },
    {
      title: "Evaluation Finished",
      timestamp: "23 Jul 2026 • 10:04 AM",
      status: "completed",
      description:
        "Evaluation report generated successfully.",
    },
  ],

  logs: [
    {
      time: "10:00:03",
      level: "info",
      component: "Evaluator",
      message: "Evaluation initialized.",
    },
    {
      time: "10:00:11",
      level: "success",
      component: "Dataset Loader",
      message: "250 test cases loaded successfully.",
    },
    {
      time: "10:01:08",
      level: "success",
      component: "Inference Engine",
      message: "Model inference completed.",
    },
    {
      time: "10:01:45",
      level: "warning",
      component: "Latency Monitor",
      message: "Two requests exceeded 600ms threshold.",
    },
    {
      time: "10:02:04",
      level: "success",
      component: "Regression Engine",
      message: "No regressions detected.",
    },
    {
      time: "10:02:30",
      level: "success",
      component: "Report Generator",
      message: "Evaluation report generated successfully.",
    },
  ],

  report: {
    project: "Email Classification",
    model: "GPT-4o",
    dataset: "Golden Dataset v2",
    promptVersion: "v2.1",
    executionTime: "612 ms",
    accuracy: 98.7,
    regressions: 0,
    status: "Passed",

    summary:
      "The evaluation achieved outstanding performance across all tracked metrics. The model exceeded every configured threshold while maintaining low latency.",

    strengths: [
      "Excellent classification accuracy.",
      "Stable response latency.",
      "No regression against previous version.",
      "High precision across all categories.",
    ],

    recommendations: [
      "Increase evaluation dataset size.",
      "Include more edge-case prompts.",
      "Monitor latency during peak traffic.",
    ],

    verdict:
      "The evaluated model is production-ready and may safely replace the previous deployment.",
  },

  testCases: [
    {
      id: "TC-001",
      input: "Reset my password please.",
      expected: "Account",
      actual: "Account",
      score: 100,
      status: "Passed",
    },
    {
      id: "TC-002",
      input: "I was charged twice.",
      expected: "Billing",
      actual: "Billing",
      score: 100,
      status: "Passed",
    },
    {
      id: "TC-003",
      input: "Application crashes after login.",
      expected: "Technical",
      actual: "Technical",
      score: 96,
      status: "Passed",
    },
    {
      id: "TC-004",
      input: "How can I upgrade my plan?",
      expected: "General",
      actual: "General",
      score: 98,
      status: "Passed",
    },
    {
      id: "TC-005",
      input: "Refund has not been received.",
      expected: "Billing",
      actual: "Billing",
      score: 97,
      status: "Passed",
    },
    {
      id: "TC-006",
      input: "Unable to verify email.",
      expected: "Account",
      actual: "Account",
      score: 99,
      status: "Passed",
    },
    {
      id: "TC-007",
      input: "Dark mode isn't working.",
      expected: "Technical",
      actual: "Technical",
      score: 95,
      status: "Passed",
    },
    {
      id: "TC-008",
      input: "What are your support hours?",
      expected: "General",
      actual: "General",
      score: 100,
      status: "Passed",
    },
  ],
};

export default mockEvaluationDetails;