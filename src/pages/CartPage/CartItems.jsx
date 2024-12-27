import React from "react";
import { Trash2 } from "lucide-react";

const CartItems = ({
  cart,
  handleRemoveItem,
  handleQuantityChange,
  totalCost,
}) => {
  return (
    <div className="lg:w-1/2 p-6">
      <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Giỏ hàng của bạn
      </h3>
      
      <div className="space-y-6">
        {cart?.products?.map((item) =>
          item.productId ? (
            <div
              className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
              key={item.productId._id}
            >
              <div className="flex gap-4">
                {item.productId.images?.[0] && (
                  <img
                    src={item.productId.images[0]}
                    className="w-32 h-32 object-cover rounded-lg"
                    alt={item.productId.productName || "Sản phẩm"}
                  />
                )}
                
                <div className="flex-grow space-y-3">
                  <div className="flex justify-between items-start">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {item.productId.productName || "Tên sản phẩm không có"}
                    </h5>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">
                      {item.productId?.price?.toLocaleString()} VND
                    </p>

                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                        <button
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item?.productId._id, -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item?.quantity}
                          min="0"
                          className="w-16 text-center bg-white border-x border-gray-200 py-2"
                          readOnly
                        />
                        <button
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item.productId._id, 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="ml-4 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleRemoveItem(item?.productId._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>

      {cart?.products?.length > 0 && (
        <>
          <div className="my-8 border-t border-gray-200"></div>
          
          <div className="bg-gradient-to-r to-teal-300 from-blue-400 rounded-xl shadow-lg p-6 text-white">
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-semibold">Tổng tiền:</h5>
              <h5 className="text-2xl font-bold">
                {totalCost.toLocaleString()} VND
              </h5>
            </div>
          </div>
        </>
      )}

      {(!cart?.products || cart.products.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          Giỏ hàng của bạn đang trống
        </div>
      )}
    </div>
  );
};

export default CartItems;