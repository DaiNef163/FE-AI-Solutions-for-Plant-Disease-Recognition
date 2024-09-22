import React, { useContext, useEffect, useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth.context";

const Header = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");
  const { auth, setAuth } = useContext(authContext);
  // console.log("check auth", auth.user);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuth({
        isAuthenticated: true,
        user: {
            email: auth?.user?.email,
            name: ""
        },
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: {
            email: "",
            name: ""
        },
      });
    }
  }, [setAuth]);
  
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <Link to={"/"} className="menu-item">
          HomePage
        </Link>
      ),
      key: "home",
      icon: <HomeOutlined className="icon" />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: (
              <Link to={"/users"} className="menu-item">
                Users
              </Link>
            ),
            key: "users",
            icon: <UserOutlined className="icon" />,
          },
        ]
      : []),

    {
      label: `Welcome ${auth?.user?.email}`,

      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.clear("access_token");
                      setAuth({
                        isAuthenticated: false,
                        user: {
                          email: "",
                          name: "",
                        },
                      });
                      navigate("/");
                    }}
                  >
                    Logout
                  </span>
                ),

                key: "logout",
              },
            ]
          : [
              {
                label: (
                  <Link to={"/login"} className="menu-item">
                    Login
                  </Link>
                ),
                key: "login",
              },
            ]),
          ],
        },
      ];      console.log(" log log ",auth.isAuthenticated?.user?.email)

  return (
    <>
      <style>{`
        .header-menu {
          background-color: #f0f0f0; /* Light gray background */
          border-bottom: 2px solid #b0b0b0; /* Lighter border */
          padding: 0 20px;
        }
        .menu-item {
          color: #000000; /* Dark text color */
        }
        .menu-item:hover,
        .ant-menu-item-active,
        .ant-menu-item-selected {
          background-color: #d9d9d9 !important; /* Slightly darker gray on hover */
          color: #000000 !important; /* Keep text dark on hover */
        }
        .icon {
          color: #000000; /* Dark icon color */
        }
      `}</style>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="header-menu"
      />
    </>
  );
};

export default Header;
