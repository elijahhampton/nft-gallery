import { Card, Skeleton, CardContent, Box, Chip } from "@mui/material";

function NFTDisplaySkeleton() {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 7,
        textAlign: "center",
        maxHeight: 420,
        height: 420,
        m: 2,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "160px" }} />
      <CardContent>
        <Box sx={{ maxHeight: 320 }}>
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ height: "40px", py: 1 }}
          />
          <Chip
            size="small"
            sx={{ minWidth: 140, width: 140, p: 1, mb: 1, fontWeight: "400" }}
            label={""}
          />
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ p: 2, height: 130 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default NFTDisplaySkeleton;
