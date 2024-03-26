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
        api.getUserProfile(auth.currentUser.uid).then(async (result) => {
          // Build course list
          const courses = result.data.courses;
          let courseCardResults = [];
          for (let course_code of courses) {
            const result = await api.getCourseCard(course_code);
            courseCardResults.push(result.data);
          }
          setCourseCards(courseCardResults);
        });
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid container xs bgcolor="#a1b3c3" px={8} py={4} spacing={0}>
        {courseCards.map((courseCard, index) => (
          <CourseCard courseCard={courseCard} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};

export default YourClasses;
