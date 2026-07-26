import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Evaluations from "./pages/Evaluations";
import Regression from "./pages/Regression";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import ReportDetails from "./pages/ReportDetails";
import CompareReports from "./pages/CompareReports";

// =======================
// Projects
// =======================
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Analytics */}
        <Route
          path="analytics"
          element={<Analytics />}
        />

        {/* Projects */}
        <Route
          path="projects"
          element={<Projects />}
        />

        <Route
          path="projects/:id"
          element={<ProjectDetails />}
        />

        {/* Reports */}
        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="reports/:reportId"
          element={<ReportDetails />}
        />

        <Route
          path="compare"
          element={<CompareReports />}
        />

        {/* Evaluations */}
        <Route
          path="evaluations"
          element={<Evaluations />}
        />

        {/* Regression */}
        <Route
          path="regression"
          element={<Regression />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;