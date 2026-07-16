import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Report/Report";
import ReportDetails from "./pages/ReportDetails/ReportDetails";
import History from "./pages/History/History";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";

function App({ mode, toggleTheme }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />

      <Route
        path="/reports"
        element={
          <Reports
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />

      <Route
        path="/reports/:reportId"
        element={
          <ReportDetails
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />

      <Route
        path="/history"
        element={
          <History
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />

      <Route
        path="/analytics"
        element={
          <Analytics
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />

      <Route
        path="/settings"
        element={
          <Settings
            mode={mode}
            toggleTheme={toggleTheme}
          />
        }
      />
    </Routes>
  );
}

export default App;