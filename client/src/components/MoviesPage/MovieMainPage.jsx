import { Grid } from "@mui/material";
import MovieCardPage from "./MovieCardPage";

export const MovieMainPage = () => {
  const movieArray = [
    {
      id: 1,
      name: "Michael Lukes",
      title: "Michael Lukes - Life In A Bubble (Official Video)",
    },
    { id: 2, title: "Muhammad Rizwan" },
    { id: 3, title: "Muhammad Talha" },
    { id: 4, title: "Ali Ahmad" },
    { id: 5, title: "Nawaz Ahmad" },
    { id: 6, title: "Baber Azam" },
    { id: 7, title: "Fakhar Zaman" },
    { id: 8, title: "Shaheen Shah Afridi" },
    { id: 9, title: "Muhammad Rizwan" },
    { id: 10, title: "Muhammad Saqlain Mushtaq" },
    { id: 11, title: "Saeed Anwar" },
    { id: 12, title: "Saud Shakeel" },
  ];
  return (
    <Grid sx={{ backgroundColor: "#fff", p: 6 }} container spacing={2}>
      {movieArray.map((cardDetails, index) => (
        <Grid
          key={index}
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
          <MovieCardPage cardDetails={cardDetails} />
        </Grid>
      ))}
    </Grid>
  );
};