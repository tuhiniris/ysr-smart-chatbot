import ChatbotButton from "./components/BackHome";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ImageSearch from "@mui/icons-material/ImageSearch";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RecommendIcon from "@mui/icons-material/Recommend";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CancelIcon from "@mui/icons-material/Cancel";
import CalculateIcon from "@mui/icons-material/Calculate";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { useEffect } from "react";
import { useState } from "react";
import sound from "./blipper.mp3";

const audio = new Audio(sound);

// let audio = new Audio(
//   "blipper.mp3"
// );

const start = async () => {
  await audio.play();
  navigator.vibrate(38);
};

const Options = props => {
  const getIcon = iconName => {
    switch (iconName) {
      case "CaseIcon":
        return (
          <TroubleshootIcon style={{ color: "white", fontSize: "30px" }} />
        );
      case "ToolIcon":
        return <AutoFixHighIcon style={{ color: "white", fontSize: "30px" }} />;
      case "HospitalIcon":
        return <DomainAddIcon style={{ color: "white", fontSize: "30px" }} />;
      case "ScheduleIcon":
        return <ScheduleIcon style={{ color: "white", fontSize: "30px" }} />;
      case "ImageSearch":
        return <ImageSearch style={{ color: "white", fontSize: "30px" }} />;
      case "LightbulbIcon":
        return <LightbulbIcon style={{ color: "white", fontSize: "30px" }} />;
      case "RecommendIcon":
        return <RecommendIcon style={{ color: "white", fontSize: "30px" }} />;
      case "LocalPhoneIcon":
        return <LocalPhoneIcon style={{ color: "white", fontSize: "30px" }} />;

      case "cancel":
        return <CancelIcon style={{ color: "white", fontSize: "30px" }} />;
      case "CalculateIcon":
        return <CalculateIcon style={{ color: "white", fontSize: "30px" }} />;
    }
  };

  return (
    // <Box sx={{ flexGrow: 1 }} mt={3} mb={3}>
    <Grid container columnSpacing={0} rowSpacing={-5}>
      {/* <div className="options"> */}
      {/* <h1 className="options-header">{props.title}</h1> */}
      {/* <div className="options-container"> */}
      {props.options.map(option => {
        return (
          <Grid xs={4} sm={4} md={4} item>
            {/* <Box
                    mt={2}
                    ml={2}
                    backgroundColor="#f7f7f7"
                    sx={{ border: "2px solid #daeffc", borderRadius: "7px" }}
                  > */}
            <Card
              sx={{ scale: "80%" }}
              style={{
                backgroundColor: option.colorcode,
                boxShadow: "2.5px 2.5px 2.5px rgba(30,30,30,0.5)"
              }}
            >
              <CardActionArea
                onClick={() => {
                  start();
                  option.handler();
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {getIcon(option.icon)}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                 {option.name}
                 </Typography> */}
                  {option.name > 20 ? (
                    <Tooltip title={option.name} arrow>
                      <Typography
                        variant="h2"
                        color="white"
                        fontWeight={"600"}
                        fontSize={"15.5px"}
                        marginTop={"5px"}
                        sx={{ flexGrow: 1 }}
                      >
                        {option.name?.slice(0, 15)}...
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="h2"
                      color="white"
                      fontWeight={"600"}
                      fontSize={"15.5px"}
                      marginTop={"5px"}
                      sx={{ flexGrow: 1 }}
                    >
                      {option.name}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Box> */}
          </Grid>
        );
      })}
      {/* </div>
        </div> */}
    </Grid>
    // </Box>
  );
};

export default Options;
