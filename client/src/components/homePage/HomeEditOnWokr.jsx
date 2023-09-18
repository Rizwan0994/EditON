import { Box, Typography, Button } from "@mui/material";
import EditOnWorksVideo from "../Video/video.mp4";
import ReactPlayer from "react-player";

import React from "react";
const EditonWork = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          m: "16px 0px",
          color: "#212529",
          fontFamily: "Noto Sans,sans-serif",
          fontSize: "26px",
        }}
      >
        Find out how Viedit works
      </Typography>

      <ReactPlayer
        url="https://www.youtube.com/watch?v=T8LdferdIPA"
        height="405px"
        width="720px"
        controls={true}
      />
      {/* <img
        height="405px"
        width="720px"
        srcSet="https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=640x360 320w, https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=640x360 640w, https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=960x540 960w, https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=1280x720 1280w, https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=1920x1080 1920w, https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=1920x1080 3840w"
        src="https://embed-ssl.wistia.com/deliveries/cd4ae2258323d98176a4d77daf9ee52a57d85840.webp?image_crop_resized=960x540"
      /> */}

      <Button
        variant="contained"
        sx={{
          m: "20px 0px",
          fontSize: "20px",
          pl: "0px",
          pr: "0px",
          width: "400px",
          height: "47px",
          alignSelf: "center",
          textTransform: "capitalize",
        }}
      >
        More on how EditON works
      </Button>
    </Box>
  );
};

export default EditonWork;
