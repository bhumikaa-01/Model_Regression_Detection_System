import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Report/Report";
import ReportDetails from "./pages/ReportDetails/ReportDetails";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />

      <Route
        path="/reports/:reportId"
        element={<ReportDetails />}
      />

    </Routes>
  );
}

export default App;