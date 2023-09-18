import {
  IconButton,
  Input,
  MenuItem,
  Paper,
  Select,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import CreatorPageCard from "./CreatorPageCard";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CreatorMainPage = () => {
  const [movieArray, setMovieArray] = useState([]); // State to store movie data

  useEffect(() => {
    // Fetch data from your backend API when the component mounts
    axios.get(`${import.meta.env.VITE_NODE_API}getCreators`)
      .then(response => {
        setMovieArray(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this runs once on mount
  return (
  <Box>
  <Stack
      elevation={3}
      p={2}
      alignItems="center"
      direction={{ md: "row" }}
      justifyContent="space-between"
    >
      <Paper
        variant="outlined"
        component="form"
        onSubmit={() => {
          console.log("Hello Menu");
        }}
      >
        <Select sx={{ height: "60px", width: "100px" }}>
          <MenuItem onClick={() => console.log("option 1")}>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
          <MenuItem>Option 4</MenuItem>
        </Select>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>
    </Stack>
    <Grid sx={{ backgroundColor: "#fff", p: 6 }} container spacing={2}>
        {movieArray.map((cardDetails, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={4}
            ms={4}
            md={2.4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CreatorPageCard cardDetails={cardDetails} />
          </Grid>
        ))}
      </Grid>
  </Box>
  );
};

export default CreatorMainPage;
