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
        transition: "all .3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 40px rgba(0,0,0,.08)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box flex={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={700}
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mt: 2,
                color,
              }}
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          {icon && (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: `${color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,

                "& .MuiSvgIcon-root": {
                  fontSize: 30,
                },
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