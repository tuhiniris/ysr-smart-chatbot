// import './App.css';
import Algorithm from "./components/Algorithm";
import InputwithIcon from "./components/InputwithIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SimpleBackdrop from "./components/SimpleBackdrop";
import New_Algo from "./components/New_Algo";
import Table from "./components/Table";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadMap from "./components/LoadMap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import FlexLayoutGrid from "./components/FlexLayoutGrid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import ChatbotButton from "./components/BackHome";

const handleClick = obj => {
  var data = obj;

  // console.log(obj);
  // alert(obj.district);
  window.open(obj.directionURL, "_blank");
  // alert(obj)
};

function FlexyLayoutGrid(props) {
  const [clientStatus, setClientStatus] = useState(false); //DataGrid Load Hook
  const rows = props.dataset;
  //console.log(rows);
  const columns = [
    { field: "id", headerName: "ID", width: 0 },
    { field: "minimumDistance", headerName: "Distance (KM)", width: 105 },
    {
      field: "hospitalname",
      headerName: "Hospital Name",
      width: 500
    },
    // { field: "district", headerName: "District", width: 130 },
    // { field: "mithracontact", headerName: "Mithra Contact", width: 130 },
    // { field: "address", headerName: "Address", width: 230 },
    {
      field: "specialities",
      headerName: "Specialities",
      width: 1100,
      renderCell: ({ row }) => (
        <div
          style={{
            maxHeight: "120px",
            overflowY: "scroll",
            overflowWrap: "break-word"
          }}
        >
          {row.specialities}
        </div>
      )
    },
    // { field: "latitude", headerName: "Latitude", width: 130 },
    // { field: "longitude", headerName: "Longitude", width: 130 },
    {
      field: "directionURL",
      headerName: "Get Directions",
      width: 130,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => handleClick(row)}
        >
          Select
        </Button>
      ),
      disableClickEventBubbling: false
    }
  ];

  return (
    <DataGrid
      rowSpacingType="border"
      density="compact"
      disableColumnSelector={true}
      hideFooterSelectedRowCount={true}
      loading={false}
      columnVisibilityModel={{
        // Hide columns status and traderName, the other columns will remain visible
        id: false
      }}
      disableRowSelectionOnClick={true}
      sx={{
        overflowY: "auto",
        overflowX: "auto",
        "& .MuiDataGrid-row": {
          borderTopColor: "white",
          borderTopStyle: "solid",
          "& .MuiDataGrid-cell": {
            height: "700px",
            overflowY: "auto",
            overflowX: "auto",
            width: "auto"

            // add more css for customization
          }
        }
      }}
      // components={{ Toolbar: GridToolbar }}
      rows={rows}
      columns={columns}
      pageSize={5}
      rowHeight={70}
      rowsPerPageOptions={[5]}
    />
  );
}

function HospitalSearch(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000"
    // boxShadow: 24,
    // p: 4
  };
  const [xloading, setXloading] = useState(false); //spinner hook
  const [skelLoading, setSkelLoading] = useState(false); //this is for intentional delay to allow lazy loading
  const [loadingData, setLoadingData] = useState(false); //if true, loader state is false
  const [districtData, setDistrictData] = useState([]);
  const [loadingHosp, setLoadingHosp] = useState(false);
  const [districtList, setDistrictList] = useState([]);
  const [specialtyList, setSpecialtyList] = useState([]);
  const [latitudeList, setLatitudeList] = useState([]);
  const [longitudeList, setLongitudeList] = useState([]);
  const [specialities_mapped, setSpecialities_mapped] = useState([]);
  const [specialtyMaster, setSpecialtyMaster] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isSearchShown, setIsSearchShown] = useState(false);
  const handleLocationClick = event => {
    setIsSearchShown(false); //Refresh Current DataGrid State
    setIsSearchShown(current => !current); //Load DataGrid Only If Search is Clicked
  };

  useEffect(() => {
    setLoadingHosp(false);
    getallData();
  }, []);

  useEffect(() => {
    getUniqueDistrict();
  }, [loadingData]);

  useEffect(() => {
    getClientLocation(); //Triggers Permission System
  }, []);

  const getallData = async () => {
    try {
      setXloading(true);
      const res = await axios.get(
        "https://api-app.ysraarogyasri.ap.gov.in/hospitalsearchmapapi/public/hospitallistdetails"
      );
      setDistrictData(res.data.result);
      //console.log(res.data.result);
      setLoadingData(true);
      setXloading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUniqueDistrict = e => {
    const districts = districtData; //UPDATE WITH API RESPONSE
    //console.log(districts); //Entire API Response

    const LatSelection = [...new Set(districts.map(item => item.latitude))];
    const LongSelection = [...new Set(districts.map(item => item.longitude))];
    const districtSelection = [
      ...new Set(districts.map(item => item.district))
    ].sort();
    const specialtySelection = [
      ...new Set(districts.map(item => item.specialities_mapped))
    ].sort();

    //console.log(districtSelection);
    //console.log(LatSelection);
    //console.log(LongSelection);
    //console.log(specialtySelection);

    setDistrictList(districtSelection);
    setLatitudeList(LatSelection);
    setLongitudeList(LongSelection);
    setSpecialtyList(specialtySelection);

    function removeA(arr) {
      var what,
        a = arguments,
        L = a.length,
        ax;
      while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
        }
      }
      return arr;
    }

    var unique_specialties = "";
    for (var i = 0; i < specialtySelection.length; i++) {
      unique_specialties = unique_specialties + "," + specialtySelection[i];
    }
    //console.log(unique_specialties);
    var specialitiesArr = unique_specialties.split(",");
    //console.log(specialitiesArr);
    var Specialset = Array.from(new Set(specialitiesArr)).sort();
    Specialset.shift(); //remove empty quotes from start
    removeA(Specialset, "null");
    //console.log(Specialset); //THIS IS THE LIST OF ALL SPECIALITIES
    setSpecialtyMaster(Specialset);
    //console.log(specialtyMaster);
  };

  // ALL FUNCTIONS FOR DISTANCE CALCULATION -> Get lat-long list from UseEffects -> Create relation with hospital name

  const [range, setRange] = React.useState("");

  const handleRangeChange = event => {
    setRange(event.target.value);
    //console.log("Selected Range is " + range);
  }; // Function for setting rangeval

  const [latData, setLatData] = useState(""); //Latitude Setter
  const [longData, setLongData] = useState(""); //Longitude Setter
  const [specialData, setSpecialData] = useState(""); //Specialty Setter

  const handleLatitudeEntry = event => {
    setLatData(event.target.value);
    //console.log("Selected Latitude is" + latData);
  };

  const handleLongitudeEntry = event => {
    setLongData(event.target.value);
    //console.log("Selected Longitude is" + longData);
  };

  const filter_specialties = event => {
    setSpecialData(event.target.value);
    //alert(specialData);
  }; //condition to filter specialties

  const [resultData, setResultData] = useState([]);
  const [clientLatitude, setClientLatitude] = useState("");
  const [clientLongitude, setClientLongitude] = useState("");

  const getClientLocation = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      backdrop: true,
      showConfirmButton: false,
      timer: 3500,
      grow: "false",

      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const cl_latitude = position.coords.latitude;
        const cl_longitude = position.coords.longitude;
        console.log(`Latitude: ${cl_latitude}, Longitude: ${cl_longitude}`);
        setClientLatitude(cl_latitude);
        setLatData(cl_latitude);
        setClientLongitude(cl_longitude);
        setLongData(cl_longitude);
        Toast.fire({
          icon: "success",
          title: "Location Fetched Successfully"
        });
      });
    } else {
      ("Geolocation is not supported by this browser.");
    }
  };

  const submitEntries = event => {
    handleLocationClick();
    //run function and print -> fx(latData,longData,range) -> across list of lat-long combinations of hospitals
    // console.log(
    //   "Entries Submitted for Calculation " +
    //     latData +
    //     " " +
    //     longData +
    //     " " +
    //     range
    // );
    console.log(
      "Client Details :",
      latData,
      longData,
      districtData,
      range,
      specialData
    );
    setResultData(
      New_Algo(latData, longData, districtData, range, specialData)
    );
    //console.log(resultData);
    var answer_array = "";
    try {
      answer_array = resultData[0].specialities_mapped.split(",");
    } catch (err) {
      //answer_array = resultData[0].specialities_mapped;
      //pass
    }
    setSpecialities_mapped(answer_array);
  };
  //Button to trigger hospital searching
  //latList,longList,range,startLat,startLong,endLat,endLong [endLat,endLong] -> Trust Inputs Them

  //PRINTING SECTION FOR TABLE

  // GET CURRENT LOCATION OF USER

  return (
    <>
      <>
        {xloading ? (
          <>
            <SimpleBackdrop />
          </>
        ) : (
          <></>
        )}
      </>

      <Box
        sx={{
          p: 0,
          pb: 0,
          width: "100%",
          display: "flex",
          // height: "100%",
          flexFlow: "column",
          position: "relative",
          backgroundColor: theme => theme.palette.action.hover,
          //boxShadow: (theme) => theme.shadows[3],
          "& > :not(style)": { m: 1 }
        }}
      >
        <Card sx={{ ml: 0, mr: 0, mt: 0 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <FormControl required fullWidth>
                  <TextField
                    id="input-latitude"
                    label="Latitude"
                    size="small"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TravelExploreIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    disabled
                    value={clientLatitude}
                    //{Please keep this commented in test-env}
                    onChange={handleLatitudeEntry}
                  />
                </FormControl>{" "}
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="input-longitude"
                    label="Longitude"
                    size="small"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TravelExploreIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                    disabled
                    value={clientLongitude}
                    //{Please keep this commented in test-env}
                    onChange={handleLongitudeEntry}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label1">
                    Select Specialty
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label1"
                    id="ddlViewby2"
                    defaultValue=""
                    displayEmpty=""
                    //   value={age}
                    label="Select Specialty"
                    onChange={e => filter_specialties(e)}
                  >
                    {specialtyMaster?.map((dist, index) => {
                      specialtyMaster.sort();
                      return (
                        <MenuItem key={index} value={dist}>
                          {dist.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              {/* Selection Box Starts Here */}
              <Grid item xs={6} md={6}>
                <FormControl fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label">Range</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={range}
                    label="Range"
                    required
                    onChange={handleRangeChange}
                  >
                    <MenuItem value={2}>2KM</MenuItem>
                    <MenuItem value={4}>4KM</MenuItem>
                    <MenuItem value={6}>6KM</MenuItem>
                    <MenuItem value={8}>8KM</MenuItem>
                    <MenuItem value={10}>10KM</MenuItem>
                    <MenuItem value={20}>20KM</MenuItem>
                    <MenuItem value={30}>30KM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box
          sx={{
            mt: 0,
            p: 0,
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              width: "100%"
            }
          }}
        >
          <Button variant="contained" onClick={submitEntries}>
            Search
          </Button>

          {/* Place to Load List of Results */}

          {isSearchShown && (
            <Box sx={{ height: "350px" }}>
              <FlexyLayoutGrid dataset={resultData} />
            </Box>
          )}

          {/* <div className="table-responsive-md">
  <table className="table table-bordered table-hover table-striped">
  <thead className="table-light">
<tr>

  <th  scope="col" className="border border-primary">Distance</th>
  <th  scope="col" className="border border-primary">Hospital Name</th>
  <th  scope="col" className="border border-primary">District</th>
  <th  scope="col" className="border border-primary">Mithra Contact</th>
  <th  scope="col" className="border border-primary">Address</th>
  <th  scope="col" className="border border-primary">Specialties</th>
  <th  scope="col" className="border border-primary">Get Directions</th>
</tr></thead>
        {resultData.map((item => 
        <>
        <tr key={item} className="border border-primary" >
          <td style={{width:"30% !important"}} className="border border-dark">{item.minimumDistance.toFixed(2)} KM</td>
          <td  className="border border-dark">{item.hospitalname}</td>
          <td  className="border border-dark">{item.district}</td>
          <td  className="border border-dark">{item.mithracontact}</td>
          <td  className="border border-dark">{item.address}</td>
          <td  className="border border-dark">{item.specialities}</td>
          <td  className="border border-dark"><a href={item.directionURL} target="_blank"><button type="button" className="btn btn-primary">Select</button></a></td>
          </tr>
        </>
        ))}
      </table></div> */}
        </Box>

        {/* Passing values dynamically from array, endLat & endLong is fetched from array using ForLoop */}
      </Box>
      <Box sx={{ mt: 2 }}>
        <ChatbotButton {...props} />
      </Box>
    </>
  );
}

export default HospitalSearch;
