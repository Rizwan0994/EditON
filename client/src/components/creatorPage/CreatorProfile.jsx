import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, Divider, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { json } from "react-router-dom";

export default function CreatorProfile({ cardDetails }) {
  const profileInformation = [
    { id: 1, icon: LanguageIcon, info: cardDetails.country },
    { id: 2, icon: LocationCityIcon, info: cardDetails.city },
    { id: 3, icon: PersonAddIcon, info: "Joined in June 2019" },
    { id: 4, icon: TranslateIcon, info: cardDetails.language },
  ];
  return (
    <Card
      sx={{
        p: "10px",
        maxWidth: 400,
        borderRadius: "12px",
        border: "1px solid #ced4da",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 400 }}
        image="https://d1puzd1182zmjc.cloudfront.net/h/TimonHartman.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography
          fontSize="28px"
          color="#212529"
          margin="8px 0px"
          variant="h5"
          align="center"
        >
          {cardDetails.name}
        </Typography>
        <Button
          sx={{
            backgroundColor: "#198754",
            fontSize: 16,
            textTransform: "none",
            mb: "16px",
            "&:hover": {
              backgroundColor: "#0e6d3d",
            },
          }}
          fullWidth
          variant="contained"
        >
          Hire
        </Button>

        <Button
          sx={{
            backgroundColor: "#0dcaf0",
            fontSize: 16,
            textTransform: "none",
            mb: "8px",
            "&:hover": {
              backgroundColor: "#0aa8cc",
            },
          }}
          fullWidth
          variant="contained"
          endIcon={<ChatIcon />}
        >
          Chat
        </Button>
        {profileInformation.map((profile, index) => (
          <div>
            <Stack key={profile.id} direction="row" spacing={1} p={1}>
              <profile.icon />
              <Typography flex={1} textAlign="center">
                {profile.info}
              </Typography>
            </Stack>
            <Divider />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
