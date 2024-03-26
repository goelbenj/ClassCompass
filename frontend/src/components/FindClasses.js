import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../helpers/API";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

const FindClasses = () => {
  const navigate = useNavigate();
  const [courseCards, setCourseCards] = useState([]);

  useEffect(() => {
    api.getAllCourses().then((result) => {
      if (result.result === "SUCCESSFUL") {
        const courses = Object.values(result.data);
        setCourseCards(courses);
      } else {
        alert("FAILED TO GET ALL COURSES");
      }
    });
  }, [navigate]);

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
      <Grid container xs bgcolor="#a1b3c3" px={8} py={4} spacing={0}>
        {courseCards.map((courseCard, index) => (
          <CourseCard courseCard={courseCard} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};

export default FindClasses;
