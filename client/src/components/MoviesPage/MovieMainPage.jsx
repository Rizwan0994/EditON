import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import MovieCardPage from "./MovieCardPage";
import axios from 'axios';

export const MovieMainPage = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${import.meta.env.VITE_NODE_API}usersVideos`)
      .then((response) => {
         // Filter out users with no videos
         const usersWithVideos = response.data.filter(user => user.videos.length > 0);
         setMovieData(usersWithVideos);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Grid sx={{ backgroundColor: "#fff", p: 6 }} container spacing={2}>
      {movieData.map((userData) => (
        <Grid
          key={userData.id} // Use the user's ID as the key
          item
          xs={12}
          sm={4}
          ms={3}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MovieCardPage cardDetails={userData} />
        </Grid>
      ))}
    </Grid>
  );
};
