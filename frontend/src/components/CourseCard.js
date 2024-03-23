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
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={6} key={index}>
      <Card variant="outlined">
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
          {/* <IconButton aria-label="add to your courses">
                  <FavoriteIcon />
                </IconButton> */}
          <Button size="small" variant="outlined" color="secondary">
            Add to Plan
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
    </Grid>
  );
};

export default CourseCard;
