import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Test = () => {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Background color with opacity
    padding: "20px",
  };

  const textStyle = {
    color: "rgba(0, 0, 0, 0.7)", // Text color with opacity
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5" style={textStyle}>
          This is a transparent text card.
        </Typography>
        <Typography variant="body2" style={textStyle}>
          You can see through the text to the background.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Test;
