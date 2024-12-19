import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../components/ShoppingCart/CartContext";
import { Rate } from "antd";

const PRODUCTS_PER_PAGE = 8;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [nameLeaf, setNameLeaf] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    axios
      .get("/product/view")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/leaf/nameLeaf")
      .then((response) => setNameLeaf(response.data))
      .catch((error) => console.error("Error fetching name leaf:", error));
  }, []);

  const handleLeafChange = (leaf) => {
    setSelectedLeaf((prevSelectedLeaf) =>
      prevSelectedLeaf.includes(leaf)
        ? prevSelectedLeaf.filter((item) => item !== leaf)
        : [...prevSelectedLeaf, leaf]
    );
    setCurrentPage(1); // Reset về trang đầu khi lọc
  };

  const filteredProducts = selectedLeaf.length
    ? products.filter((product) => selectedLeaf.includes(product.nameLeaf))
    : products;

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-backgroundPageGradient">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Sản phẩm
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-5">
              <form className="hidden lg:block w-4/5">
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-2xl text-gray-900">
                        Tên các loại lá
                      </span>
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                      />
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {nameLeaf.map((leaf, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`filter-category-${idx}`}
                            name="category"
                            value={leaf}
                            onChange={() => handleLeafChange(leaf)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-category-${idx}`}
                            className="ml-3 text-base text-gray-600"
                          >
                            {leaf}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              <div className="lg:col-span-4">
                <div className="grid grid-cols-4 p-1 gap-1 ">
                  {currentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="p-1 rounded-md bg-gradient-to-br from-teal-400 to-green-500"
                    >
                      <div className="flex h-full w-full items-center justify-center bg-white back">
                        <Link to={`/product/${product._id}`}>
                          <div className="p-3 border-2 border-primary rounded-lg w-full h-80">
                            <img
                              alt={product.productName}
                              className="w-full h-44 object-cover object-center rounded-xl"
                              src={product.images?.[0] || "default-image.jpg"}
                            />
                            <div className="px-2 pt-2">
                              <div className="flex flex-col text-center">
                                <h1 className="text-orange-500 text-xl flex-shrink-0 font-bold">
                                  {product.productName}
                                </h1>
                                <p className="text-gray-600">
                                  Giá: {product.price} VND
                                </p>
                                <p>
                                  <Rate allowHalf defaultValue={4.5} />
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-around pt-2">
                              <Link
                                to={`/product/${product._id}`}
                                className="w-full text-center text-white text-lg px-3 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300"
                              >
                                Chi tiết sản phẩm
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
