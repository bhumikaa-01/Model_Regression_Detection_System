import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Reports",
    icon: <DescriptionIcon />,
  },
  {
    text: "History",
    icon: <HistoryIcon />,
  },
  {
    text: "Analytics",
    icon: <InsightsIcon />,
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
  },
];

export default function Sidebar() {
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
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 3,
                py: 1.4,
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
              />
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