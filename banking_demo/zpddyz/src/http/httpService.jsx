import axios from 'axios'

const Login_REST_API_URL = 'http://localhost:9100/auth';

// export const listusers = () => {
//     return axios.get(Login_REST_API_URL)
// };

export const createuser = (user) => {
    return axios.post(Login_REST_API_URL + '/register/save', user)
}

export const loginuser = (user) => {
    return axios.post(Login_REST_API_URL + '/login', user,{timeout:10000})
}

// export const getuserById = (userId) => {
//     return axios.get(Login_REST_API_URL + '/' + userId);
// }

// export const updateuser = (userId, user) => {
//     return axios.put(Login_REST_API_URL + '/' +userId, user);
// }

// export const deleteuser = (userId) => {
//     return axios.delete(Login_REST_API_URL + '/' + userId);
// }