import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// Dashboard
export const getLatestReport = async () => {
  const response = await api.get("/reports/latest");
  return response.data;
};

// Reports List
export const getAllReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

// Report Details
export const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`);
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data;
};

// Run Evaluation
export const runEvaluation = async (payload) => {
  const response = await api.post("/evaluations/run", payload);
  return response.data;
};

export default api;