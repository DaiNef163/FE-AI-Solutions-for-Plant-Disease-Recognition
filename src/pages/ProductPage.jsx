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
import { useCart } from "../components/CartPage/CartContext";

const sortOptions = [
  { name: "Phổ biến nhất", href: "#", current: true },
  { name: "Xếp hạng cao nhất", href: "#", current: false },
  { name: "Mới nhất", href: "#", current: false },
  { name: "Giá: Thấp đến Cao", href: "#", current: false },
  { name: "Giá: Cao đến Thấp", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  const [products, setProducts] = useState([]);
  const [nameLeaf, setNameLeaf] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("/product/view")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/product/nameLeaf")
      .then((response) => setNameLeaf(response.data))
      .catch((error) => console.error("Error fetching name leaf:", error));
  }, []);

  const handleLeafChange = (leaf) => {
    setSelectedLeaf((prevSelectedLeaf) =>
      prevSelectedLeaf.includes(leaf)
        ? prevSelectedLeaf.filter((item) => item !== leaf)
        : [...prevSelectedLeaf, leaf]
    );
  };

  const filteredProducts = selectedLeaf.length
    ? products.filter((product) => selectedLeaf.includes(product.nameLeaf))
    : products;

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Sản phẩm
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-5">
              <form className="hidden lg:block w-4/5">
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
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
                <div className="grid grid-cols-4 p-1">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="p-1">
                      <Link to={`/product/${product._id}`}>
                        <div className="p-3 border-2 border-primary rounded-lg w-full h-80">
                          <img
                            alt={product.productName}
                            className="w-full h-44 object-cover object-center rounded-xl"
                            src={product.images?.[0] || "default-image.jpg"}
                          />
                          <div className="flex pt-2">
                            <div className="flex flex-col justify-start ml-4">
                              <h1 className="text-orange-500 text-xl flex-shrink-0 font-bold">
                                {product.productName}
                              </h1>
                              <p className="text-blue-500 text-xs">
                                {product.description}
                              </p>
                              <p className="text-gray-600">
                                Giá: {product.price} VND
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-around pt-2">
                            <Link
                              to={`/product/${product._id}`}
                              className="text-lg px-3 bg-primary mx-1 rounded-2xl"
                            >
                              Chi tiết
                            </Link>
                            <button
                              onClick={() => addToCart(product._id, 1)}
                              className="text-lg px-3 bg-primary mx-1 rounded-2xl"
                            >
                              Mua hàng
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
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
