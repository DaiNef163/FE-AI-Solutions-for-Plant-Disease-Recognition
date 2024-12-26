import { useContext, useState } from "react";
import { BsBag } from "react-icons/bs";
import { UserContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLeaf } from "react-icons/bi";
import { Dropdown, Space } from "antd";

const Header = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("_id");
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();
    window.location.href = "/";
  };

  const getMenuItems = () => {
    const items = [];

    // if (
    //   user?.role === "admin" ||
    //   user?.role === "staff" ||
    //   user?.role === "customer"
    // ) {
    //   items.push({
    //     key: "5",
    //     label: <Link to="/profile">Trang cá nhân</Link>,
    //   }),
    //     items.push({
    //       key: "6",
    //       label: <Link to="/profile/edit">Sửa trang cá nhân</Link>,
    //     });
    // }
    if (
      user?.role === "admin" ||
      user?.role === "staff" ||
      user?.role === "customer"
    ) {
      items.push({
        key: "1",
        label: <Link to="/HistoryOrder">Lịch sử mua hàng</Link>,
      });
    }
    if (user?.role === "admin" || user?.role === "staff") {
      items.push(
        {
          key: "2",
          label: <Link to="/create-news">Đăng bài viết</Link>,
        },
        {
          key: "3",
          label: <Link to="/create-product">Đăng sản phẩm</Link>,
        }
      );
    }
    if (user?.role === "admin" || user?.role === "staff") {
      items.push(
        {
          key: "4",
          label: <Link to="/maganeproduct">Quản lí sản phẩm</Link>,
        },
        {
          key: "5",
          label: <Link to="/maganePost">Quản lí bài viết</Link>,
        }
      );
    }
    if (user?.role === "admin") {
      items.push({
        key: "6",
        label: <Link to="/maganeUser">Quản lí Người dùng</Link>,
      });
      items.push({
        key: "7",
        label: <Link to="/maganeTreament">Quản lí Treatment</Link>,
      });
    }

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <header className="rounded-sm bg-backgroundHeader ">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-10 ">
        <Link
          className="block text-teal-600 mt-1 animate-rotate-x animate-infinite animate-duration-[2000ms] animate-delay-1000"
          to="/"
        >
          <BiSolidLeaf fontSize={60} />
        </Link>

        <nav className="hidden md:block flex-1">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link to="/" className="text-xl font-medium text-white">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/introductionAI"
                className="text-lg font-medium text-white"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/recognize" className="text-lg font-medium  text-white">
                Chẩn đoán
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-lg font-medium text-white">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/crop" className="text-lg font-medium text-white">
                Quản lí cây trồng
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-lg font-medium text-white">
                Tin tức
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="text-lg font-medium text-white">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/shoppingcart"
                className="text-gray-800 transition hover:text-primary"
              >
                <div>
                  <div className="flex   items-center justify-center space-x-2">
                    <BsBag fontSize={19} />
                    <span>Giỏ hàng</span>
                  </div>
                </div>
              </Link>
              <Dropdown menu={{ items: menuItems }}>
                <Link
                  to="/profile"
                  className="rounded-md bg-gray-100 px-4 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-primary w-40"
                >
                  {user?.name || "Người dùng"}
                </Link>
              </Dropdown>
              <span
                onClick={handleLogout}
                className="cursor-pointer rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#226f29]"
              >
                Đăng xuất
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="rounded-md px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="rounded-md px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
