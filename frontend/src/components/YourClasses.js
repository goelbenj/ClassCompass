import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../helpers/API";
import { getAuth } from "firebase/auth";
import CourseCard from "./CourseCard";

const YourClasses = () => {
  const auth = getAuth();
  const [courseCards, setCourseCards] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        // Get user's courses
        api.getUserProfile(auth.currentUser.uid).then((result) => {
          // Build course list
          const courses = result.data.courses;
          let courseList = [];
          var promise = new Promise((resolve, reject) => {
            courses.forEach((x, index, array) => {
              api.getCourseCard(x).then((result) => {
                courseList.push(result.data);
                if (index === array.length - 1) resolve();
              });
            });
          });
          promise.then(() => {
            setCourseCards(courseList);
          });
        });
      }
    });
    return () => unregisterAuthObserver();
  }, []);

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
      <Grid container xs bgcolor="#a1b3c3" px={8} py={4} spacing={3}>
        {courseCards.map((courseCard, index) => (
          <CourseCard courseCard={courseCard} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};

export default YourClasses;
