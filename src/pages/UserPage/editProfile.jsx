import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  // Khai báo state cho form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null); // Lưu avatar dưới dạng file

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (avatarUrl) {
      formData.append("avatar", avatarUrl);
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
          },
        }
      );
      console.log("Profile updated:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-20 flex justify-center items-center">
      <div className="w-full max-w-6xl rounded-lg overflow-hidden shadow-lg shadow-emerald-300">
        <h2 className="text-center text-2xl font-bold mb-6">
          Chỉnh sửa thông tin cá nhân
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            <div className="p-2">
              <label className="text-sm font-semibold text-gray-600">Tên</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
                placeholder={formData.name}
              />
            </div>

            <div className="p-2">
              <label className="text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>

            <div className="p-2">
              <label className="text-sm font-semibold text-gray-600">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>

            <div className="p-2">
              <label className="text-sm font-semibold text-gray-600">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>

            <div className="p-2">
              <label className="text-sm font-semibold text-gray-600">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])} // Lưu file khi người dùng chọn
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-emerald-500 text-white py-2 px-4 rounded-lg"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
