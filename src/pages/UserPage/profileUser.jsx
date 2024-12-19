import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/auth.context";

const ProfileUser = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" p-20 flex justify-center items-center ">
      <div className="w-full max-w-6xl rounded-lg overflow-hidden shadow-lg shadow-emerald-300	">
        <div className="flex">
          {/* Profile Section */}
          <div className="w-1/3 bg-backgroundPageGradient text-white flex flex-col items-center justify-center p-5 ">
            <img
              src={
                user.avatar ||
                "https://img.icons8.com/bubbles/100/000000/user.png"
              }
              alt="User-Profile-Image"
              className="w-28 h-28 rounded-full mb-4"
            />
            <h6 className="bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent font-extrabold text-2xl">
              {user.name || "Unknown User"}
            </h6>
            <p className="text-sm bg-gradient-to-l from-gray-400 to-gray-700 bg-clip-text text-transparent font-extrabold">
              {user.role === "customer"
                ? "Khách Hàng"
                : user.role === "staff"
                ? "Nhân Viên"
                : user.role === "admin"
                ? "Admin"
                : ""}
            </p>
          </div>
          {/* Info Section */}
          <div className="w-2/3 p-6">
            <h6 className="text-gray-700 font-bold text-sm border-b pb-2 mb-4 ">
              Thông tin người dùng
            </h6>
            <div className="grid grid-cols-3 justify-between mb-4 p-3">
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">Tên</p>
                <h6 className="text-gray-500 text-sm">{user.name || "N/A"}</h6>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">Email</p>
                <h6 className="text-gray-500 text-sm">{user.email || "N/A"}</h6>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">Tuổi</p>
                <h6 className="text-gray-500 text-sm">{user.age || "N/A"}</h6>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">
                  Số điện thoại
                </p>
                <h6 className="text-gray-500 text-sm">{user.phone || "N/A"}</h6>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">Vai trò</p>
                <h6 className="text-gray-500 text-sm">{user.role || "N/A"}</h6>
              </div>
              <div className="p-2">
                <p className="text-gray-600 text-sm font-semibold">Địa chỉ</p>
                <h6 className="text-gray-500 text-sm">
                  {user.address || "..."}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
