import { useEffect, useState } from "react";
import axios from "axios";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/carts/viewcart")
      .then((response) => {
        setCart(response.data.items || []); 
      })
      .catch((error) => {
        console.error("Lỗi khi lấy giỏ hàng", error);
      });
  }, []);

  const addToCart = (productId, quantity) => {
    axios
      .post("/carts/addtocart", { productId, quantity })
      .then((response) => {
        setCart(response.data.items || []); 
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng", error);
      });
  };

  return { cart, addToCart };
};
