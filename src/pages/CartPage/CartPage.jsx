import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItems from "./CartItems";
import PaymentForm from "./PaymentForm";
import Page404 from "../page404/page404";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      // Lấy giỏ hàng
      axios
        .get("/carts/viewcart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCart(response.data);
          calculateTotalCost(response.data); // Tính tổng chi phí
        })
        .catch((error) => console.error("Error fetching cart:", error));

      // Lấy thông tin người dùng
      axios
        .get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, []);

  const calculateTotalCost = (cart) => {
    let total = 0;
    let discountAmount = 0;

    if (cart?.products && Array.isArray(cart.products)) {
      total = cart.products.reduce((acc, item) => {
        if (item.productId?.price && item.quantity) {
          const price = item.productId.price;
          const discount = item.productId.discount || 0;
          const discountedPrice = price * (1 - discount / 100);
          const itemTotal = discountedPrice * item.quantity;
          discountAmount += (price - discountedPrice) * item.quantity;
          return acc + itemTotal;
        }
        return acc;
      }, 0);
    }

    setTotalCost(total);
    setDiscountAmount(discountAmount);
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("tokenUser");
    try {
      const response = await axios.put(
        "/carts/update",
        {
          productId,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data);
      calculateTotalCost(response.data); // Tính lại tổng chi phí
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      alert("Không thể cập nhật số lượng sản phẩm.");
    }
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedCart = { ...cart };
    updatedCart.products = updatedCart.products.map((item) => {
      if (item.productId._id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
          updateCartQuantity(item.productId._id, newQuantity);
        }
      }
      return item;
    });
    setCart(updatedCart); // Cập nhật lại giỏ hàng trên giao diện
    calculateTotalCost(updatedCart); // Cập nhật lại tổng chi phí
  };

  const handleCheckout = (userInfo) => {
    if (!cart || !cart.products.length) {
      alert("Giỏ hàng của bạn không có sản phẩm.");
      return;
    }

    navigate("/payment-confirmation", {
      state: {
        cart: {
          products: cart.products,
          totalCost,
          discountAmount,
        },
        userInfo,
      },
    });
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`/carts/remove-item/${productId}`);
      setCart(response.data.cart); // Cập nhật giỏ hàng sau khi xóa sản phẩm
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto p-4 mt-5">
      {cart ? (
        <section className="h-screen bg-gray-50">
          <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
            <CartItems
              cart={cart}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
              discountAmount={discountAmount}
              totalCost={totalCost}
            />
            <PaymentForm handleCheckout={handleCheckout} />
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;
