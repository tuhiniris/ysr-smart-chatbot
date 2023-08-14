import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import ChatbotButton from "./components/BackHome";

const Department = (props) => {
  const [deptData,setDeptData] = useState([]);

  const fetchDept  = async () => {
    try {
      var username = 'chatbotuser';
      var password = 'UDDP#CHATBOT@123';
      var basicAuth = 'Basic ' + btoa(username + ':' + password);
      const res = await axios.get(`/get-all-departments`, {
        headers: { 'Authorization': + basicAuth }});
    
      console.log(res.data.result);
      setDeptData(res.data.result); //Stored dept states
      if (res.data.status == 200) {
        console.log("OK")
        console.log(deptData);
        //snackbar message
        // navigate back
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    fetchDept();
  },
  [])

  return (
    <div className="options">
      {/* <h1 className="options-header">Options</h1> */}
      <div className="options-container"> 
    <div
    className="option-item"
    onClick={props.actionProvider.handleDepartmentDetail}
    //key={7}
  >
   Food, Public Distribution and Consumer Affairs
  </div>
  <div
    className="option-item"
    onClick={props.actionProvider.handleDepartmentDetail1}
    //onClick={option.handler}
    //key={option.id}
  >
   School Education and Literacy
  </div>
  <div
    className="option-item"
    onClick={props.actionProvider.handleDepartmentDetail2}
    //onClick={option.handler}
    //key={option.id}
  >
   Labour, Employment, Training and Skill Development
  </div>
  <div
    className="option-item"
    onClick={props.actionProvider.handleDepartmentDetail3}
    //onClick={option.handler}
    //key={option.id}
  >
   Scheduled Tribe, Scheduled Caste, Minority and Backward Class Welfare
  </div>
  </div>
  <ChatbotButton {...props}/>
  </div>
  );
};

export default Department;
