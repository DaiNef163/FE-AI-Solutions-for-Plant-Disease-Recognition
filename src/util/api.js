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
const createUProductAPi = async (
  productName,
  price,
  description,
  discount,
  images,
  nameLeaf
) => {
  try {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("discount", discount);
    formData.append("nameLeaf", nameLeaf); // Chỉ truyền nameLeaf

    // Kiểm tra nếu có ảnh và thêm vào formData
    if (images) {
      formData.append("images", images); // Chỉ khi images có giá trị
    }

    const token = localStorage.getItem("tokenUser");

    // Gửi yêu cầu POST với FormData
    const response = await axios.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo Content-Type là multipart/form-data
        Authorization: `Bearer ${token}`, // Nếu có token
      },
    });

    console.log("Response từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);

    // Nếu có lỗi từ server, hiển thị thông báo cụ thể
    const errorMessage =
      error.response?.data?.message || "Lỗi kết nối với server.";
    return { success: false, message: errorMessage };
  }
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  forgotPassword,
  createUProductAPi,
};
