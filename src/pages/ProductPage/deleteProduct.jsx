import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteProduct = () => {
  const { productId } = useParams(); // Get the 'productId' from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetch the product details from the API
      axios
        .get(`/product/deleteproduct/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`/product/deleteproduct/${productId}`) // Use DELETE method to delete the product
      .then((response) => {
        alert("Sản phẩm đã được xóa thành công");
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Xác nhận xóa sản phẩm</h2>
      <p>Tên sản phẩm: {product.productName}</p>
      <p>Giá: {product.price}</p>
      <p>Mô tả: {product.description}</p>
      <p>Giảm giá: {product.discount}</p>
      <p>Loại lá: {product.nameLeaf}</p>

      <form onSubmit={handleDelete}>
        <button type="submit">Xóa sản phẩm</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
