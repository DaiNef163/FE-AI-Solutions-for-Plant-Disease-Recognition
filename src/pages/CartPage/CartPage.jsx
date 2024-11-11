import React, { useEffect, useState } from "react";
import axios from "axios";
import Page404 from "../page404/page404";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      axios
        .get("/carts/viewcart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCart(response.data))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, []);

  return (
    <div>
      {cart ? (
        <div className="flex flex-col">
          <h1>Giỏ Hàng</h1>
          <h2>Sản phẩm trong giỏ hàng:</h2>
          <div>
            <ul>
              {cart.products.map((item) =>
                item.productId ? (
                  <li key={item.productId._id}>
                    <img
                      className="w-64 h-64"
                      src={item.productId.images[0]}
                      alt={item.productId.productName}
                    />
                    <p>Tên sản phẩm: {item.productId.productName}</p>
                    <p>Giá: {item.productId.price}</p>
                    <p>Mô tả: {item.productId.description}</p>
                    <p>Giảm giá: {item.productId.discount}%</p>
                    <p>Số lượng: {item.quantity}</p>
                  </li>
                ) : (
                  <li key={item.productId}>
                    <p>Sản phẩm đã bị xóa</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3>
              Tổng số sản phẩm:{" "}
              {cart.products.reduce((total, item) => total + item.quantity, 0)}
            </h3>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default CartPage;
