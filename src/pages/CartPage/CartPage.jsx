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
      axios
        .get("/carts/viewcart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCart(response.data);
          calculateTotalCost(response.data);
        })
        .catch((error) => console.error("Error fetching cart:", error));

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
      calculateTotalCost(response.data);
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
    setCart(updatedCart);
    calculateTotalCost(updatedCart);
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

  return (
    <div className="w-4/5 mx-auto p-4">
      {cart ? (
        <section className="h-screen bg-gray-50">
          <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
            <CartItems
              cart={cart}
              handleQuantityChange={handleQuantityChange}
              discountAmount={discountAmount}
              totalCost={totalCost}
            />
            <PaymentForm handleCheckout={handleCheckout} />
          </div>
        </section>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default CartPage;
