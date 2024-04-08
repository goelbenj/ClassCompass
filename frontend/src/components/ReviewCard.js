import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import logo from "../logo.png";

const ReviewCard = ({ review, index }) => {
  return (
    <Grid item xs={4} key={index}>
      <Card variant="elevation" elevation={1}>
        <CardContent
          sx={{
            textAlign: "start",
          }}
        >
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box display="flex" alignItems={"center"}>
              <Avatar
                alt={review.username}
                sx={{ backgroundColor: red["600"], mr: 1 }}
                //   src={review.userImage}
                //   src={logo}
              >
                PP
              </Avatar>
              <Typography fontWeight="bold">{review.username}</Typography>
            </Box>
            <Box>
              <Rating
                name="Review Rating"
                value={review.ratingStars}
                readOnly
                sx={{ color: "secondary.main" }}
              />
              <Typography variant="subtitle2" color="grey" textAlign="right">
                {review?.reviewDate?.toLocaleDateString("en-ca", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle2" color="grey" mt={0.5} mb={1}>
            {review.userPosition}
          </Typography>
          <Typography variant="body2">{review.reviewText}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewCard;
