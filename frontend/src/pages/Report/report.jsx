import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import MainLayout from "../../components/layout/MainLayout";
import ReportsTable from "../../components/tables/ReportTable";
import PageSkeleton from "../../components/common/PageSkeleton";

import { getAllReports } from "../../services/api";

export default function Reports({
  mode,
  toggleTheme,
}) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [healthFilter, setHealthFilter] = useState("All");

  const [modelFilter, setModelFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // SEARCH
    if (search.trim()) {
      const query = search.toLowerCase();

      filtered = filtered.filter((report) => {
        return (
          report.report_id.toString().includes(query) ||
          report.model?.toLowerCase().includes(query) ||
          report.prompt_name?.toLowerCase().includes(query) ||
          report.dataset_name?.toLowerCase().includes(query)
        );
      });
    }

    // HEALTH FILTER
    if (healthFilter !== "All") {
      filtered = filtered.filter((report) => {
        return report.health_status.includes(healthFilter);
      });
    }

    // MODEL FILTER
    if (modelFilter !== "All") {
      filtered = filtered.filter(
        (report) => report.model === modelFilter
      );
    }

    // SORTING
    switch (sortBy) {
      case "Newest":
        filtered.sort(
          (a, b) =>
            new Date(b.timestamp) -
            new Date(a.timestamp)
        );
        break;

      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.timestamp) -
            new Date(b.timestamp)
        );
        break;

      case "Highest Accuracy":
        filtered.sort(
          (a, b) =>
            b.current_accuracy -
            a.current_accuracy
        );
        break;

      case "Lowest Accuracy":
        filtered.sort(
          (a, b) =>
            a.current_accuracy -
            b.current_accuracy
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    reports,
    search,
    healthFilter,
    modelFilter,
    sortBy,
  ]);

  if (loading) {
    return (
      <MainLayout
        mode={mode}
        toggleTheme={toggleTheme}
      >
        <PageSkeleton />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
    >
      <Box>

        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
        >
          Evaluation Reports
        </Typography>

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          mb={3}
        >
          <TextField
            fullWidth
            placeholder="Search Report ID, Model, Prompt or Dataset..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>
              Health
            </InputLabel>

            <Select
              value={healthFilter}
              label="Health"
              onChange={(e) =>
                setHealthFilter(e.target.value)
              }
            >
              <MenuItem value="All">
                All
              </MenuItem>

              <MenuItem value="Improved">
                Improved
              </MenuItem>

              <MenuItem value="Regression">
                Regression
              </MenuItem>

              <MenuItem value="No Significant Change">
                No Significant Change
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>
              Model
            </InputLabel>

            <Select
              value={modelFilter}
              label="Model"
              onChange={(e) =>
                setModelFilter(e.target.value)
              }
            >
              <MenuItem value="All">
                All
              </MenuItem>

              {[
                ...new Set(
                  reports.map(
                    (report) => report.model
                  )
                ),
              ].map((model) => (
                <MenuItem
                  key={model}
                  value={model}
                >
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>
              Sort
            </InputLabel>

            <Select
              value={sortBy}
              label="Sort"
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <MenuItem value="Newest">
                Newest
              </MenuItem>

              <MenuItem value="Oldest">
                Oldest
              </MenuItem>

              <MenuItem value="Highest Accuracy">
                Highest Accuracy
              </MenuItem>

              <MenuItem value="Lowest Accuracy">
                Lowest Accuracy
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <ReportsTable
          reports={filteredReports}
        />

      </Box>
    </MainLayout>
  );
}