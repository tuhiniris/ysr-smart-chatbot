import * as React from "react";
import ChatbotButton from "./components/BackHome";
import { useState } from "react";
import PropTypes from "prop-types";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { MuiOtpInput } from "mui-one-time-password-input";

import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";

const CardUhidSearch = props => {
  console.log(props);

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    };
  }

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired
  };

  const [isOTPboxShown, setIsOTPboxShown] = useState(false);
  const [isCustomerDetails, setIsCustomerDetails] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [uhid, setUhid] = useState("");
  const [otp, setOtp] = useState("");
  const [members, setMembers] = useState([]);
  const [familyHead, setFamilyHead] = useState({
    uhid: "",
    aadharNo: "",
    mobileNo: "",
    residentId: "",
    relation: "",
    mandalName: "",
    ditrictName: "",
    secretariatCode: "",
    secretariatName: "",
    pinCode: "",
    memberName: ""
  });

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8079/chatbot/cardsendotp",
        {
          uhid: uhid
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
        "http://localhost:8079/chatbot/cardvalidateotp",
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
    //sendOtp();
    setIsOTPboxShown(false);
    setIsOTPboxShown(current => !current); //User can only access one service at a time :D
  };

  const handleChange = newValue => {
    setOtp(newValue);
  };

  const getEligibleMembers = async () => {
    try {
      const res = await axios.post(
        "https://uat.ysraarogyasri.ap.gov.in/whatsappBot/detailsbycardsearch",
        {
          uhid: uhid
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      console.log("Getting Eligible Members");
      console.log(res.data.result);
      setMembers(res.data.result);
      setIsCustomerDetails(true);
      res.data.result.map((element, index) => {
        // console.log("ELEMENT");
        // console.log(element);
        if (element.relation === "SELF") {
          setFamilyHead(element);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = () => {
    // validateOtp(); // if OTP is valid, then call next function
    getEligibleMembers();
    setIsOTPboxShown(true);
    setIsCustomerDetails(true);
    setIsClicked(true);
    // alert(otp);
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
                    label="Enter UHID Number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TravelExploreIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="standard"
                    value={uhid}
                    onChange={event => {
                      setUhid(event.target.value);
                    }}
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
              <Card sx={{ minWidth: 275, marginY: 1 }}>
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        textAlign="left"
                        gutterBottom
                      >
                        Family Head
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <Chip
                          label={familyHead.uhid}
                          color="primary"
                          sx={{ borderRadius: 1 }}
                          size="small"
                          variant="outlined"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h5" component="div" textAlign="left">
                    {familyHead.memberName}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    textAlign="left"
                    textTransform="capitalize"
                  >
                    {familyHead.mandalName
                      .concat(
                        ", ",
                        familyHead.ditrictName,
                        ", ",
                        familyHead.pinCode
                      )
                      .toLowerCase()}
                  </Typography>
                </CardContent>
              </Card>
              {members.map((element, index) => {
                return (
                  <Card sx={{ minWidth: 275, marginBottom: 1 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            {...stringAvatar(element.memberName)}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle"
                            component="h3"
                            fontWeight={500}
                          >
                            {element.memberName}
                          </Typography>
                          <Typography color="text.secondary" textAlign="left">
                            {element.relation === "SELF"
                              ? "Family Head"
                              : element.relation}
                          </Typography>
                        </Grid>
                        <Grid item container spacing={1} xs={12}>
                          <Grid item xs={5}>
                            <TextField
                              label="Mobile Number"
                              disabled={element.mobileNo === null}
                              defaultValue={
                                element.mobileNo === null
                                  ? "Unavailable"
                                  : element.mobileNo
                              }
                              size="small"
                              focused={false}
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              label="Aadhaar Number"
                              defaultValue={element.aadharNo}
                              size="small"
                              focused={false}
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                          <Chip
                            label={"Resident ID: " + element.residentId}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 1
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
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

export default CardUhidSearch;
