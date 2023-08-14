import React from "react";

import UrlIcon from "../icons/call.svg";
import { Grid } from "@mui/material";
import ChatbotButton from "./components/BackHome";

const ContactLink = (props) => {
  return (
    <div className="options">
      {/* <h1 className="options-header">Test</h1> */}
      <div className="options-container"> 
    <div
    className="option-item"
    onClick={props.actionProvider.handleInfoDetail1}
    //key={option.id}
  >
   How do I get started with Department Portal?
  </div>
  <div
    className="option-item"
    onClick={props.actionProvider.handleInfoDetail2}
    //onClick={option.handler}
    //key={option.id}
  >
   Login Assistance
  </div>
 
  <div
    className="option-item"
    onClick={props.actionProvider.handleInfoDetail3}
    //onClick={option.handler}
    //key={option.id}
  >
   What is UDDP ID?
  </div>
  <div
    className="option-item"
    onClick={props.actionProvider.handleDepartmentDetail4}
    //onClick={option.handler}
    //key={option.id}
  >
   Key features of Department Portal
   
  </div>
  
  {/* <ChatbotButton {...props}/> */}

  </div>
  <ChatbotButton {...props}/>
  </div>
  );
};

export default ContactLink;
