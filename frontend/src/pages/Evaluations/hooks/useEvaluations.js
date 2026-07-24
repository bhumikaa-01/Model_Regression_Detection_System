import { useMemo, useState } from "react";
import mockEvaluations from "../data/mockEvaluations";

const useEvaluations = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [model, setModel] = useState("all");

  const evaluations = useMemo(() => {
    return mockEvaluations.filter((evaluation) => {
      const matchesSearch =
        evaluation.id.toLowerCase().includes(search.toLowerCase()) ||
        evaluation.project.toLowerCase().includes(search.toLowerCase()) ||
        evaluation.model.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || evaluation.status === status;

      const matchesModel =
        model === "all" || evaluation.model === model;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesModel
      );
    });
  }, [search, status, model]);

  const statistics = useMemo(() => {
    if (!evaluations.length) {
      return {
        totalEvaluations: 0,
        averageAccuracy: 0,
        totalRegressions: 0,
        averageExecutionTime: 0,
      };
    }

    const totalEvaluations = evaluations.length;

    const averageAccuracy =
      evaluations.reduce(
        (sum, item) => sum + item.accuracy,
        0
      ) / totalEvaluations;

    const totalRegressions = evaluations.reduce(
      (sum, item) => sum + item.regressions,
      0
    );

    const averageExecutionTime =
      evaluations.reduce(
        (sum, item) => sum + item.executionTime,
        0
      ) / totalEvaluations;

    return {
      totalEvaluations,
      averageAccuracy: Number(
        averageAccuracy.toFixed(1)
      ),
      totalRegressions,
      averageExecutionTime: Number(
        averageExecutionTime.toFixed(0)
      ),
    };
  }, [evaluations]);

  return {
    evaluations,
    statistics,

    search,
    status,
    model,

    setSearch,
    setStatus,
    setModel,
  };
};

export default useEvaluations;