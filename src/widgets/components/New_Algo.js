// import { Geodesic } from "geographiclib-geodesic";
// import { DMS } from "geographiclib-dms";
// import * as React from "react";

// function findspecialty_instring(words, keyword) {
//   console.log(words);
//   console.log(keyword);
//   if (
//     words.includes(keyword) ||
//     keyword === "" ||
//     keyword === " " ||
//     keyword === "  "
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export default function New_Algo(
//   startLat,
//   startLong,
//   hospList,
//   range,
//   specialty
// ) {
//   var geodesic = require("geographiclib-geodesic");
//   var geod = geodesic.Geodesic.WGS84,
//     r;
//   var endLat;
//   var endLong;
//   var buffer = 0.0;
//   var final_list_hosp = [];
//   var id = 0;
//   var keyword = specialty;

//   const allData = hospList;
//   for (var i = 0; i < allData.length; i++) {
//     id = i;
//     endLat = allData[i].latitude;
//     endLong = allData[i].longitude;

//     r = geod.Inverse(startLat, startLong, endLat, endLong);
//     var totaldist = parseFloat(r.s12.toFixed(3) / 1000);
//     var init_threshold = 0.3;
//     var variation_val = 3.854068;

//     if (parseInt(totaldist) >= 25) {
//       init_threshold = variation_val;
//     } else if (parseInt(totaldist) >= 30) {
//       init_threshold = Math.asinh(variation_val - 0.2);
//     } else if (parseInt(totaldist) >= 7) {
//       init_threshold = Math.asinh(variation_val - 0.2 - 1);
//     } else {
//       //This is the default case
//       init_threshold = Math.asinh(0.3);
//     }
//     buffer = init_threshold + (13.8 / 100) * totaldist; //kpmg-formula
//     var final_value = totaldist;

//     //console.log(allData[i].specialities_mapped);

//     if (
//       Math.fround(final_value) <= Math.fround(range) &&
//       findspecialty_instring(allData[i].specialities_mapped, keyword) === true
//     ) {
//       //ADD SPECIALTY FILTERING HERE -> parameter : specialty
//       //"CARDIAC AND CARDIOTHORACIC SURGERY"
//       console.log(
//         "Latitude:" + endLat + " Longitude:" + endLong + " ans:" + final_value
//       );
//       //var srcIframe=`https://maps.google.com/maps?q=${endLat},${endLong}&hl=es;&output=embed`;
//       var srcIframe = `https://www.google.com/maps/search/${endLat}+${endLong}/`;

//       //OBJECT CREATION
//       var filtered_entries = {}; //final object list
//       filtered_entries.id = id;
//       filtered_entries.latitude = endLat;
//       filtered_entries.longitude = endLong;
//       filtered_entries.hospitalname = allData[i].hosp_name;
//       filtered_entries.mithracontact = allData[i].mithra_contact;
//       filtered_entries.address = allData[i].address;
//       filtered_entries.specialities = allData[i].specialities_mapped;
//       filtered_entries.directionURL = srcIframe;
//       filtered_entries.minimumDistance = final_value.toFixed(2);
//       filtered_entries.district = allData[i].district;

//       //add address,gmap-links,specialities
//       final_list_hosp.push(filtered_entries);
//       final_list_hosp.sort(function(a, b) {
//         return parseFloat(a.minimumDistance) - parseFloat(b.minimumDistance);
//       });
//     }

//     //var filtered_entries = {latitude:endLat, longitude:endLong, hospitalname:allData[i].hosp_name, mithracontact:allData[i].mithra_contact};
//   }
//   console.log(final_list_hosp);

//   return final_list_hosp;

//   // r = geod.Inverse(16.57971, 82.01157, 16.587079, 82.008423); //[starting_lat,starting_long,destination_lat,destination_long]
// }

import { Geodesic } from "geographiclib-geodesic";
import { DMS } from "geographiclib-dms";
import * as React from "react";

function findspecialty_instring(words, keyword) {
  console.log(words);
  console.log(keyword);
  if (
    words.includes(keyword) ||
    keyword === "" ||
    keyword === " " ||
    keyword === "  "
  ) {
    return true;
  } else {
    return false;
  }
}

export default function New_Algo(
  startLat,
  startLong,
  hospList,
  range,
  specialty
) {
  var geodesic = require("geographiclib-geodesic");
  var geod = geodesic.Geodesic.WGS84,
    r;
  var endLat;
  var endLong;
  var buffer = 0.0;
  var final_list_hosp = [];
  var id = 0;
  var keyword = specialty;

  const allData = hospList;
  for (var i = 0; i < allData.length; i++) {
    id = i;
    endLat = allData[i].latitude;
    endLong = allData[i].longitude;

    r = geod.Inverse(startLat, startLong, endLat, endLong);
    var totaldist = parseFloat(r.s12.toFixed(3) / 1000);
    var init_threshold = 0.3;
    var variation_val = 3.854068;

    if (parseInt(totaldist) >= 25) {
      init_threshold = variation_val;
    } else if (parseInt(totaldist) >= 30) {
      init_threshold = Math.asinh(variation_val - 0.2);
    } else if (parseInt(totaldist) >= 7) {
      init_threshold = Math.asinh(variation_val - 0.2 - 1);
    } else {
      //This is the default case
      init_threshold = Math.asinh(0.3);
    }
    buffer = init_threshold + (13.8 / 100) * totaldist; //kpmg-formula
    var final_value = totaldist;

    console.log(allData[i].specialities_mapped);

    if (
      Math.fround(final_value) <= Math.fround(range) &&
      findspecialty_instring(allData[i].specialities_mapped, keyword) === true
    ) {
      //ADD SPECIALTY FILTERING HERE -> parameter : specialty
      //"CARDIAC AND CARDIOTHORACIC SURGERY"
      console.log(
        "Latitude:" + endLat + " Longitude:" + endLong + " ans:" + final_value
      );
      //var srcIframe=`https://maps.google.com/maps?q=${endLat},${endLong}&hl=es;&output=embed`;
      var srcIframe = `https://www.google.com/maps/search/${endLat}+${endLong}/`;

      //OBJECT CREATION
      var filtered_entries = {}; //final object list
      filtered_entries.id = id;
      filtered_entries.latitude = endLat;
      filtered_entries.longitude = endLong;
      filtered_entries.hospitalname = allData[i].hosp_name;
      filtered_entries.mithracontact = allData[i].mithra_contact;
      filtered_entries.address = allData[i].address;
      filtered_entries.specialities = allData[i].specialities_mapped;
      filtered_entries.directionURL = srcIframe;
      filtered_entries.minimumDistance = final_value.toFixed(2);
      filtered_entries.district = allData[i].district;

      //add address,gmap-links,specialities
      final_list_hosp.push(filtered_entries);
      final_list_hosp.sort(function(a, b) {
        return parseFloat(a.minimumDistance) - parseFloat(b.minimumDistance);
      });
    }

    //var filtered_entries = {latitude:endLat, longitude:endLong, hospitalname:allData[i].hosp_name, mithracontact:allData[i].mithra_contact};
  }
  //console.log(final_list_hosp);

  return final_list_hosp;

  // r = geod.Inverse(16.57971, 82.01157, 16.587079, 82.008423); //[starting_lat,starting_long,destination_lat,destination_long]
}
