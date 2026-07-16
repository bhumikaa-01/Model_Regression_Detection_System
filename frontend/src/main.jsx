import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import {
  lightTheme,
  darkTheme,
} from "./theme/theme";

import App from "./App";

import "./index.css";

function Root() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const theme = useMemo(() => {
    return mode === "light"
      ? lightTheme
      : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    const newMode =
      mode === "light" ? "dark" : "light";

    setMode(newMode);

    localStorage.setItem(
      "theme",
      newMode
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <App
          mode={mode}
          toggleTheme={toggleTheme}
        />
      </BrowserRouter>

    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);