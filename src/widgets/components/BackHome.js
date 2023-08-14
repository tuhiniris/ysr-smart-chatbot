import React from "react";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import RoofingIcon from "@mui/icons-material/Roofing";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

import sound from "../blipper.mp3";

const audio = new Audio(sound);

const start = async () => {
  await audio.play();
  navigator.vibrate(38);
};

const ChatbotButton = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggleChat = () => {
    props.actionProvider.handleOptions();
  };
  return (
    <>
      <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
        <Fab
          variant="extended"
          sx={{}}
          color="black"
          size="small"
          aria-label="add"
        >
          <IconButton
            sx={{}}
            onClick={() => {
              start();
              handleToggleChat();
            }}
          >
            <Typography sx={{ mt: 0.0, mr: 1, color: "black" }}>
              Main Menu
            </Typography>
            <RoofingIcon sx={{ color: "green" }} />
          </IconButton>
        </Fab>
      </Grid>
    </>
  );
};
export default ChatbotButton;
