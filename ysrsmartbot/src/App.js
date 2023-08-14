import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import config from "./config";
import "./App.css";
import Chatbot from "react-chatbot-kit";
import "./design.css";
//import { useState } from "react";

function App() {
  //const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  return (
    <div>
      <Chatbot
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        config={config}
        headerText="Conversation with YSR Chatbot"
        placeholderText="Write your message here"
        messageHistory={loadMessages()}
        saveMessages={saveMessages}
        runInitialMessagesWithHistory
        disableScrollToBottom
      />
    </div>
  );
}

export default App;
