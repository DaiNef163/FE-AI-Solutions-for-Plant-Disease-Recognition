import { useContext, useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import axios from "axios";
import { authContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { BiSolidLeaf } from "react-icons/bi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, handleLogout } = useContext(authContext);
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const name = user?.data?.name;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res?.data?.data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full relative border-b p-1">
      <header className="bg-white ">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link className="block text-teal-600" to={"/"}>
            <span className="sr-only">Home</span>
            <BiSolidLeaf fontSize={60} />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm " >
                <li className="">
                  <Link
                    className=" text-base text-gray-800 transition hover:text-gray-800/75  "
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
                    className="text-gray-800 transition hover:text-gray-800/75 "
                    to="/products"
                  >
                    Cửa hàng
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 transition hover:text-gray-800/75 "
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
              {user?.data ? (
                <div className="sm:flex sm:gap-4">
                  <span className="hidden rounded-md bg-gray-100 px-4 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block">
                    {name}
                  </span>
                  <span
                    onClick={handleLogout}
                    className="hidden cursor-pointer md:block rounded-md bg-[#2f4550] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1c2930] "
                  >
                    Đăng xuất
                  </span>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link
                    to="/loginpage"
                    className="block rounded-md bg-[#2f4550] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1c2930] "
                  >
                    Đăng nhập
                  </Link>

                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block"
                    to="/signupPage"
                  >
                    Đăng kí
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
