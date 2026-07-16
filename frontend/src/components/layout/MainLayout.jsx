import { Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  mode,
  toggleTheme,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar
          mode={mode}
          toggleTheme={toggleTheme}
        />

        <Box
          component="main"
          sx={{
            p: 4,
            backgroundColor: "background.default",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}