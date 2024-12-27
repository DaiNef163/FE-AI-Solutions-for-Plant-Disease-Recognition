import React from "react";

const CartItems = ({
  cart,
  handleRemoveItem,
  handleQuantityChange,
  discountAmount,
  totalCost,
}) => {
  return (
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
                  {item.productId.productName || "Tên sản phẩm không có"}
                </h5>
              </div>
              {item.productId.discount !== undefined && (
                <p className="text-sm text-gray-500">
                  Giảm giá: {item.productId.discount}%
                </p>
              )}
              {item.productId?.price && (
                <div className="flex items-center mt-2">
                  <p className="text-lg font-bold mr-6">
                    {item.productId?.price.toLocaleString()} VND
                  </p>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        handleQuantityChange(item?.productId._id, -1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item?.quantity}
                      min="0"
                      className="w-12 text-center border-l border-r border-gray-300"
                      readOnly
                    />
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        handleQuantityChange(item.productId._id, 1)
                      }
                    >
                      +
                    </button>
                    {/* Nút xóa sản phẩm */}
                    <button
                      className="ml-3 px-3 py-1 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveItem(item?.productId._id)}
                    >
                      <i className="fas fa-trash"></i> Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null
      )}

      <hr className="my-6 border-blue-600" />
      <div>
        <div className="flex justify-between p-3 text-white rounded-md bg-gradient-to-tl from-lime-200 via-sky-500 to-[#b9f372] m-2">
          <h5 className="font-semibold">Giảm giá:</h5>
          <h5 className="font-semibold">
            {discountAmount.toLocaleString()} VND
          </h5>
        </div>
        <div className="flex justify-between p-3 text-white rounded-md bg-gradient-to-tl from-lime-200 via-sky-500 to-violet-500 m-2">
          <h5 className="font-semibold">Tổng tiền:</h5>
          <h5 className="font-semibold">{totalCost.toLocaleString()} VND</h5>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
