// ** MUI Imports
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import React, {useEffect,Fragment} from 'react';
import Stack from "@mui/material/Stack";
import { Switch } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import SimpleBackdrop from "./SimpleBackdrop";


const LoadMap = (props) => {
  var lat = props.lat;
  var lon = props.lon;
  //var distid = props.dist;
  var objhtml = []; //Render Box  
  
 
var srcIframe="";
const lookup_table = {
'ALLURI SITHARAMA RAJU':'https://www.google.com/maps/d/u/0/embed?mid=1CUmuszcGtFfuEjOsh4nGiBYU_zCQIhQ&ehbc=2E312F',
'ANAKAPALLI':'https://www.google.com/maps/d/u/0/embed?mid=1uM0T19Ldztu_5re8q3hnlomDMOCCVNU&ehbc=2E312F',
'ANANTHAPURAMU':'https://www.google.com/maps/d/u/0/embed?mid=1g8O4mJU7675PbUMM77ix7gIuM9cxw38&ehbc=2E312F',
'ANNAMAYYA':'https://www.google.com/maps/d/u/0/embed?mid=1Q4rJQo3XzOfTaj97Oy-wEBu4sMLNozE&ehbc=2E312F',
'BAPATLA':'https://www.google.com/maps/d/u/0/embed?mid=1Oqi4BwdglZbjM5A959D-mlvovYqFY3I&ehbc=2E312F',
'CHITTOOR':'https://www.google.com/maps/d/u/0/embed?mid=1Yc-yRSbc27DFuwH-UW9o_ADAYjIxBIU&ehbc=2E312F',
'DR.B.R.AMBEDKAR KONASEEMA':'https://www.google.com/maps/d/u/0/embed?mid=1RMkShxHAh8tmTKDfk03AXp_6ph--lb0&ehbc=2E312F',
'EAST GODAVARI':'https://www.google.com/maps/d/u/0/embed?mid=1mSpbQYb-JBLw-flxqKnzWUgLF3GwvGo&ehbc=2E312F',
'ELURU':'https://www.google.com/maps/d/u/0/embed?mid=13uDKx-CqJMXn9zrTB9no7PTRJtnTaSo&ehbc=2E312F',
'GUNTUR':'https://www.google.com/maps/d/u/0/embed?mid=1ffPT_cumgfqPlJtlXI4tHrqq2Goeedk&ehbc=2E312F',
'KAKINADA':'https://www.google.com/maps/d/u/0/embed?mid=18m9S4JOeSYVnlLtfzkXYZi7ItqkFBLI&ehbc=2E312F',
'KRISHNA':'https://www.google.com/maps/d/u/0/embed?mid=1l4tOKEy2N3k6oH9TYBzPSZDXbsY7p_M&ehbc=2E312F',
'KURNOOL':'https://www.google.com/maps/d/u/0/embed?mid=1aq5nPlA5qxS0GLbu9NtiopSYjyx1T2Y&ehbc=2E312F',
'NANDHYALA':'https://www.google.com/maps/d/u/0/embed?mid=1awQVgBKE6qT1loVjB78j01fmV6Esz5Y&ehbc=2E312F',
'NTR':'https://www.google.com/maps/d/u/0/embed?mid=1VN0qxXb_yYa39x8EyFrxIE3k5vTBGuk&ehbc=2E312F',
'PALNADU':'https://www.google.com/maps/d/u/0/embed?mid=1I2TRB4hT6lQyF52ZWr6V85XYEuBDdx4&ehbc=2E312F',
'PARVATHIPURAM MANYAM':'https://www.google.com/maps/d/u/0/embed?mid=1jI5Wf6SH6dxAYowhEjpd4porNT6CU6w&ehbc=2E312F',
'PRAKASAM':'https://www.google.com/maps/d/u/0/embed?mid=1OSlLccXMVpi4Bp_jGU1CYVUFZBuZrag&ehbc=2E312F',
'SRI POTTISRIRAMULU NELLORE':'https://www.google.com/maps/d/u/0/embed?mid=1VclNTFVo9lXzsuAqbXnyv6w-lAaZexk&ehbc=2E312F',
'SRI SATHAYA SAI':'https://www.google.com/maps/d/u/0/embed?mid=1NV3XoyOHD98T1g174JjBFNz_anUpHxU&ehbc=2E312F',
'SRIKAKULAM':'https://www.google.com/maps/d/u/0/embed?mid=1YKcMye3SDVwowj0VEnfsH6j2j3wtBHs&ehbc=2E312F',
'TIRUPATI':'https://www.google.com/maps/d/u/0/embed?mid=1xTIOjoikzW264dvNNzpQsakaUYIHQg0&ehbc=2E312F',
'VISHAKAPATANAM':'https://www.google.com/maps/d/u/0/embed?mid=1hMdoXjqE2VyggMDXIkb90Svw1o4lBrI&ehbc=2E312F',
'VIZIANAGARAM':'https://www.google.com/maps/d/u/0/embed?mid=1HO1i8oEunGL6Tv4BR-MJRra4fdL0m-I&ehbc=2E312F',
'WEST GODAVARI':'https://www.google.com/maps/d/u/0/embed?mid=1U3ss0mFHmn8wPgLNiugV-qWR4lwBr54&ehbc=2E312F',
'YSR KADAPA':'https://www.google.com/maps/d/u/0/embed?mid=1A-DbCeqK7uTFgOzxgz6KeZr4thIVjt0&ehbc=2E312F'
};


//console.log(distid);
var flag=0;
if(lat>0 || lon>0)
{
  console.log("Creating Dynamic Waypoints")
  srcIframe=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
}

else{
   srcIframe=`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7860520.350203715!2d76.26409529081066!3d15.848990269727956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3546f8ae93d47f%3A0x33d1bbbe95adcd83!2sAndhra%20Pradesh!5e0!3m2!1sen!2sin!4v1673293182742!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"`
  
}  
  objhtml.push( <Box sx={{ width: '100%' }}>
  <iframe id="iFrameId" src={srcIframe}  width="100%" height="500px"></iframe>
  </Box>
  )
  // objhtml.push(<BasicButtons />)

  return (
    <>
    {/* <SimpleBackdrop logic='1' /> */}
    
    {objhtml}  
    {/* <BarLoader
  color="#f4f4f4"
  height={2}
  speedMultiplier={1}
  width={400}
/> */}
    </>
  );
};

export default LoadMap;