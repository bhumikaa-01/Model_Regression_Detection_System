import {
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  Grid,
} from "@mui/material";

import { motion } from "motion/react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#F8FBFF 0%,#EEF4FF 45%,#FFFFFF 100%)",
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.05)",
        }}
      >
        {/* Animated Background */}

        <Box
          component={motion.div}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,#2563EB25,transparent 70%)",
            top: -120,
            right: -70,
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />

        <Box
          component={motion.div}
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,#7C3AED25,transparent 70%)",
            bottom: -80,
            left: -60,
            filter: "blur(45px)",
            zIndex: 0,
          }}
        />

        <Grid
          container
          spacing={5}
          alignItems="center"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT */}

          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
              >
                <Chip
                  icon={<VerifiedIcon />}
                  label="Production Ready"
                  color="success"
                />

                <Chip
                  icon={<AssessmentIcon />}
                  label="Regression Detection"
                  color="primary"
                />

                <Chip
                  icon={<AutoGraphIcon />}
                  label="LLM Evaluation"
                  color="secondary"
                />
              </Stack>

              <Typography
                variant="overline"
                color="primary"
                fontWeight={700}
                letterSpacing={2}
              >
                AI QUALITY ASSURANCE PLATFORM
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: {
                    xs: "2.7rem",
                    md: "4.3rem",
                  },
                  lineHeight: 1.05,
                  background:
                    "linear-gradient(90deg,#2563EB,#7C3AED,#9333EA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Monitor.
                <br />
                Evaluate.
                <br />
                Deploy.
              </Typography>

              <Typography
                sx={{
                  maxWidth: 720,
                  color: "text.secondary",
                  fontSize: "1.08rem",
                  lineHeight: 1.8,
                }}
              >
                Continuously evaluate Large Language
                Models, compare historical runs,
                detect regressions, visualize quality
                trends and confidently deploy
                production-grade AI systems.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Button
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  variant="contained"
                  size="large"
                  onClick={() =>
                    navigate("/reports")
                  }
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  View Reports
                </Button>

                <Button
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/analytics")
                  }
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  View Analytics
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* RIGHT */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              component={motion.div}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              elevation={0}
              sx={{
                borderRadius: 5,
                p: 4,
                background:
                  "rgba(255,255,255,0.65)",
                backdropFilter: "blur(18px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={4}>
                <Box>
                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >
                    Platform
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    AI Evaluation
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <SpeedIcon
                    color="primary"
                    fontSize="large"
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      Fast Evaluation
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Automated regression detection
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <TimelineIcon
                    color="success"
                    fontSize="large"
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      Historical Tracking
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Compare every evaluation run
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <PsychologyIcon
                    color="secondary"
                    fontSize="large"
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      LLM Monitoring
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Production-grade quality
                      assurance
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
}