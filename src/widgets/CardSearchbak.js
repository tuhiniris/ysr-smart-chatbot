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

//import axios from "../utils/axios";
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

const CardSearch = props => {
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
  const handleOTPrequest = event => {
    setIsOTPboxShown(false);
    setIsOTPboxShown(current => !current); //User can only access one service at a time :D
  };

  const [otp, setOtp] = React.useState("");
  const handleChange = newValue => {
    setOtp(newValue);
  };

  const handleOTPSubmit = () => {
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
              <Grid item xs={12} md={12}>
                <FormControl required fullWidth>
                  <TextField
                    id="input-number"
                    fullWidth
                    required
                    label="Enter UHID / Aadhar Number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TravelExploreIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"

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
          {isClicked && (
            <>
              <Card>
                <CardContent>
                  <Typography variant="body1" fontWeight={200}>
                    Family Head : Smiling Human
                  </Typography>
                </CardContent>
              </Card>
              {/* List of All the Related Users Will Show Here in Cards */}
              <Card sx={{ mt: 1, mb: 1 }}>
                <Box
                  sx={{
                    p: 0,
                    pb: 0,
                    mt: -1,
                    width: "100%",
                    display: "flex",
                    flexFlow: "column",
                    position: "relative",

                    backgroundColor: theme => theme.palette.action.hover,
                    "& > :not(style)": { m: 1 }
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                      <Avatar
                        variant="rounded"
                        sx={{ bgcolor: deepOrange[500] }}
                      >
                        H
                      </Avatar>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography fontWeight={700}>Happy Human</Typography>
                      <Typography>
                        <Typography sx={{ color: grey }} />
                        Relation : Son
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
              {/* Static VAL */}
              <Card sx={{ mt: 1, mb: 1 }}>
                <Box
                  sx={{
                    p: 0,
                    pb: 0,
                    mt: -1,
                    width: "100%",
                    display: "flex",
                    flexFlow: "column",
                    position: "relative",

                    backgroundColor: theme => theme.palette.action.hover,
                    "& > :not(style)": { m: 1 }
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                      <Avatar
                        variant="rounded"
                        sx={{ bgcolor: deepOrange[500] }}
                      >
                        S
                      </Avatar>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography fontWeight={700}>Sad Human</Typography>
                      <Typography>
                        <Typography sx={{ color: grey }} />
                        Relation : Daughter
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
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

export default CardSearch;
