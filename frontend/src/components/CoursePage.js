import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const CoursePage = () => {
  const { state } = useLocation();
  const courseCard = state;

  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <Box>{`${courseCard.course_code}: ${courseCard.title}`}</Box>
    </Paper>
  );
};

export default CoursePage;
