// PaymentForm.js
import React, { useState } from "react";

const PaymentForm = ({ handleCheckout }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name && address && phone) {
      handleCheckout({ name, address, phone }); // Pass form data to the parent
    } else {
      alert("Vui lòng điền đầy đủ thông tin.");
    }
  };

  return (
    <div className="lg:w-1/2 p-5 bg-gray-100 rounded-lg">
      <h3 className="mb-8 pt-2 text-center text-2xl font-bold uppercase">Thanh toán</h3>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Họ và tên</label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nguyen Van A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Trường nhập Address */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Địa chỉ</label>
        <input
          type="text"
          id="address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="123 Đường ABC, Thành phố XYZ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* Trường nhập Phone */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Số điện thoại</label>
        <input
          type="text"
          id="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="0123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {/* Thanh toán */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-10 py-3 rounded-lg bg-gradient-to-l from-sky-500 to-indigo-500 text-white font-semibold"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
