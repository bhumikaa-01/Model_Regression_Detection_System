import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------- Dashboard ---------------- */

export const getLatestReport = async () => {
  const { data } = await api.get("/reports/latest");
  return data;
};

export const getAnalytics = async () => {
  const { data } = await api.get("/analytics");
  return data;
};

/* ---------------- Reports ---------------- */

export const getAllReports = async () => {
  const { data } = await api.get("/reports");
  return data;
};

export const getReportById = async (reportId) => {
  const { data } = await api.get(`/reports/${reportId}`);
  return data;
};

/* ---------------- Evaluation ---------------- */

export const runEvaluation = async (payload) => {
  const { data } = await api.post(
    "/evaluations/run",
    payload
  );

  return data;
};

export default api;