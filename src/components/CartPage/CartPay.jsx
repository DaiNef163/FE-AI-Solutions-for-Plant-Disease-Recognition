import React, { useState } from "react";
import { MdLocalOffer } from "react-icons/md";
import { formatCurrencyVND } from "../../util/index";
import { Link } from "react-router-dom";

const CartPay = ({ amount, fee, path }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">THANH TOÁN</h1>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{formatCurrencyVND(amount)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí</span>
                    <span>{formatCurrencyVND(fee)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tổng</span>
                    <span>{formatCurrencyVND(amount)}</span>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <span className="material-icons">
                        <MdLocalOffer />
                    </span>
                    <span className="ml-2">Phiếu ưu đãi</span>
                </div>
                <input type="text" className="mt-2 border rounded px-3 py-2 mr-3" placeholder="Mã ưu đãi" />
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                    Áp dụng
                </button>
            </div>
            <Link to={path}>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    TIẾN HÀNH THANH TOÁN
                </button>
            </Link>
        </div>
    );
};

export default CartPay;
