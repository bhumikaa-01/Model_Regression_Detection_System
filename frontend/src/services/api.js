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
  return response.data.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data.data;
};

/* ================= Reports ================= */

export const getAllReports = async () => {
  const response = await api.get("/reports");
  return response.data.data;
};

export const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`);
  return response.data.data;
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