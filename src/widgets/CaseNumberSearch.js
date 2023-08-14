import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ChatbotButton from "./components/BackHome";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import PropTypes from "prop-types";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { MuiOtpInput } from "mui-one-time-password-input";
import { deepOrange, deepPurple } from "@mui/material/colors";

import axios from "axios";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Stack,
  Switch
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Edit } from "@mui/icons-material";

const CaseNumberSearch = props => {
  console.log(props);
  const [value, setValue] = useState(0);

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired
  };

  //OTP Logic Controller

  const [isOTPboxShown, setIsOTPboxShown] = useState(false);
  const [isCustomerDetails, setIsCustomerDetails] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [caseNumber, setCaseNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [caseDetails, setCaseDetails] = useState([]);

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8079/chatbot/casesendotp",
        {
          uhid: caseNumber
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      console.log("Sending OTP");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8079/chatbot/casevalidateotp",
        {
          otp: otp
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      console.log("Validating OTP");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPrequest = event => {
    sendOtp();
    setIsOTPboxShown(false);
    setIsOTPboxShown(current => !current); //User can only access one service at a time :D
  };

  const handleChange = newValue => {
    setOtp(newValue);
  };

  const getCaseDetails = async () => {
    try {
      const res = await axios.post(
        "https://uat.ysraarogyasri.ap.gov.in/whatsappBot/getcasedetails",
        {
          caseId: caseNumber
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      console.log("Getting Case Details");
      console.log(res.data.result);
      setCaseDetails(res.data.result);
      setIsCustomerDetails(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = () => {
    validateOtp(); // if OTP is valid, then call next function
    getCaseDetails();
    setIsOTPboxShown(true);
    setIsCustomerDetails(true);
    setIsClicked(true);
    alert(otp);
  };

  //OTP Logic Controller

  return (
    <>
      <Box
        sx={{
          p: 0,
          pb: 0,
          width: "100%",
          display: "flex",
          flexFlow: "column",
          position: "relative",
          backgroundColor: theme => theme.palette.action.hover,
          "& > :not(style)": { m: 1 }
        }}
      >
        <Card sx={{ ml: 0, mr: 0, mt: 0 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl required fullWidth>
                  <TextField
                    id="input-number"
                    fullWidth
                    required
                    label="Enter Case Number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TravelExploreIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="standard"
                    value={caseNumber}
                    onChange={event => {
                      setCaseNumber(event.target.value);
                    }}
                    // value={clientLatitude}
                    //{Please keep this commented in test-env}
                    // onChange={handleLatitudeEntry}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {!isOTPboxShown && (
          <Button onClick={handleOTPrequest} fullWidth variant="contained">
            Send OTP
          </Button>
        )}
      </Box>
      {isOTPboxShown && (
        <>
          {!isClicked && (
            <>
              <Button
                disabled
                onClick={handleOTPrequest}
                fullWidth
                variant="contained"
              >
                Resend OTP
              </Button>

              <MuiOtpInput
                size="small"
                sx={{ mt: 1 }}
                value={otp}
                onChange={handleChange}
              />

              <Button
                sx={{ mt: 1 }}
                onClick={handleOTPSubmit}
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </>
          )}
          {isClicked && isCustomerDetails && (
            <>
              {/* List of All the Related Users Will Show Here in Cards */}
              {caseDetails.map((element, index) => {
                console.log(element);
                return (
                  <Card sx={{ mt: 1, mb: 1 }}>
                    <Box
                      sx={{
                        p: 1,
                        pr: 4,
                        display: "flex",
                        flexFlow: "column",
                        position: "relative",
                        backgroundColor: theme => theme.palette.action.hover,
                        "& > :not(style)": { m: 1 }
                      }}
                    >
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Grid item xs={8} md={10}>
                          <Typography
                            fontWeight={700}
                            sx={{ textAlign: "left" }}
                          >
                            {element.caseNo}
                          </Typography>
                          <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                              textAlign: "left",
                              textTransform: "capitalize"
                            }}
                          >
                            {element.procedureName.toLowerCase()}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Chip
                            label={element.status}
                            color={
                              element.status === "Claim Paid"
                                ? "success"
                                : "primary"
                            }
                            sx={{ borderRadius: 2 }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            fontWeight={500}
                            sx={{ textAlign: "left" }}
                          >
                            {element.surgeryDesc}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Amount"
                            defaultValue={element.preauthAmt}
                            size="small"
                            fullWidth
                            variant="standard"
                            focused={false}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Chip
                            label={element.aasraStatus}
                            color="primary"
                            variant="outlined"
                            sx={{
                              borderRadius: 2
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                );
              })}
              {/* picked up static cards from here */}
            </>
          )}
        </>
      )}
      <Box sx={{ mt: 2 }}>
        <ChatbotButton {...props} />
      </Box>
    </>
  );
};

export default CaseNumberSearch;
