// b.	Hospital  search may be given based on the location or District, Mandal  ,Specialty
// c.	In case of district-mandal-specilty:
// i.	District (Mandatory field)
// ii.	Mandal (Dependent on District field)
// iii.	Specialty (Independent field)
// iv.	User will get results based on any search criteria.
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
import ChatbotButton from "./components/BackHome";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonBase, Divider } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SimpleBackdrop from "./components/SimpleBackdrop";
import { useState } from "react";

export default function ProcedureSearch(props) {
  const [viewDataMaster, setViewDataMaster] = React.useState([]);
  const [specialtyMaster, setSpecialtyMaster] = React.useState([]);
  const [organMaster, setOrganMaster] = React.useState([]);
  const [typeMaster, setTypeMaster] = React.useState([
    "IP",
    "ST",
    "DC",
    "Aasara"
  ]); //Hard-Coded as client specified
  const [specialty, setSpecialty] = React.useState([]); //Used to Store Value After DropDown Selection
  const [organ, setOrgan] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [showTable, setShowTable] = React.useState(false);
  const [isShown, setIsShown] = useState(false);

  //This Section only does API Works
  useEffect(() => {
    getSpecialtyName();
  }, []);

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  const findKeys = (obj, val) =>
    Object.keys(obj).filter(key => obj[key] === val);

  const getSpecialtyName = async () => {
    try {
      setIsShown(true);
      const res = await axios.get(
        "http://10.48.19.62:8199/whatsappBot/globalProcedureSearch"
      );
      console.log(res.data.result);
      setIsShown(false);
      // SPECIALITY SECTION**********************************************
      var specialstorage = []; //Array where all the specialties will be mapped from the api loaded values
      for (let i = 0; i < res.data.result.length; i++) {
        specialstorage.push(res.data.result[i].specialityName);
      }
      specialstorage = removeDuplicates(specialstorage);
      console.log(specialstorage);
      setSpecialtyMaster(specialstorage.sort()); //Filter out list of all the unique specialities
      // Section for populating Organ List
    } catch (error) {
      console.log("error", error);
    }
  };

  // Dropdown State Management

  const handleSpecialtyChange = event => {
    //handleReset();
    setSpecialty(event.target.value);
    setShowTable(true);
  };

  const handleOrganChange = event => {
    setOrgan(event.target.value);
    console.log("Chosen Organ Is");
    console.log(event.target.value);
  };

  // Datagrid Loader Section
  function FlexyLayoutGrid(props) {
    // handleReset();
    const masterdata = props.dataset; //Main Section Always
    console.log(masterdata);
    //Business Logic Section
    var rows = [];
    console.log(specialty + organ + type); //Shows the options chosen by the user

    //console.log(rows);
    const columns = [
      // { field: "id", headerName: "ID", width: 0 },
      // { field: "specialityCode", headerName: "Speciality Code", width: 105 },
      {
        field: "specialityName",
        headerName: "Specialty Name",
        width: 190
      },

      { field: "procedureName", headerName: "Treatment Name", width: 400 },
      { field: "packageAmount", headerName: "Package Amount", width: 130 },
      { field: "procedureType", headerName: "Treatment Type", width: 130 }
    ];

    return (
      <>
        {showTable && (
          <DataGrid
            slots={{
              toolbar: GridToolbar
            }}
            getRowId={row => row.procedureName}
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
                    Speciality
                  </InputLabel>
                  <Select
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    fullWidth
                  >
                    {specialtyMaster.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label1">Organ</InputLabel>
                  <Select
                    value={specialty}
                    onChange={handleOrganChange}
                    fullWidth
                  >
                    {/* <MenuItem>{specialty}</MenuItem> */}
                    {organMaster.map(
                      ({ specialityCode, procedureName }, index) => (
                        <MenuItem key={index} value={procedureName}>
                          {procedureName.toUpperCase()}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth sx={{}} size="small">
                  <InputLabel id="demo-simple-select-label2">
                    Type (IP, ST, DC & Aasara)
                  </InputLabel>
                  <Select
                    // value={type}
                    // onChange={handleTypeChange}
                    fullWidth
                  >
                    {typeMaster.map(typename => (
                      <MenuItem key={typename} value={typename}>
                        {typename.toUpperCase()}
                      </MenuItem>
                    ))}
                    {/* <MenuItem>DTen</MenuItem> */}
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
              {/* <Button variant="contained" onClick={handleReset}>
                Reset
              </Button> */}
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ height: "250px" }}>
          <FlexyLayoutGrid dataset={viewDataMaster} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ChatbotButton {...props} />
      </Box>
    </>
  );
}
