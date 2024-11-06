import React from "react";
import { formatCurrencyVND } from "../../util/index";
import { CiCircleRemove } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RiSubtractFill } from "react-icons/ri";

function CartItem({ item, onQuantityChange, onItemDelete }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md" />
                <div className="ml-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-500">{item.description}</p>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center mr-4">
                    <span className="text-gray-500">Số lượng:</span>
                    <div className="flex items-center ml-2">
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-100 px-2 py-1 rounded-l-md"
                        >
                            <RiSubtractFill />
                        </button>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                            className="w-12 text-center px-2 py-1 rounded-md"
                        />
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-100 px-2 py-1 rounded-r-md"
                        >
                            <GoPlus />
                        </button>
                    </div>
                </div>
                <div className="text-lg font-medium">{formatCurrencyVND(item.price)}</div>
                <div className="ml-4">
                    <button
                        onClick={() => onItemDelete(item.id)}
                        className="text-red-600 hover:text-green-800 font-semibold text-2xl"
                    >
                        <CiCircleRemove />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
