import { useLocation } from "react-router-dom";
import { Divider, Typography, Box, Paper, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewCard from "./ReviewCard";

const CoursePage = () => {
  const { state } = useLocation();
  const courseCard = state;

  const sampleReview = {
    username: "Peter Parker",
    userImage: "PP",
    userPosition: "Senior Analyst",
    reviewText:
      "This is a really cool review for a great course. I really liked a lot of aspects of it and thought it was a great course. I had professor X and he was really cool, it was almost like he could read my mind. This is a really cool review for a great course. I really liked a lot of aspects of it and thought it was a great course. I had professor X and he was really cool, it was almost like he could read my mind.",
    reviewDate: new Date(),
    ratingStars: 5,
  };

  courseCard.reviews = [
    sampleReview,
    sampleReview,
    sampleReview,
    sampleReview,
    sampleReview,
  ];

  return (
    <Paper elevation={2} sx={{ mb: 3, p: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h3"
          textAlign="left"
          sx={{ fontWeight: "bold" }}
        >{`${courseCard.course_code}: ${courseCard.title}`}</Typography>
        <Typography variant="body1" textAlign="left" sx={{ my: 2 }}>
          {courseCard.description}
        </Typography>
        <Box display="flex" alignItems="center">
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            textAlign="left"
            sx={{ fontWeight: "bold" }}
          >{`Term: ${courseCard.term}`}</Typography>
        </Box>
      </Box>
      <Divider sx={{ border: 1, opacity: 0.3 }} />

      {/* Reviews */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" textAlign="left">
          Reviews
        </Typography>
        <Grid container xs px={4} py={4} spacing={2}>
          {courseCard.reviews.map((review, index) => (
            <ReviewCard review={review} index={index} />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default CoursePage;
