import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";
import { getAllReports } from "../../services/api";

import HistoryTimeline from "../../components/history/HistoryTimeline";

export default function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <MainLayout>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Evaluation History
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <HistoryTimeline reports={reports} />
      )}
    </MainLayout>
  );
}