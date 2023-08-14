// b.	Hospital  search may be given based on the location or District, Mandal  ,Specialty
// c.	In case of district-mandal-specilty:
// i.	District (Mandatory field)
// ii.	Mandal (Dependent on District field)
// iii.	Specialty (Independent field)
// iv.	User will get results based on any search criteria.
// e.	NWHs list should be shown with Hospital name, Specialties, directions
// (Citizen should redirect to the Google maps when click on directions.
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonBase, Divider } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import SimpleBackdrop from "./components/SimpleBackdrop";
import { useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ChatbotButton from "./components/BackHome";

export default function DistrictSearch(props) {
  const [masterData, setMasterData] = React.useState([]);
  const [specialtyMaster, setSpecialtyMaster] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [mandalList, setMandalList] = React.useState([]);
  const [specialtyList, setSpecialtyList] = React.useState([]);
  const [showTable, setShowTable] = React.useState(false);
  // ALL PROCESSED MASTERS

  const [district, setDistrict] = React.useState("");
  const [mandal, setMandal] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");
  const [isShown, setIsShown] = useState(false);
  const handleClick = obj => {
    //var data = obj;

    // console.log(obj);
    // alert(obj.district);
    window.open(obj, "_blank");
    // alert(obj)
  };

  function FlexyLayoutGrid(props) {
    console.log(props.dataset);
    var masterdata = [];
    var filteredmasterdata = [];
    if (specialty === "") {
      masterdata = props.dataset;
    } else {
      //Section Where A New Dataset is Created where Specialty is passed as a prop
      var temp_arr = [];
      for (let i = 0; i < props.dataset.length; i++) {
        let checker = props.dataset[i].specialities_mapped; //Individual Object to Scan Here
        //console.log("THIS IS KEYWORD" + specialty + checker);
        if (checker == null) {
          console.log(
            "NULL DETECTED SO IGNORED IN SEARCH >>" +
              props.dataset[i].hosp_name,
            ",",
            props.dataset[i].district,
            ",",
            props.dataset[i].mandal
          );
        } else if (checker.includes(specialty) && checker != null) {
          temp_arr.push(props.dataset[i]);
        }
      }
      console.log(temp_arr); //Array With All Data With Perfect Specialty Chosen
      masterdata = temp_arr;
    }

    //console.log(masterdata);

    //Business Logic Section

    var rows = masterdata;
    //var rows = [];
    console.log(specialty + district + mandal);

    if (mandal === "") {
      rows = masterdata.filter(function(i) {
        return i.district === district;
      });
    } else {
      rows = masterdata.filter(function(i) {
        return i.mandal === mandal && i.district === district;
      });
    }
    //console.log(rows);
    const columns = [
      // { field: "id", headerName: "ID", width: 0 },
      // { field: "specialityCode", headerName: "Speciality Code", width: 105 },
      {
        field: "hosp_name",
        headerName: "Hospital Name",
        width: 220
      },

      { field: "district", headerName: "District", width: 180 },
      { field: "mandal", headerName: "Mandal", width: 150 },
      { field: "specialities_mapped", headerName: "Speciality", width: 130 },
      {
        field: "latitude",

        headerName: "Get Directions",
        width: 130,
        renderCell: ({ row }) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            // onClick={() => handleClick(row)}
            onClick={() =>
              handleClick(
                `https://www.google.com/maps/search/${row.latitude}+${row.longitude}/`
              )
            }
          >
            Select
          </Button>
        ),
        disableClickEventBubbling: false
      }
    ];

    return (
      <>
        {showTable && (
          <DataGrid
            slots={{
              toolbar: GridToolbar
            }}
            getRowId={row => row.hosp_name}
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
        )}
      </>
    );
  }

  useEffect(() => {
    getallData(); //Triggers Permission System
  }, []);

  function removeDuplicates(arr) {
    let unique = arr.reduce(function(acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);
    return unique;
  }

  const getallData = async () => {
    try {
      setIsShown(true);
      const res = await axios.get(
        "https://api-app.ysraarogyasri.ap.gov.in/hospitalsearchmapapi/public/hospitallistdetails"
      );

      setMasterData(res.data.result);
      //console.log(res.data.result);
      setIsShown(false);
      // Business Logic Processing
      setShowTable(true);
      var temp_dist_list = [];
      for (let i = 0; i < res.data.result.length; i++) {
        temp_dist_list.push(res.data.result[i].district);
      }
      //console.log(removeDuplicates(temp_dist_list.sort()));
      setDistrictList(removeDuplicates(temp_dist_list.sort())); //Generating List of Unique Districts
      //Speciality List Creation Logic

      const specialtySelection = [
        ...new Set(res.data.result.map(item => item.specialities_mapped))
      ].sort();

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

      //End of Business Logic
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDistrictChange = event => {
    setDistrict(event.target.value);
    //Filtration System
    var rows = [];
    {
      rows = masterData.filter(function(i) {
        return (
          i.district === event.target.value
          // && i.mandal === "GVMC - VISAKHAPATNAM -U"
          // && i.specialities_mapped === "CARDIAC AND CARDIOTHORACIC SURGERY"
        );
      });
    }
    var temp_mandal_list = [];
    for (let i = 0; i < rows.length; i++) {
      temp_mandal_list.push(rows[i].mandal);
    }
    setMandalList(removeDuplicates(temp_mandal_list.sort()));
    //Updated Relational Dropdowns Based on Mandalwas
    //alert("Mandalwa");
    //console.log(mandalList);
  };

  const handleMandalChange = event => {
    setMandal(event.target.value);
  };

  const handleSpecialtyChange = event => {
    setSpecialty(event.target.value);
  };

  return (
    <>
      {isShown && <SimpleBackdrop />}
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
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <FormControl required fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label">
                    District
                  </InputLabel>
                  <Select
                    value={district}
                    onChange={handleDistrictChange}
                    fullWidth
                  >
                    {districtList?.map(dis_name => (
                      <MenuItem key={dis_name} value={dis_name}>
                        {dis_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label">Mandal</InputLabel>
                  <Select
                    value={mandal}
                    onChange={handleMandalChange}
                    fullWidth
                  >
                    {mandalList?.map(mand_name => (
                      <MenuItem key={mand_name} value={mand_name}>
                        {mand_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* <FormControl fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label">
                    Specialty
                  </InputLabel>
                  <Select
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    fullWidth
                  >
                    {specialtyList?.map(sp_name => (
                      <MenuItem key={sp_name} value={sp_name}>
                        {sp_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label1">
                    Select Specialty
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label1"
                    id="ddlViewby2"
                    defaultValue=""
                    displayEmpty=""
                    //   value={age}
                    label="Select Specialty"
                    onChange={e => handleSpecialtyChange(e)}
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
            </Grid>

            <Box
              sx={{
                mt: 2,
                p: 0,
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "100%"
                }
              }}
            >
              {/* <Button variant="contained">Reset</Button> */}
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ height: "250px" }}>
          <FlexyLayoutGrid dataset={masterData} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ChatbotButton {...props} />
      </Box>
    </>
  );
}
