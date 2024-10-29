import React, { useState } from "react";
import { TestDataProduct } from "../components/data/products";

const ProductPage = (props) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = ["Xanh", "Đỏ", "Tím", "Vàng"];
  const products = [
    { id: 1, name: "Product 1", color: "Xanh" },
    { id: 2, name: "Product 2", color: "Đỏ" },
    { id: 3, name: "Product 3", color: "Tím" },
    { id: 4, name: "Product 4", color: "Vàng" },
  ];

  const filteredProducts = selectedColor
    ? products.filter((product) => product.color === selectedColor)
    : products;

  return (
    <div className="w-4/5 mx-auto flex">
      <div className="box1 bg-slate-600 w-1/4 h-auto p-4 text-white rounded-lg shadow-md">
        <h3 className="font-bold text-xl mb-4 border-b pb-2">Bộ lọc màu sắc</h3>
        <ul className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <li
              key={color}
              className={`px-4 py-2 rounded-lg text-sm cursor-pointer border ${
                selectedColor === color
                  ? "bg-white text-slate-600 border-blue-500 font-semibold"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </li>
          ))}
          <li
            className="px-4 py-2 rounded-lg text-sm cursor-pointer border bg-red-500 text-white hover:bg-red-600 mt-4"
            onClick={() => setSelectedColor(null)}
          >
            Tất cả
          </li>
        </ul>
      </div>

      <div className="box2  w-3/4 h-max p-4">
        <div className="grid grid-cols-4 p-1">
          {TestDataProduct.map((item) => (
            <div key={item.id} className="p-1">
              {props.children}
              <div className="p-3 border-2 border-indigo-500/75 rounded-lg">
                <img
                  alt=""
                  className="w-full h-4/12 rounded-xl"
                  src={item.image || item.avatar}
                ></img>
                <div className="flex pt-2 ">
                  <div className="flex flex-col justify-start ml-4 ">
                    <h1 className=" text-orange-500 text-xl flex-shrink-0 font-bold ">
                      {item.title}
                    </h1>
                    <p className=" text-blue-500 ">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
