import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/auth.context";

const ProfileUser = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
  useContext(UserContext);
const navigate = useNavigate();

  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-4/5 mx-auto py-8">
      <div className="flex gap-6">
        {/* Avatar */}
        <div className="w-1/4">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-2">Name : {user.name}</h1>
          <p className="text-xl text-gray-600">Email: {user.email}</p>
          <p className="text-xl text-gray-600">Age: {user.age}</p>
          <p className="text-xl text-gray-600">Gender: {user.gender || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
