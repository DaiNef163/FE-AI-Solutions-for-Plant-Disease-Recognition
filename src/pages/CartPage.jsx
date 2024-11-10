import React, { useEffect, useState } from "react";
import axios from "axios";
import Page404 from "./page404/page404";

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
        <div>
          <h1>Giỏ Hàng</h1>
          <h2>Sản phẩm trong giỏ hàng:</h2>
          <ul>
            {cart.products.map((item) => (
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
            ))}
          </ul>
          <h3>Tổng số sản phẩm: {cart.quantity}</h3>
        </div>
      ) : (
        <Page404></Page404>
      )}
    </div>
  );
};

export default CartPage;
