import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Report/Report";
import ReportDetails from "./pages/ReportDetails/ReportDetails";
import History from "./pages/History/History";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";

function App({ mode, toggleTheme }) {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

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
    </>
  );
}

export default App;