import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar({
  mode,
  toggleTheme,
}) {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          AI Evaluation Dashboard
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Tooltip title="Toggle Theme">
            <IconButton
              onClick={toggleTheme}
              color="inherit"
            >
              {mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Tooltip>

          <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            BR
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}