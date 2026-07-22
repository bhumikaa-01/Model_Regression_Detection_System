import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= Dashboard ================= */

export const getLatestReport = async () => {
  const response = await api.get("/reports/latest");

  // FastAPI returns the ReportResponse directly
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/analytics");

  // Analytics endpoint returns a wrapper
  return response.data.data;
};

/* ================= Reports ================= */

export const getAllReports = async () => {
  const response = await api.get("/reports");

  // FastAPI returns List[ReportResponse]
  return response.data;
};

export const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`);

  // FastAPI returns ReportResponse directly
  return response.data;
};

/* ================= Evaluation ================= */

export const getEvaluationConfig = async () => {
  const response = await api.get("/evaluations/config");

  return response.data.data;
};

export const runEvaluation = async ({
  model,
  prompt_version,
  dataset,
}) => {
  const response = await api.post("/evaluations/run", {
    model,
    prompt_version,
    dataset,
  });

  return response.data.data;
};

/* ================= Error Interceptor ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;