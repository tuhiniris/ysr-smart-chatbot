import axios from "axios";
// PROD : https://api-app.ysraarogyasri.ap.gov.in/hospitalsearchmapapi/public/hospitallistdetails
// UAT : https://uat.ysraarogyasri.ap.gov.in/hospitalsearchmapapi/public/hospitallistdetails
// we need to pass the baseURL as an object
const API = axios.create({
 baseURL: "http://10.48.158.197:8008/uddpchatbotapi",
});

// API.defaults.headers.common['Authorization'] = 'Auth From instance';
export default API;