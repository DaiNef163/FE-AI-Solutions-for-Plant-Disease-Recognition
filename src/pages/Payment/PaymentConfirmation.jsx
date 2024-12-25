import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const { cart, userInfo } = location.state || {}; // Nhận dữ liệu từ state

    const [paymentMethod, setPaymentMethod] = useState(null); // Trạng thái phương thức thanh toán
    const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý thanh toán

    if (!cart || !userInfo) {
        return <div>Không có dữ liệu thanh toán.</div>;
    }

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method); // Cập nhật phương thức thanh toán đã chọn
    };

    const handleSubmitPayment = async () => {
        setIsProcessing(true);

        const paymentData = {
            cart,
            userInfo,
            paymentMethod,
        };

        try {
            // Gọi API thanh toán
            const response = await axios.post("/payment/cash", paymentData); // Sử dụng phương thức thanh toán tiền mặt
            alert("Thanh toán thành công!");
            // Xóa giỏ hàng và lưu lịch sử đơn hàng
            clearCart();
            saveOrderHistory();
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            alert("Đã xảy ra lỗi trong quá trình thanh toán.");
        } finally {
            setIsProcessing(false);
        }
    };

    const clearCart = () => {
        // Gọi API xóa giỏ hàng (chưa tích hợp thực tế)
        console.log("Giỏ hàng đã được xóa.");
    };

    const saveOrderHistory = () => {
        // Gọi API lưu lịch sử mua hàng (chưa tích hợp thực tế)
        console.log("Lịch sử mua hàng đã được lưu.");
    };

    return (
        <div className="w-4/5 mx-auto p-4">
            <h3 className="text-center text-2xl font-bold mb-6">Thông tin thanh toán</h3>

            {/* Thông tin giỏ hàng */}
            <div className="mb-6">
                <h4 className="text-xl font-semibold">Giỏ hàng</h4>
                {cart?.products.map((item) => (
                    <div key={item.productId?._id} className="flex justify-between mb-4">
                        <span>{item.productId?.productName}</span>
                        <span>
                            {item.quantity} x {item.productId?.price.toLocaleString()} VND
                        </span>
                    </div>
                ))}
            </div>

            {/* Thông tin người dùng */}
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

            {/* Tổng tiền */}
            <div className="flex justify-between mb-6 font-bold">
                <span>Tổng tiền:</span>
                <span>{cart.totalCost.toLocaleString()} VND</span>
            </div>

            {/* Chọn phương thức thanh toán */}
            {paymentMethod === null ? (
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4">Chọn phương thức thanh toán</h4>
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
                    <h4 className="text-xl font-semibold mb-4">Bạn đã chọn: {paymentMethod}</h4>
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
        </div>
    );
};

export default PaymentConfirmation;
