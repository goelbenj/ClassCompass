import { Box, Grid, Typography } from "@mui/material";

const FindClasses = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh", flexGrow: 1 }}>
      <Grid container xs={4.5} sx={{ display: "inline" }}>
        <Grid container item xs={12} justifyContent="start">
          <Typography fontWeight="bold" fontSize="1.5rem">
            Search Filters
          </Typography>
        </Grid>
        <Grid item xs>
          <Box>JOE MAMA</Box>
        </Grid>
      </Grid>
      <Grid container xs>
        {Array.from(Array(128)).map((_, index) => (
          <Grid item xs={6} height="100px">
            <Typography fontWeight="bold" fontSize="1.5rem">
              COURSE CARD {index}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default FindClasses;
