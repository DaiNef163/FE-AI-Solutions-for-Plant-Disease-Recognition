import { useContext } from "react";
import { BsBag } from "react-icons/bs";
import { UserContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { BiSolidLeaf } from "react-icons/bi";

const Header = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(UserContext);

  console.log("User data:", user?.data);

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setUser(null);
    setIsAuthenticated(false); // Đánh dấu người dùng là chưa xác thực
  };

  return (
    <div className="w-full relative border-b p-1">
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link className="block text-teal-600" to={"/"}>
            <span className="sr-only">Home</span>
            <BiSolidLeaf fontSize={60} />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm ">
                <li>
                  <Link
                    className="text-base text-gray-800 transition hover:text-gray-800/75"
                    to={"/"}
                  >
                    Giới thiệu
                  </Link>
                </li>

                <li
                  className="relative"
                  onMouseEnter={() => setIsHovered(true)}
                >
                  <Link
                    to={"/"}
                    className="text-gray-800 transition hover:text-gray-800/75 cursor-pointer "
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 transition hover:text-gray-800/75"
                    to="/products"
                  >
                    Cửa hàng
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 transition hover:text-gray-800/75"
                    to="/products"
                  >
                    Tin tức
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-800 transition hover:text-gray-800/75 "
                    to="/contact"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <span
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-gray-800 transition hover:text-gray-800/75 cursor-pointer pr-1"
              >
                <BsBag fontSize={19} />
              </span>
              {isAuthenticated ? (
                <div className="sm:flex sm:gap-4">
                  <span className=" rounded-md bg-gray-100 px-4 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block">
                    {user?.email}
                  </span>
                  <span
                    onClick={handleLogout}
                    className="hidden cursor-pointer md:block rounded-md bg-[#2f4550] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1c2930]"
                  >
                    Đăng xuất
                  </span>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link
                    to="/login"
                    className="block rounded-md bg-[#2f4550] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1c2930]"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block"
                    to="/register"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
