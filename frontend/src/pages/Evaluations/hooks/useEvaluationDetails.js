import { useState, useEffect, useCallback, useMemo } from "react";
import mockEvaluationDetails from "../data/mockEvaluationDetails";

const useEvaluationDetails = (evaluationId) => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvaluation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Future API integration
      // const response = await api.get(`/evaluations/${evaluationId}`);
      // setEvaluation(response.data);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setEvaluation({
        ...mockEvaluationDetails,
        id: evaluationId || mockEvaluationDetails.id,
      });
    } catch (err) {
      console.error(err);

      setError("Failed to load evaluation details.");
    } finally {
      setLoading(false);
    }
  }, [evaluationId]);

  useEffect(() => {
    fetchEvaluation();
  }, [fetchEvaluation]);

  const overview = useMemo(() => {
    if (!evaluation) return null;

    return {
      id: evaluation.id,
      status: evaluation.status,
      project: evaluation.project,

      model: evaluation.model,

      prompt: evaluation.prompt,

      dataset: evaluation.dataset,

      execution: evaluation.execution,
    };
  }, [evaluation]);

  const metrics = useMemo(() => {
    return evaluation?.metrics ?? null;
  }, [evaluation]);

  const report = useMemo(() => {
    return evaluation?.report ?? null;
  }, [evaluation]);

  const logs = useMemo(() => {
    return evaluation?.logs ?? [];
  }, [evaluation]);

  const timeline = useMemo(() => {
    return evaluation?.timeline ?? [];
  }, [evaluation]);

  const testCases = useMemo(() => {
    return evaluation?.testCases ?? [];
  }, [evaluation]);

  return {
    evaluation,

    overview,

    metrics,

    report,

    logs,

    timeline,

    testCases,

    loading,

    error,

    refresh: fetchEvaluation,
  };
};

export default useEvaluationDetails;