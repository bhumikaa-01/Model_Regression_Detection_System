import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";

export default function Settings({
  mode,
  toggleTheme,
})  {
  return (
    <MainLayout
  mode={mode}
  toggleTheme={toggleTheme}
>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Settings
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            gutterBottom
          >
            Project Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>

            <Typography>
              <strong>Model</strong> : Gemini 2.5 Flash
            </Typography>

            <Typography>
              <strong>Prompt</strong> : Customer Email Classifier
            </Typography>

            <Typography>
              <strong>Prompt Version</strong> : v1
            </Typography>

            <Typography>
              <strong>Dataset</strong> : Golden Dataset
            </Typography>

            <Typography>
              <strong>Dataset Version</strong> : v1
            </Typography>

            <Typography>
              <strong>Backend</strong> : FastAPI
            </Typography>

            <Typography>
              <strong>Frontend</strong> : React + Material UI
            </Typography>

          </Stack>

        </CardContent>
      </Card>

    </MainLayout>
  );
}