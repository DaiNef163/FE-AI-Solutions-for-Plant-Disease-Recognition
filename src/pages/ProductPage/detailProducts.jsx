import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // State cho ảnh chính
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/product/detail/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setMainImage(response.data.images?.[0] || "default-image.jpg"); // Gán ảnh chính ban đầu
      })
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error));
  }, [productId]);

  const addToCartHandler = () => {
    const token = localStorage.getItem("tokenUser");
    if (!token) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    axios
      .post(
        "/carts/addtocart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        message.success("Sản phẩm đã được thêm vào giỏ hàng!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      });
  };

  if (!product) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="bg-backgroundPageGradient py-8">
      <div className="mx-auto max-w-7xl px-4 ">
        {/* <div><h1 className="text-4xl font-bold text-gray-800 flex text-center justify-center p-3 mb-6">Chi tiết sản phẩm</h1></div> */}
        <div className="flex flex-wrap justify-center items-start gap-12">
          {/* Image Section */}
          <div className="flex-1 w-full md:w-1/2">
            <img
              alt={product.productName}
              className="w-full h-auto rounded-xl object-cover shadow-lg"
              src={mainImage} // Hiển thị ảnh chính
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              {product.productName}
            </h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-semibold text-primary mt-4">
              Giá: {product.price} VND
            </p>
            <p className="text-xl font-semibold mt-2 bg-gradient-to-r from-[#364359] to-[#076f9f] inline-block text-transparent bg-clip-text">
              Tên lá: {product.nameLeaf}  
            </p>
            <p className="text-xl font-semibold text-green-600 mt-2">
              Giảm giá: {product.discount}%
            </p>

            {/* Additional Images */}
            <div className="flex gap-4 mt-6">
              {product.images &&
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className="  w-32 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer"
                    onClick={() => setMainImage(image)} // Đổi ảnh chính khi click
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            <button
              onClick={addToCartHandler}
              className=" mt-12 ml-20 w-full sm:w-auto px-6 py-3  text-white font-semibold rounded-lg shadow-md transition-colors animate-bounce animate-infinite hover:from-[#A1C4FD] hover:to-[#ecc062] bg-gradient-to-r from-[#b2c8ed] to-[#E2D1C3]"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
