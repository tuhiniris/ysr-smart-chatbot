import { Geodesic } from 'geographiclib-geodesic';
import { DMS } from 'geographiclib-dms';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Algorithm(startLat,startLong,latList,longList,range){
var geodesic = require("geographiclib-geodesic")
var geod = geodesic.Geodesic.WGS84, r;
var buffer = 0.0; //adjust value to check if location is matching [should be around 12% accurate]

// r = geod.Inverse(16.57971, 82.01157, 16.587079, 82.008423); //[starting_lat,starting_long,destination_lat,destination_long]


var lati_list = latList; //Arrays to Iterate
var longi_list = longList; //Arrays to Iterate
var range_limit = range; //Range Selected from Dropdown
var endLat;
var endLong;

if(startLat==='' || startLong==='' || range===''){
    return(
        alert("Latitude, Longitude or Range cannot be blank")
    )
}

for(var i=0;i<lati_list.length;i++){
    //console.log("<------Calculating------>");
    endLat = lati_list[i];
    endLong = longi_list[i];
    // console.log(endLat);
    // console.log(endLong);
    // console.log("***********END**************")


r = geod.Inverse(startLat,startLong,endLat,endLong);
var totaldist = (parseFloat((r.s12.toFixed(3))/1000));


// Create Buffer Management based on distance

//console.log("THIS IS THE TOTALDIST"+totaldist);

// Area for threshold calculation
var init_threshold = 0.3
var variation_val = 3.854068

if (parseInt(totaldist)>=25){
    init_threshold = variation_val
}
else if(parseInt(totaldist)>=30){
    init_threshold = Math.asinh(variation_val-0.2)
}
else if(parseInt(totaldist)>=7){
    init_threshold = Math.asinh(variation_val-0.2-1)
}
else{ //This is the default case
    init_threshold = Math.asinh(0.3)
}

// Area for buffer threshold calculation for road design compensation

buffer = init_threshold+(13.8/100)*totaldist; //kpmg-formula
//var final_value = (totaldist+buffer).toFixed(2);
//var final_value = totaldist+buffer;
var final_value = totaldist;


if (Math.fround(final_value) <= Math.fround(range_limit)) {
    console.log("The Hospitals Available in this range is having Latitude : "+ endLat +" " + endLong + " and total distance is "+ final_value);
}

}
}

// This prints "The distance is _ _ _ KM."

// // Find the point 20000 km SW of Perth, Australia (32.06S, 115.74E)...
// r = geod.Direct(-32.06, 115.74, 225, 20000e3);
// console.log("The position is (" +
//             r.lat2.toFixed(8) + ", " + r.lon2.toFixed(8) + ").");
// // This prints "The position is (32.11195529, -63.95925278).
export default Algorithm;