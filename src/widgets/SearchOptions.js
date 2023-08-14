import React from "react";

import UrlIcon from "../icons/call.svg";
import { Grid } from "@mui/material";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Divider
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ImageSearch from "@mui/icons-material/ImageSearch";
import ChatbotButton from "./components/BackHome";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import sound from "./blipper.mp3";

const audio = new Audio(sound);

const start = async () => {
  await audio.play();
  navigator.vibrate(38);
};

const SearchLink = props => {
  const getIcon = iconName => {
    switch (iconName) {
      case "ScheduleIcon":
        return <ScheduleIcon style={{ color: "white", fontSize: "30px" }} />;
      case "ImageSearch":
        return <ImageSearch style={{ color: "white", fontSize: "30px" }} />;
      case "claims":
        return <LightbulbIcon style={{ color: "white", fontSize: "30px" }} />;
      case "recommend":
        return <RecommendIcon style={{ color: "white", fontSize: "30px" }} />;
      case "phone":
        return <LocalPhoneIcon style={{ color: "white", fontSize: "30px" }} />;

      case "cancel":
        return <CancelIcon style={{ color: "white", fontSize: "30px" }} />;
      case "average":
        return <CalculateIcon style={{ color: "white", fontSize: "30px" }} />;
    }
  };
  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid xs={12} sm={12} md={12} item>
          <Card
            style={{
              backgroundColor: "rgb(175, 140, 19)",
              boxShadow: "2.5px 2.5px 2.5px rgba(30,30,30,0.5)"
            }}
            sx={{ mb: 2 }}
          >
            <CardActionArea
              onClick={() => {
                start();
                props.actionProvider.handleInfoDetail1();
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="white"
                  component="div"
                >
                  <ManageSearchIcon
                    style={{ color: "white", fontSize: "30px" }}
                  />
                </Typography>

                <Typography
                  variant="h2"
                  color="white"
                  fontWeight={"600"}
                  fontSize={"15.5px"}
                  marginTop={"5px"}
                  sx={{ flexGrow: 1 }}
                >
                  Search By District
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Divider />

        <Grid xs={12} sm={12} md={12} item>
          <Card
            style={{
              backgroundColor: "rgb(110, 65, 144)",
              boxShadow: "2.5px 2.5px 2.5px rgba(30,30,30,0.5)"
            }}
          >
            <CardActionArea
              onClick={() => {
                start();
                props.actionProvider.handleInfoDetail2();
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="white"
                  component="div"
                >
                  <TravelExploreIcon
                    style={{ color: "white", fontSize: "30px" }}
                  />
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
      {option.name}
      </Typography> */}

                <Typography
                  variant="h2"
                  color="white"
                  fontWeight={"600"}
                  fontSize={"15.5px"}
                  marginTop={"5px"}
                  sx={{ flexGrow: 1 }}
                >
                  Search By Location
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>{" "}
      <Box sx={{ mt: 2 }}>
        <ChatbotButton {...props} />
      </Box>
    </>
  );
};

export default SearchLink;
