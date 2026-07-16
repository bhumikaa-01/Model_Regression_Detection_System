import {
  Box,
  Grid,
  Skeleton,
} from "@mui/material";

export default function PageSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="text"
        width={320}
        height={60}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid
            key={item}
            size={{ xs: 12, md: 4 }}
          >
            <Skeleton
              variant="rounded"
              height={140}
            />
          </Grid>
        ))}
      </Grid>

      <Skeleton
        variant="rounded"
        height={420}
        sx={{ mt: 4 }}
      />
    </Box>
  );
}