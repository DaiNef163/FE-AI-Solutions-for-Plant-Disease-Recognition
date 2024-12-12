import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/product/detail/${productId}`)
      .then((response) => setProduct(response.data))
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
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
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
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-wrap justify-center items-start gap-12">
          {/* Image Section */}
          <div className="flex-1 w-full md:w-1/2">
            <img
              alt={product.productName}
              className="w-full h-auto rounded-xl object-cover shadow-lg"
              src={product.images?.[0] || "default-image.jpg"}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">{product.productName}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-semibold text-primary mt-4">Giá: {product.price} VND</p>
            <p className="text-sm text-gray-500 mt-2">Tên lá: {product.nameLeaf}</p>
            <p className="text-lg text-green-600 mt-2">Giảm giá: {product.discount}</p>

            {/* Additional Images */}
            <div className="flex gap-4 mt-6">
              {product.images &&
                product.images.map((image, index) => (
                  <div key={index} className="w-32 h-32 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCartHandler}
              className="mt-6 w-full sm:w-auto px-6 py-3 bg-backgroundPageGradient text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-colors animate-bounce animate-infinite"
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
