import "./styles.css";
import { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

import "./main.css";
export default function App() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
}

{
  /* <iframe src="https://uat.ysraarogyasri.ap.gov.in/ysrchatbot/" width="430px" height="851px" allow="geolocation">
</iframe> */
}
