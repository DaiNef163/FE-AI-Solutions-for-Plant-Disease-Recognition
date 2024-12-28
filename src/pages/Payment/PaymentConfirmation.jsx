import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { message, notification } from "antd";

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, userInfo } = location.state || {}; // Get cart and user info from location state

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // If no cart or user info is passed, display error
  if (!cart || !userInfo) {
    return <div>Không có dữ liệu thanh toán.</div>;
  }

  // Handle selecting payment method
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method); // Update the selected payment method
  };

  // Handle submitting the payment
  const handleSubmitPayment = async () => {
    setIsProcessing(true);

    const paymentData = {
      cart,
      userInfo,
      paymentMethod,
    };

    if (paymentMethod === "Tiền mặt") {
      // Call backend API for cash payment
      try {
        const response = await axios.post("/payment/cash", paymentData);
        if (response.data && response.data.success) {
          // Thanh toán thành công
          clearCart();
          saveOrderHistory();
          alert("Thanh toán khi nhận hàng thành công!");
          navigate("/order-success");
        } else {
          // Thanh toán không thành công
          alert("Thanh toán khi nhận hàng không thành công!");
          navigate("/shoppingcart");
        }
      } catch (error) {
        console.error("Lỗi thanh toán tiền mặt:", error);
        alert("Đã xảy ra lỗi trong quá trình thanh toán tiền mặt.");
        navigate("/shoppingcart"); // Quay lại trang giỏ hàng khi có lỗi
      }
    } else {
      // Handle online payment
      await handleOnlinePayment(paymentData);
    }

    setIsProcessing(false);
  };

  const handleOnlinePayment = async (paymentData) => {
    try {
      const response = await axios.post("/payment/online", paymentData);

      console.log(response.data);

      if (response.data && response.data.order_url) {
        console.log("Order URL:", response.data.order_url);
        window.location.href = response.data.order_url;
      } else {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error("Lỗi thanh toán ví điện tử:", error);
      notification.warning({
        message: "Số lượng không đủ",
        description: "Vui lòng chỉnh sửa số lượng sản phẩm.",
      });
      navigate("/shoppingcart"); // Quay lại trang giỏ hàng khi có lỗi
    }
  };

  console.log("Total cost in frontend: ", cart.totalCost);

  // Clear cart after successful payment
  const clearCart = () => {
    console.log("Giỏ hàng đã được xóa.");
  };

  // Save order history after successful payment
  const saveOrderHistory = () => {
    console.log("Lịch sử mua hàng đã được lưu.");
  };

  // Handle "Back to shopping cart"
  const handleBackToCart = () => {
    navigate("/shoppingcart");
  };

  return (
    <div className="w-4/5 mx-auto p-4">
      <h3 className="text-center text-2xl font-bold mb-6">
        Thông tin thanh toán
      </h3>

      {/* Cart details */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Giỏ hàng</h4>
        {cart.products.map((item) => (
          <div key={item.productId?._id} className="flex justify-between mb-4">
            <span>{item?.productId?.productName}</span>
            <span>
              {item.quantity} x {item.productId?.price.toLocaleString()} VND
            </span>
          </div>
        ))}
      </div>

      {/* User info */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Thông tin người nhận</h4>
        <div className="flex justify-between mb-2">
          <span>Họ và tên:</span>
          <span>{userInfo.name}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Địa chỉ:</span>
          <span>{userInfo.address}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Số điện thoại:</span>
          <span>{userInfo.phone}</span>
        </div>
      </div>

      {/* Total cost */}
      <div className="flex justify-between mb-6 font-bold">
        <span>Tổng tiền:</span>
        <span>{cart.totalCost.toLocaleString()} VND</span>
      </div>

      {/* Payment method selection */}
      {paymentMethod === null ? (
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4">
            Chọn phương thức thanh toán
          </h4>
          <div className="space-y-4">
            <button
              onClick={() => handlePaymentMethodSelect("Tiền mặt")}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Thanh toán khi nhận hàng
            </button>
            <button
              onClick={() => handlePaymentMethodSelect("Ví điện tử")}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg"
            >
              Thanh toán qua ví điện tử
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4">
            Bạn đã chọn: {paymentMethod}
          </h4>
          <div className="flex justify-center">
            <button
              onClick={handleSubmitPayment}
              className="px-10 py-3 rounded-lg bg-gradient-to-l from-sky-500 to-indigo-500 text-white font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </div>
        </div>
      )}

      {/* Back to cart button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleBackToCart}
          className="px-10 py-3 rounded-lg bg-gray-500 text-white font-semibold"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
