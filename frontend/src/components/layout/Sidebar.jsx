import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    text: "Run Evaluation",
    icon: <PlayCircleFilledIcon />,
    path: "/run-evaluation",
  },
  {
    text: "Reports",
    icon: <DescriptionIcon />,
    path: "/reports",
  },
  {
    text: "History",
    icon: <HistoryIcon />,
    path: "/history",
  },
  {
    text: "Analytics",
    icon: <InsightsIcon />,
    path: "/analytics",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 270,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #ECECEC",
        backgroundColor: "#fff",
      }}
    >
      <Box>
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            LLM Regression
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Detection Platform
          </Typography>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 3,
                py: 1.4,
                transition: "all 0.25s ease",

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                },

                "&.Mui-selected .MuiListItemIcon-root": {
                  color: "white",
                },

                "&:hover": {
                  bgcolor: "primary.light",
                  color: "white",
                },

                "&:hover .MuiListItemIcon-root": {
                  color: "white",
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 3 }}>
        <Chip
          color="success"
          label="System Healthy"
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
}
