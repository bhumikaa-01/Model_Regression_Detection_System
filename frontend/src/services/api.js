import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export const getLatestReport = async () => {
  const response = await api.get("/reports/latest");
  return response.data;
};

export default api;