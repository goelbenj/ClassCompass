import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import api from "../helpers/API";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <IconButton {...other} sx={{ border: 1, borderColor: "secondary.main" }} />
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CourseCard = ({ courseCard, index }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Add to Plan");
  const [buttonStyle, setButtonStyle] = useState("outlined");
  const [expanded, setExpanded] = useState(false);

  const handleCourseCardClick = () => {
    navigate(`/course/${courseCard.course_code}`, { state: courseCard });
  };

  const handleExpandClick = (event) => {
    setExpanded(!expanded);
    event.stopPropagation();
  };

  const handleAddToPlanClick = (event) => {
    if (auth.currentUser === null) {
      navigate("/login");
      return;
    }

    api
      .addCourseToProfile({
        uid: auth.currentUser.uid,
        course_code: courseCard.course_code,
      })
      .then((result) => {
        if (result.result !== "SUCCESSFUL") {
          alert("Something went wrong. Please try again.");
        } else {
          // Flip text if it was removed or added
          if (buttonStyle === "outlined") {
            setButtonText("Remove from Plan");
            setButtonStyle("contained");
          } else {
            setButtonText("Add to Plan");
            setButtonStyle("outlined");
          }
        }
      });
    event.stopPropagation();
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        // Flip text if it was removed or added
        api.getUserProfile(auth.currentUser.uid).then((result) => {
          const courses = result.data.courses;
          if (courses.includes(courseCard.course_code)) {
            setButtonText("Remove from Plan");
            setButtonStyle("contained");
          } else {
            setButtonText("Add to Plan");
            setButtonStyle("outlined");
          }
        });
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Grid item xs={6} key={index}>
      <Box display="flex" justifyContent="center">
        <Card
          variant="outlined"
          sx={{
            width: "90%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleCourseCardClick}
        >
          <CardContent
            sx={{
              height: "50px",
              textAlign: "start",
            }}
          >
            <Typography fontWeight="bold" fontSize="1.0rem">
              {courseCard.course_code}: {courseCard.title}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              variant={buttonStyle}
              color="secondary"
              onClick={handleAddToPlanClick}
            >
              {buttonText}
            </Button>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon color="secondary" />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ textAlign: "start" }}>
              <Box width="100%" height="1px" bgcolor="black" mb={2}></Box>
              <Typography>{courseCard.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Grid>
  );
};

export default CourseCard;
