import axios from "./axios.customize";

const createUserApi = async (
  name,
  age,
  phone,
  gender,
  email,
  password,
  role
) => {
  try {
    const response = await axios.post("/register", {
      name,
      age,
      phone,
      gender,
      email,
      password,
      role,
    });
    console.log("Response từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    return { success: false, message: "Lỗi kết nối với server." };
  }
};

const loginApi = async (email, password) => {
  const URL_API = "/login";
  const data = { email, password };

  try {
    const response = await axios.post(URL_API, data);
    const { access_token, user } = response.data;
    console.log("Login API Response:", response.data);

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser);

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
