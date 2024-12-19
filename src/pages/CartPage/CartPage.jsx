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

    if (cart?.products && Array.isArray(cart.products)) {
      total = cart.products.reduce((acc, item) => {
        if (item.productId?.price && item.quantity) {
          const price = item.productId.price;
          const discount = item.productId.discount || 0;
          const discountedPrice = price * (1 - discount / 100);
          return acc + discountedPrice * item.quantity;
        }
        return acc;
      }, 0);
    }

    setTotalCost(total);
  };

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("tokenUser");
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
  
    // Kiểm tra địa chỉ và số điện thoại
    if (!address || !phone) {
      alert("Vui lòng nhập đầy đủ địa chỉ và số điện thoại.");
      return;
    }
  
    if (!/^\d{10,15}$/.test(phone)) {
      alert("Số điện thoại không hợp lệ.");
      return;
    }
  
    // Kiểm tra dữ liệu giỏ hàng
    if (!cart?.products || cart.products.length === 0) {
      alert("Giỏ hàng của bạn không có sản phẩm.");
      return;
    }
  
    // Kiểm tra token
    if (!token) {
      alert("Bạn chưa đăng nhập.");
      return;
    }
  
    try {
      // Kiểm tra và chuẩn bị payload
      const payload = {
        totalCost: Math.round(totalCost),
        products: cart.products
          .filter(item => item.productId && item.productId._id)  // Kiểm tra sản phẩm có `productId` và `_id`
          .map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        address,
        phone,
      };
  
      if (payload.products.length === 0) {
        alert("Giỏ hàng không có sản phẩm hợp lệ.");
        return;
      }
  
      const response = await axios.post(
        "/payment",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Kiểm tra phản hồi và chuyển hướng
      if (response.data?.url) {
        window.location.href = response.data.url;  // Điều hướng đến URL thanh toán
        await axios.delete("/carts/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(null);
      } else {
        console.error("Không có URL hợp lệ trong phản hồi.");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
    }
  };
  

  const handleQuantityChange = (productId, delta) => {
    const updatedCart = { ...cart };
    updatedCart.products = updatedCart.products.map((item) => {
      if (item.productId._id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        }
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotalCost(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = { ...cart };
    updatedCart.products = updatedCart.products.filter(
      (item) => item.productId._id !== productId
    );
    setCart(updatedCart);
    calculateTotalCost(updatedCart);
  };

  return (
    <div className="w-4/5 mx-auto p-4">
      {cart ? (
        <section className="h-screen bg-gray-200">
          <div className="container mx-auto py-5 h-full">
            <div className="flex justify-center items-center h-full">
              <div className="w-full">
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row">
                      {/* Products Section */}
                      <div className="lg:w-1/2 p-5">
                        <h3 className="mb-8 pt-2 text-center text-2xl font-bold uppercase">
                          Giỏ hàng
                        </h3>
                        {cart?.products?.map((item) =>
                          item.productId ? (
                            <div
                              className="flex items-center mb-6 shadow-xl"
                              key={item.productId._id}
                            >
                              {item.productId.images?.[0] && (
                                <img
                                  src={item.productId.images[0]}
                                  className="w-24 h-24 object-cover rounded-lg"
                                  alt={item.productId.productName || "Sản phẩm"}
                                />
                              )}
                              <div className="ml-4 flex-grow">
                                <div className="flex justify-between items-center">
                                  <h5 className="text-lg font-semibold text-blue-600">
                                    {item.productId.productName ||
                                      "Tên sản phẩm không có"}
                                  </h5>
                                  <button
                                    className="text-gray-500 hover:text-red-500"
                                    onClick={() =>
                                      handleRemoveItem(item.productId._id)
                                    }
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                                {item.productId.discount !== undefined && (
                                  <p className="text-sm text-gray-500">
                                    Giảm giá: {item.productId.discount}%
                                  </p>
                                )}
                                {item.productId.price && (
                                  <div className="flex items-center mt-2">
                                    <p className="text-lg font-bold mr-6">
                                      {item.productId.price.toLocaleString()}{" "}
                                      VND
                                    </p>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                      <button
                                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.productId._id,
                                            -1
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        type="number"
                                        value={item.quantity}
                                        min="0"
                                        className="w-12 text-center border-l border-r border-gray-300"
                                        readOnly
                                      />
                                      <button
                                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.productId._id,
                                            1
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : null
                        )}

                        <hr className="my-6 border-blue-600" />
                        <div className="flex justify-between p-3 text-white rounded-md bg-gradient-to-tl from-lime-200 via-sky-500 to-violet-500">
                          <h5 className="font-semibold">Tổng tiền:</h5>
                          <h5 className="font-semibold">
                            {totalCost.toLocaleString()} VND
                          </h5>
                        </div>
                      </div>

                      {/* Payment Section */}
                      <div className="lg:w-1/2 p-5 bg-gray-100 rounded-lg">
                        <h3 className="mb-8 pt-2 text-center text-2xl font-bold uppercase">
                          Thanh toán
                        </h3>

                        <div className="mb-6">
                          <label className="block text-gray-700 mb-2">
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nguyen Van A"
                            required
                          />
                        </div>

                        {/* Trường nhập Address */}
                        <div className="mb-6">
                          <label className="block text-gray-700 mb-2">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 Đường ABC, Thành phố XYZ"
                            required
                          />
                        </div>

                        {/* Trường nhập Phone */}
                        <div className="mb-6">
                          <label className="block text-gray-700 mb-2">
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0981234567"
                            required
                          />
                        </div>

                        <div className="flex justify-center">
                          <button
                            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700"
                            onClick={handleCheckout}
                          >
                            Thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default CartPage;
