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
    const { tokenUser, user } = response.data;
    console.log("Login API Response:", response.data);

    localStorage.setItem("tokenUser", tokenUser);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser);

const forgotPassword = () => {
  const URL_API = "/password/forgot";
  const data = {
    email,
  };
  return axios.post(URL_API, data);
};
const createUProductAPi = async (
  productName,
  price,
  description,
  discount,
  images,
  nameLeaf,
  tokenUser
) => {
  try {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("discount", discount);
    formData.append("nameLeaf", nameLeaf);
    formData.append("tokenUser", tokenUser);

    if (images) {
      formData.append("images", images);
    }
    const token = localStorage.getItem("tokenUser");
    const response = await axios.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    const errorMessage =
      error.response?.data?.message || "Lỗi kết nối với server.";
    return { success: false, message: errorMessage };
  }
};
const createPostNewsAPi = async (title, description, images) => {
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (images) {
      formData.append("images", images);
    }
    const token = localStorage.getItem("tokenUser");
    const response = await axios.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    const errorMessage =
      error.response?.data?.message || "Lỗi kết nối với server.";
    return { success: false, message: errorMessage };
  }
};
export {
  createUserApi,
  loginApi,
  forgotPassword,
  createUProductAPi,
  createPostNewsAPi,
};
