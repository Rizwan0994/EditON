import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Stack } from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";

export default function MovieCardPage({ cardDetails }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: "12px",
        border: "1px solid #ced4da",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 200, width: 393, "&:hover": { filter: "none" } }}
          image="https://i.vimeocdn.com/video/1712142913-d02062aadf7f447c092c60b674b08e12eeb2efaa1670a319c739b3a36df4d494-d_640.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {cardDetails.title}
          </Typography>
          <Stack direction="row" spacing={1} p={1} alignItems="center">
            <Avatar
              alt={cardDetails.name}
              variant="square"
              src="https://d1puzd1182zmjc.cloudfront.net/h/TimonHartman.jpg"
              sx={{ borderRadius: "0px 7px", height: 60, width: 60 }}
            />
            <Typography>by {cardDetails.name}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
