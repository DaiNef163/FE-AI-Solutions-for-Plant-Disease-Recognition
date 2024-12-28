import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItems = ({
  cart,
  handleRemoveItem,
  handleQuantityChange,
  totalCost,
}) => {
  // Sửa lại hàm handleInputChange để xử lý trực tiếp giá trị mới
  const handleInputChange = (productId, e) => {
    const value = e.target.value;
    // Chỉ chấp nhận số nguyên dương hoặc rỗng
    if (value === '' || /^\d+$/.test(value)) {
      const newValue = value === '' ? 0 : parseInt(value);
      const currentQuantity = cart.products.find(
        item => item.productId._id === productId
      )?.quantity || 0;
      const change = newValue - currentQuantity;
      handleQuantityChange(productId, change);
    }
  };

  return (
    <div className="lg:w-1/2 p-6">
      <h3 className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
        Giỏ hàng của bạn
      </h3>
      
      <div className="space-y-6">
        {cart?.products?.map((item) =>
          item.productId ? (
            <div
              className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl border border-gray-100"
              key={item.productId._id}
            >
              <div className="flex gap-4">
                {item.productId.images?.[0] && (
                  <img
                    src={item.productId.images[0]}
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
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
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
                      {item.productId?.price?.toLocaleString()} VND
                    </p>

                    <div className="flex items-center">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative flex items-center bg-white rounded-lg overflow-hidden">
                          <button
                            className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200
                            border-r border-gray-200 focus:outline-none focus:bg-gray-50"
                            onClick={() => handleQuantityChange(item.productId._id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <input
                            type="text" // Đổi type thành text để dễ kiểm soát hơn
                            value={item?.quantity || ''} // Thêm fallback cho giá trị undefined
                            onChange={(e) => handleInputChange(item.productId._id, e)}
                            className="w-16 text-center bg-white py-2
                            focus:outline-none"
                          />
                          
                          <button
                            className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200
                            border-l border-gray-200 focus:outline-none focus:bg-gray-50"
                            onClick={() => handleQuantityChange(item.productId._id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        className="ml-4 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300
                        hover:shadow-md hover:scale-105 active:scale-95"
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
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h5 className="text-xl font-semibold text-gray-800">Tổng tiền:</h5>
                <h5 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
                  {totalCost.toLocaleString()} VND
                </h5>
              </div>
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