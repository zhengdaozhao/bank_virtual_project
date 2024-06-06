import axios from "axios";
import authHeader from '../util/authHeader';

const API_URL = "http://localhost:9100/user/";

const getAllUsers = () => {
  return axios.get(API_URL + "all", { headers: authHeader(),timeout:100000 });
};

const getCurrentUser = () => {
    return axios.get(API_URL + "one", { headers: authHeader() });
};

const createCardRequest = (user) => {
  return axios.post(API_URL + "card/req",user, { headers: authHeader() });
};


const UserService = {
  getAllUsers,
  getCurrentUser,
  createCardRequest,
};

export default UserService;