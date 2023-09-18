import React, { useContext, useEffect, useState } from "react";
import "./Intro.css";
import { getAllVideos } from "../../services/nodeApi";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Loader from "../Loader";
import HomeCarousel from "./HomeCarousel";
// import Pagination from "../Pagination";
import Manu from "./Page";
import Footer from "./HomeFooter";
import Edit from "./EditOnServices";
import Reviews from "./HomeReviews";
import EditonWork from "./HomeEditOnWokr";
import ActionAreaCard from "./Test";
import CreatorMainPage from "../creatorPage/CreatorMainPage";
import Grid from "@mui/material/Unstable_Grid2";
import CreatorPageCard from "../creatorPage/CreatorPageCard";
import MovieCardPage from "../MoviesPage/MovieCardPage";
import { MovieMainPage } from "../MoviesPage/MovieMainPage";
// import Test from "./Test";

const Content = () => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("View all");
  const { handleSetAllVideos, updatedList, allVideos } =
    useContext(VideoContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const response = await getAllVideos();
        const reversedResponse = response.reverse();
        handleSetAllVideos(reversedResponse);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVideos();
  }, [updatedList]);

  const handleViewButton = () => {
    if (banner) {
      setBanner("");
    } else {
      setBanner("class");
    }
    if (name === "View all") {
      setName("View less");
    } else {
      setName("View all");
    }
  };
  const cardArry = [
    { id: 1, name: "Muhammad Bilal" },
    { id: 2, name: "Muhammad Rizwan" },
    { id: 3, name: "Muhammad Talha" },
    { id: 4, name: "Ali Ahmad" },
    { id: 5, name: "Nawaz Ahmad" },
    { id: 6, name: "Baber Azam" },
    { id: 7, name: "Fakhar Zaman" },
    { id: 8, name: "Shaheen Shah Afridi" },
    { id: 9, name: "Muhammad Rizwan" },
    { id: 10, name: "Muhammad Saqlain Mushtaq" },
    { id: 11, name: "Saeed Anwar" },
    { id: 12, name: "Saud Shakeel" },
  ];

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
    <>
      {/* <HomeCarousel /> */}
      {!isLoading ? (
        <div
        // className={`video-content ${
        //   banner ? "relative translate-y-[-125px]" : ""
        // }`}
        >
          {/* <div className="btns">
            <div className="recent">Recent</div>
            <div className="view-all" onClick={handleViewButton}>
              {name}
            </div>
          </div>
          <div className="videos">
            {!banner ? (
              <Pagination
                videos={allVideos.slice(0, 4)}
                source={"home"}
                videosPerLoad={12}
              />
            ) : (
              <Pagination
                videos={allVideos}
                source={"home"}
                videosPerLoad={12}
              />
            )}
          </div> */}

          {/* <div>
            <Manu />
          </div>
          <EditonWork />
          <Edit />
          <Reviews /> */}
          {/* <Test /> */}
          {/* <Footer /> */}

          {/* <Grid sx={{ backgroundColor: "#fff", p: 6 }} container spacing={2}>
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
                {/* <CreatorPageCard cardDetails={cardDetails} /> */}
          {/* <MovieCardPage cardDetails={cardDetails} />
              </Grid>
            ))}
          </Grid> */}
          <MovieMainPage />
          {/* <CreatorMainPage /> */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Content;
