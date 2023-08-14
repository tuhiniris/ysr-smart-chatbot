import * as React from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const renderDetailsButton = (params) => {
  console.log("TEST-preload")
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                type="button"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  console.log("TEST-postload*********************")
                    alert('1312414114');
                    
                }}
            >
                Select
            </Button>
        </strong>
    )
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'minimumDistance', headerName: 'Distance', width: 90 },
  { field: 'hospitalname', headerName: 'Hospital Name', width: 230 },
  { field: 'district', headerName: 'District', width: 130 },
  { field: 'mithracontact',headerName: 'Mithra Contact', width: 130 },
  { field: 'address',headerName: 'Address', width: 330 },
  { field: 'specialities',headerName: 'Specialities', width: 130 },
  { field: 'endLat',headerName: 'Latitude', width: 130 },
  { field: 'endLong',headerName: 'Longitude', width: 130 },
  { field: 'directionURL',headerName: 'Get Directions', width: 130,
  renderCell: ({ row }) =>
  <Button onClick={() => alert(row)}>
    Action
  </Button>,
  disableClickEventBubbling: true, },
];

export default function FlexLayoutGrid(props) {
    const rows = props.dataset;

  return (
    <div style={{ height: 500, width: '100%' }}>
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
      <DataGrid
              // getEstimatedRowHeight={() => 100}
              // getRowHeight={() => 'auto'}
              // getRowSpacing={...}
  rowSpacingType="border"
  sx={{ '& .MuiDataGrid-row': { borderTopColor: 'white', borderTopStyle: 'solid' } }}
              components={{ Toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div></div></div>
  );
}