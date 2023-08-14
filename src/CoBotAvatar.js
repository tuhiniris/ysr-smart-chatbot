import React from "react";
import FlutterDashTwoToneIcon from "@mui/icons-material/FlutterDashTwoTone";

const CoBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "#4361ee" }}
        // style={{ background: "#ffffff" }}
      >
        {/* <img
          style={{
            borderRadius: "50%",
            height: "45px",
            maxWidth: "45px",
            scale: "100%"
          }}
          src={require("./animated.gif")}
          alt="loading..."
        /> */}
        <FlutterDashTwoToneIcon sx={{ color: "white", scale: "130%" }} />
      </div>
    </div>
  );
};

export default CoBotAvatar;
