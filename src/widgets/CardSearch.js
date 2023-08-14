import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const CardSearch = props => {
  return (
    <Grid container columnSpacing={2}>
      <Grid xs={12} sm={12} md={12} item>
        <Card sx={{ mb: 2 }} style={{ backgroundColor: "rgb(175, 140, 19)" }}>
          <CardActionArea onClick={props.actionProvider.handleCardAadhar}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                color="white"
                component="div"
              >
                <ManageSearchIcon
                  style={{ color: "white", fontSize: "30px" }}
                />
              </Typography>
              <Typography
                variant="h2"
                color="white"
                fontWeight={"600"}
                fontSize={"15.5px"}
                marginTop={"5px"}
                sx={{ flexGrow: 1 }}
              >
                Search By Aadhar
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Divider />
      <Grid xs={12} sm={12} md={12} item>
        <Card style={{ backgroundColor: "rgb(110, 65, 144)" }}>
          <CardActionArea onClick={props.actionProvider.handleCardUhid}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                color="white"
                component="div"
              >
                <TravelExploreIcon
                  style={{ color: "white", fontSize: "30px" }}
                />
              </Typography>
              <Typography
                variant="h2"
                color="white"
                fontWeight={"600"}
                fontSize={"15.5px"}
                marginTop={"5px"}
                sx={{ flexGrow: 1 }}
              >
                Search By UHID
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardSearch;
