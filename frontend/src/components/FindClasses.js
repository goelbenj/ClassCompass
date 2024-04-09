import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import CourseCard from "./CourseCard";
import { CourseCardContext } from "../context/course-card-context";

const FindClasses = () => {
  const { courseCardsTemp } = useContext(CourseCardContext);

  return (
    <Grid container component="main" sx={{ height: "100vh", flexGrow: 1 }}>
      <Grid container xs={4.5} sx={{ display: "inline" }}>
        <Grid container item xs={12} justifyContent="start">
          <Typography fontWeight="bold" fontSize="1.5rem">
            Search Filters
          </Typography>
        </Grid>
        <Grid item xs>
          <Box>{"<Search Filters List>"}</Box>
        </Grid>
      </Grid>
      <Grid container xs bgcolor="#a1b3c3" px={8} py={4} spacing={0}>
        {courseCardsTemp.map((courseCard, index) => (
          <CourseCard courseCard={courseCard} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};

export default FindClasses;
