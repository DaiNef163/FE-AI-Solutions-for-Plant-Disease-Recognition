import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
  const URL_API = "/register";
  const data = {
    name,
    email,
    password,
  };
  return axios.post(URL_API, data);
};
const loginApi = (email, password) => {
  const URL_API = "/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};
const getUserApi = () => {
  const URL_API = "/user";
  return axios.get(URL_API);
};
const forgotPassword = () => {
  const URL_API = "/password/forgot";
  const data = {
    email,
  };
  return axios.post(URL_API, data);
};

export { createUserApi, loginApi, getUserApi, forgotPassword };
