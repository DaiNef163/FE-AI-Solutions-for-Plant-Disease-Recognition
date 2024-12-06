import React, { useEffect, useState } from "react";
import axios from "axios";
import Page404 from "../page404/page404";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      axios
        .get("/carts/viewcart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCart(response.data);
          calculateTotalCost(response.data);
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, []);

  const calculateTotalCost = (cart) => {
    let total = 0;

    // Kiểm tra xem có sản phẩm trong giỏ hàng không
    if (cart && cart.products && Array.isArray(cart.products)) {
      cart.products.forEach((item) => {
        // Kiểm tra nếu sản phẩm có thông tin hợp lệ
        if (item.productId && item.productId.price && item.quantity) {
          const price = item.productId.price;
          const discount = item.productId.discount || 0; // Nếu không có giảm giá thì mặc định là 0
          const discountedPrice = price * (1 - discount / 100); // Tính giá sau giảm
          total += discountedPrice * item.quantity;
        }
      });
    }

    console.log("Total cost calculated: ", total); // Debug thông tin tổng tiền
    setTotalCost(total);
  };
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      try {
        const response = await axios.post(
          "/payment",
          { totalCost: Math.round(totalCost), products: cart.products },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Kiểm tra trực tiếp URL từ response.data
        if (response.data) {
          window.location.href = response.data;
          await axios.delete("/carts/clear", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(null)
        } else {
          console.error("Không có URL hợp lệ:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi thanh toán:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {cart ? (
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Giỏ Hàng</h1>
          <h2 className="text-2xl mb-2">Sản phẩm trong giỏ hàng:</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul>
              {cart.products.map((item) =>
                item.productId ? (
                  <li
                    key={item.productId._id}
                    className="flex items-center mb-4"
                  >
                    <img
                      className="w-24 h-24 object-cover mr-4"
                      src={item.productId.images[0]}
                      alt={item.productId.productName}
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">
                        {item.productId.productName}
                      </p>
                      <p className="text-gray-500">
                        Giá: {item.productId.price} VND
                      </p>
                      <p className="text-gray-500">
                        Mô tả: {item.productId.description}
                      </p>
                      <p className="text-gray-500">
                        Giảm giá: {item.productId.discount}%
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                  </li>
                ) : (
                  <li key={item.productId}>
                    <p>Sản phẩm đã bị xóa</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">
              Tổng số sản phẩm:{" "}
              {cart.products.reduce((total, item) => total + item.quantity, 0)}
            </h3>
            <h3 className="text-xl font-semibold mt-2">
              Tổng tiền: {totalCost.toLocaleString()} VND
            </h3>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Thanh toán
            </button>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default CartPage;
