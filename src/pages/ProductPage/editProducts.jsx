import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams(); // Lấy tham số 'id' từ URL
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    discount: "",
    nameLeaf: "",
    images: null,
  });

  useEffect(() => {
    if (productId) {
      // Lấy thông tin sản phẩm từ API bằng 'id'
      axios
        .get(`/product/editproduct/${productId}`)
        .then((response) => {
          setProduct(response.data);
          // Cập nhật formData khi dữ liệu sản phẩm đã được lấy
          setFormData({
            productName: response.data.productName || "",
            price: response.data.price || "",
            description: response.data.description || "",
            discount: response.data.discount || "",
            nameLeaf: response.data.nameLeaf || "",
            images: null, // giữ hình ảnh riêng biệt
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productId", productId); 
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData.images) {
        Array.from(formData.images).forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
      }
    });

    axios
      .post(`/product/editproduct`, data) // Gửi yêu cầu PUT (cập nhật) đến API
      .then((response) => alert("Cập nhật thành công"))
      .catch((error) => console.error("Error updating product:", error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <form key={""} onSubmit={handleSubmit}>
      <label>
        Tên sản phẩm:
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Giá:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Mô tả:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Giảm giá:
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Loại lá:
        <input
          type="text"
          name="nameLeaf"
          value={formData.nameLeaf}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Hình ảnh:
        <input type="file" name="images" multiple onChange={handleImageChange} />
      </label>
      <button type="submit">Cập nhật</button>
    </form>
  );
};

export default EditProduct;
