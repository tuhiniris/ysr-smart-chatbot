import { Button } from "@mui/material";
import HospitalSearch from "./HospitalSearch";
import { useState } from "react";
import DistrictSearch from "./DistrictSearch";

export default function HospitalSearchGroup() {
  const [isLocationSearchShown, setIsLocationSearchShown] = useState(false);
  const handleLocationClick = event => {
    setIsDistrictSearchShown(false);
    setIsLocationSearchShown(current => !current); //User can only access one service at a time :D
  };

  const [isDistrictSearchShown, setIsDistrictSearchShown] = useState(false);
  const handleDistrictClick = event => {
    setIsLocationSearchShown(false);
    setIsDistrictSearchShown(current => !current); //User can only access one service at a time :D
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleDistrictClick}
        fullWidth
        sx={{
          mb: 0.7,
          color: "black",
          textTransform: "none",
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#2898ec",
            borderColor: "#2898ec",
            boxShadow: "none",
            color: "white"
          }
        }}
      >
        Search By District
      </Button>

      <Button
        variant="outlined"
        onClick={handleLocationClick}
        fullWidth
        sx={{
          mb: 0.7,
          color: "black",
          textTransform: "none",
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#2898ec",
            borderColor: "#2898ec",
            boxShadow: "none",
            color: "white"
          }
        }}
      >
        Search By Location
      </Button>
      {isLocationSearchShown && <HospitalSearch />}
      {isDistrictSearchShown && <DistrictSearch />}
    </>
  );
}
