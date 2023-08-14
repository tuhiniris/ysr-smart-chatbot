import React, { useRef, useState, useEffect } from "react";
// import {Button, Card, CardContent, IconButton, makeStyles} from '@material-ui/core'
// import IconButton from '@mui/material/IconButton';
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Button, Card, CardContent, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Chatbot from "react-chatbot-kit";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import config from "./chatbotConfig";
import "./main.css";
import ChatbotButton from "./widgets/components/BackHome";

const ChatButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(0.5),
  zIndex: 999,
  scale: "80%",
  boxShadow: "0px 10px 10px rgba(0,0,0,0,5)",
  padding: "15px"
}));

const CardContentNoPadding = styled(CardContent)(`
    padding:0;
    &:last-child {
        padding-bottom: 0;
    }`);

const ChatCard = styled(Card)(({ theme, isOpen }) => ({
  position: "Fixed",
  // bottom: theme.spacing(15),
  // right: theme.spacing(4),
  //width: '28%',
  // height: '65%',
  boxShadow: "0px 0px 1px rgba(0,0,0,0,3)",
  zIndex: 998,
  // backgroundColor: '#C8E6C9',
  display: "flex",
  borderRadius: 5,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transform: isOpen ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.45s ease-in"
}));

const SolidIcon = styled(({ component: Component, ...props }) => (
  <Component {...props} />
))(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  alignItems: "center",
  width: "65px",
  height: "65px",
  borderRadius: "100%",
  // backgroundColor: '#21cd46',
  backgroundImage: "linear-gradient(to right,#005800, #00ff80)",
  color: "white",
  scale: "90%",
  boxShadow: "5px 10px 10px rgba(0,0,0,0,5)",
  border: "1px solid #119441",
  "&:hover": {
    backgroundColor: "#119441",
    border: "1px solid black"
  }
}));

const DimBackground = styled("div")(({ isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: isOpen ? "block" : "none",
  zIndex: 997
}));

const ChatbotWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatCardRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (chatCardRef.current && !chatCardRef.current.contains(e.target)) {
        //setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleToggleChat = () => {
    setIsOpen(prevOpen => !prevOpen);
  };
  return (
    <>
      <ChatButton onClick={handleToggleChat}>
        {isOpen ? (
          <SolidIcon component={CloseIcon} />
        ) : (
          <SolidIcon component={QuestionAnswerIcon} />
        )}
      </ChatButton>

      {/* <DimBackground isOpen={isOpen}/> */}

      {isOpen && (
        <ChatCard
          elevation={6}
          sx={{ transform: "translateX(0)", width: 340 }}
          ref={chatCardRef}
        >
          <CardContentNoPadding sx={{ padding: 0 }}>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
            {/* <ChatbotButton /> */}
          </CardContentNoPadding>
        </ChatCard>
      )}
    </>
  );
};

export default ChatbotWindow;
