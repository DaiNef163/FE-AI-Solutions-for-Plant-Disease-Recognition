import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/auth.context";
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button } from "antd";
import axios from "axios";

const ProfileUser = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/profile");
    } else {
      // Gọi API để lấy thông tin người dùng
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/user/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenUser")}`, // Gửi token JWT
            },
          });
          setUserInfo(response.data); // Lưu thông tin người dùng vào state
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            age: response.data.age || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = async () => {
    try {
      const response = await axios.put("/user/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
        },
      });
      if (response.status === 200) {
        message.success("Thông tin đã được cập nhật!");
        setIsEditing(false);
        window.location.reload(); // Reload lại trang
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra. Không thể cập nhật thông tin.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-20 flex justify-center items-center">
      <div className="w-full max-w-6xl rounded-lg overflow-hidden shadow-lg shadow-emerald-300">
        <div className="flex">
          {/* Profile Section */}
          <div className="w-1/3 bg-backgroundPageGradient text-white flex flex-col items-center justify-center p-5">
            <img
              src={
                userInfo.avatar ||
                "https://img.icons8.com/bubbles/100/000000/user.png"
              }
              alt="User-Profile-Image"
              className="w-28 h-28 rounded-full mb-4"
            />
            <h6 className="bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent font-extrabold text-2xl">
              {userInfo.name || "Unknown User"}
            </h6>
            <p className="text-sm bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent font-extrabold">
              {userInfo.role === "customer"
                ? "Khách Hàng"
                : userInfo.role === "staff"
                ? "Nhân Viên"
                : userInfo.role === "admin"
                ? "Admin"
                : ""}
            </p>
            <Button
              onClick={handleEdit}
              className="mt-4 bg-blue-500 text-white"
            >
              Chỉnh sửa
            </Button>
          </div>

          {/* Info Section */}
          <div className="w-2/3 p-6">
            <h6 className="text-gray-700 font-bold text-sm border-b pb-2 mb-4">
              Thông tin người dùng
            </h6>

            {isEditing ? (
              <Form layout="vertical" onFinish={handleSave}>
                <Form.Item
                  label="Họ và Tên"
                  name="name"
                  initialValue={formData.name}
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={formData.email}
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Tuổi"
                  name="age"
                  initialValue={formData.age}
                  rules={[
                    { required: true, message: "Vui lòng nhập tuổi!" },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Tuổi phải là một số hợp lệ!",
                    },
                  ]}
                >
                  <Input
                    value={formData.age}
                    name="age"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  initialValue={formData.phone}
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Số điện thoại phải có 10 đến 11 chữ số!",
                    },
                  ]}
                >
                  <Input
                    value={formData.phone}
                    name="phone"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <div className="flex justify-between">
                  <Button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500 text-white"
                  >
                    Lưu
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="grid grid-cols-3 justify-between mb-4 p-3">
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">
                    Họ và Tên
                  </p>
                  <h6 className="text-gray-500 text-sm">
                    {userInfo.name || "N/A"}
                  </h6>
                </div>
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">Email</p>
                  <h6 className="text-gray-500 text-sm">
                    {userInfo.email || "N/A"}
                  </h6>
                </div>
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">Tuổi</p>
                  <h6 className="text-gray-500 text-sm">{userInfo.age || "N/A"}</h6>
                </div>
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">
                    Số điện thoại
                  </p>
                  <h6 className="text-gray-500 text-sm">
                    {userInfo.phone || "N/A"}
                  </h6>
                </div>
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">Vai trò</p>
                  <h6 className="text-gray-500 text-sm">
                    {userInfo.role || "N/A"}
                  </h6>
                </div>
                <div className="p-2">
                  <p className="text-gray-600 text-sm font-semibold">Địa chỉ</p>
                  <h6 className="text-gray-500 text-sm">
                    {userInfo.address || "..."}
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
