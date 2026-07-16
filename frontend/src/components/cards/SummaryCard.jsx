import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function SummaryCard({
  title,
  value,
  subtitle,
  color,
  icon,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: `6px solid ${color}`,
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 12px 30px rgba(0,0,0,0.08)",
          backgroundColor: "action.hover",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              textTransform="uppercase"
              letterSpacing={0.8}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
              color={color}
              sx={{
                mt: 2,
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1.5 }}
            >
              {subtitle}
            </Typography>
          </Box>

          {icon && (
            <Box
              sx={{
                color: color,
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}