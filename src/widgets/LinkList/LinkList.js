import React from "react";

import "./LinkList.css";
import '../../../src/main.css'
import ChatbotButton from "../components/BackHome";
const LinkList = (props) => {
  console.log(props);
  const linkMarkup = props.options.map((link) => (
    <li key={link.id} className="react-chatbot-kit-chat-bot-message-container">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="react-chatbot-kit-chat-bot-message"
      >
        
        <span>Name:{link.text.name}</span> <br></br>
        <span>Designation:{link.text.designation}</span><br></br>
        <span>Contact Number:{link.text.Contact}</span><br></br>
        <span>URL:{link.text.URL}</span><br></br>
      </a>
    </li>
  ));

  return(<> <ul className="link-list">{linkMarkup}</ul><ChatbotButton {...props}/></>);
};

export default LinkList;
