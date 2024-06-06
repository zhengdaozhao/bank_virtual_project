import axios from "axios";
import authHeader from '../util/authHeader';
import sortBy from "sort-by";

const API_URL = "http://localhost:9100/card/";

const getRequests = () => {
  return axios.get(API_URL + "request", { headers: authHeader(),timeout:100000 });
};

const getRequestsAll =async () => {
  let res= await axios.get(API_URL + "request/all", { headers: authHeader(),timeout:100000 });
  return res.data.sort(sortBy("applyDate"));
};
const getPancode = () => {
  return axios.get(API_URL + "genpan", { headers: authHeader() });
};

const getCards = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  let isAdmin=false;
  if(role==='ADMIN') isAdmin=true
  return axios.get(API_URL + `all/${token}/${isAdmin}`, { headers: authHeader() });
};

const updateCardRequestStatus = (user) => {
  return axios.post(API_URL + "update",user, { headers: authHeader() });
};


const CardService = {
  getRequests,
  getRequestsAll,
  getPancode,
  getCards,
  updateCardRequestStatus,
};

export default CardService;