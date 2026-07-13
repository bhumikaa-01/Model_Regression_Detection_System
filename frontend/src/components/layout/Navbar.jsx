import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid #ECECEC",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          AI Evaluation Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>

        <Avatar
          sx={{
            ml: 2,
            bgcolor: "#111827",
          }}
        >
          BR
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}