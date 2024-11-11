import React, { useState } from "react";

import CartItem from "./CartItem"; // Replace with actual path
import { formatCurrencyVND } from "../../util/index";
import ProductDetail from "../../pages/detailProducts";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Change quantity of an item
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Delete item from cart
  const handleItemDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ProductDetail onAddToCart={handleAddToCart} />
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onItemDelete={handleItemDelete}
          />
        ))
      )}
      <div className="text-right mt-4">
        <strong>Tổng cộng: {formatCurrencyVND(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</strong>
      </div>
    </div>
  );
}

export default ShoppingCart;
