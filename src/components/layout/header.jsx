import { useContext, useState } from "react";
import { BsBag } from "react-icons/bs";
import { UserContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLeaf } from "react-icons/bi";
import { pathname } from "../../config/path";

const Header = () => {
    const { user, isAuthenticated, setUser, setIsAuthenticated } = useContext(UserContext);
    // const [isCartOpen, setIsCartOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = (ev) => {
        ev.preventDefault();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
    };
    console.log("check user?.name", user?.name);
    console.log("check localStorage.getItem(user)", localStorage.getItem("user"));
    console.log("Stored user:", localStorage.getItem("user"));

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
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link
                                        className="text-base text-gray-800 transition hover:text-primary hover:text-xl hover:font-bold"
                                        to={pathname.home}
                                    >
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={pathname.product}
                                        className="text-gray-800 transition hover:text-gray-800/75 cursor-pointer hover:text-primary hover:text-xl hover:font-bold"
                                    >
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-gray-800 transition hover:text-gray-800/75 hover:text-primary hover:text-xl hover:font-bold"
                                        to="/shop"
                                    >
                                        Cửa hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-gray-800 transition hover:text-gray-800/75 hover:text-primary hover:text-xl hover:font-bold"
                                        to="/news"
                                    >
                                        Tin tức
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-gray-800 transition hover:text-gray-800/75 hover:text-primary hover:text-xl hover:font-bold"
                                        to="/contacts"
                                    >
                                        Liên hệ
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link
                                // onClick={() => setIsCartOpen(!isCartOpen)}
                                to={pathname.cart}
                                className="text-gray-800 transition hover:text-gray-800/75 cursor-pointer pr-1"
                            >
                                <BsBag fontSize={19} />
                            </Link>

                            {isAuthenticated ? (
                                <div className="sm:flex sm:gap-4">
                                    <Link
                                        to={pathname.profile}
                                        className="rounded-md bg-gray-100 px-4 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block"
                                    >
                                        {user?.name || "Người dùng"}
                                    </Link>
                                    <span
                                        onClick={handleLogout}
                                        className="hidden cursor-pointer md:block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#226f29]"
                                    >
                                        Đăng xuất
                                    </span>
                                </div>
                            ) : (
                                <div className="sm:flex sm:gap-4">
                                    <Link
                                        to={pathname.login}
                                        className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1c2930]"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#2f4550] transition hover:text-[#2f4550]/75 sm:block"
                                        to={pathname.signup}
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
