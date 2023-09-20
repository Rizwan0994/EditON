import CreatorProfile from "./CreatorProfile";
import { Grid, Stack, Typography, Card, CardContent } from "@mui/material";
import ReactPlayer from "react-player";

export const CreatorProfilePage = () => {
  const videos = [
    { id: 1, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 2, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 3, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 4, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 5, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 6, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 7, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 8, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 9, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 10, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 11, title: "Michael Lukes - Life In A Bubble (Official Video)" },
    { id: 12, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  ];
  return (
    <Grid
      sx={{ backgroundColor: "#fff" }}
      container
      spacing={4}
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <CreatorProfile cardDetails={{ id: 1, name: "Muhammad Bilal" }} />
      </Grid>
      <Grid item>
        <Card sx={{ borderRadius: "12px" }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=T8LdferdIPA"
            height="405px"
            width="720px"
            controls={true}
          />

          <Stack>
            <Typography p={2} fontSize="18px">
              Michael Lukes - Life In A Bubble (Official Video)
            </Typography>
          </Stack>
        </Card>
      </Grid>

      <Grid item>
        <Grid container spacing={1.5} justifyContent="center" p={2}>
          {videos.map((video, index) => (
            <Grid pl={2} key={index} item xs={6} md={4} lg={3}>
              <Card sx={{ borderRadius: "12px" }}>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=T8LdferdIPA"
                  height="220px"
                  width="392px"
                  controls={true}
                />

                <Stack>
                  <Typography p={2} fontSize="18px">
                    {video.title}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
