import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";
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
  const [isFilterOpen, setIsFilterOpen] = useState(true);

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
    setCurrentPage(1);
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
    <div className="bg-customgradient min-h-screen">
      <div>
        <main className="m-3 rounded-md mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Sản phẩm
            </h1>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filter sidebar */}
              <div className="hidden lg:block">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                    defaultOpen={true}
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-xl text-gray-900">
                              Lọc theo loại lá
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {nameLeaf.map((leaf, idx) => (
                              <div
                                key={idx}
                                className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  id={`filter-category-${idx}`}
                                  checked={selectedLeaf.includes(leaf)}
                                  onChange={() => handleLeafChange(leaf)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <label
                                  htmlFor={`filter-category-${idx}`}
                                  className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                                >
                                  {leaf}
                                </label>
                              </div>
                            ))}
                          </div>
                          {selectedLeaf.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => setSelectedLeaf([])}
                                className="text-sm text-blue-500 hover:text-blue-700"
                              >
                                Xóa bộ lọc
                              </button>
                            </div>
                          )}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>

              <div className="lg:col-span-4 bg-bac">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <div
                      key={product._id}
                      className=" group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                      <Link to={`/product/${product._id}`} className="block">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
                          <img
                            src={product.images?.[0] || "default-image.jpg"}
                            alt={product.productName}
                            className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                            {product.productName}
                          </h3>

                          <div className="mt-2 flex flex-col space-y-1">
                            <p className="text-sm text-gray-500">
                              Số lượng: {product.quantity}
                            </p>
                            <p className="text-lg font-semibold text-orange-600">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(product.price)}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Rate
                              allowHalf
                              defaultValue={4.5}
                              className="text-sm"
                            />
                          </div>

                          <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-md hover:from-teal-600 hover:to-blue-600 transition-colors duration-300 transform hover:-translate-y-0.5">
                            Chi tiết sản phẩm
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={classNames(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      )}
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
