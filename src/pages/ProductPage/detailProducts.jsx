import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import axios from "axios";
import { message } from "antd";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/product/detail/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setMainImage(response.data.images?.[0] || "default-image.jpg");
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        message.error("Không thể tải thông tin sản phẩm");
      });
  }, [productId]);

  const addToCartHandler = () => {
    const token = localStorage.getItem("tokenUser");
    if (!token) {
      message.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
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
        navigate("/shoppingcart")
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        message.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Column - Images */}
            <div className="lg:w-3/5">
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                  <img
                    src={mainImage}
                    alt={product.productName}
                    className="w-full h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-3">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-red-50 transition-all duration-300"
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-8">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative rounded-xl overflow-hidden aspect-square transition duration-300 transform hover:scale-105 ${
                      mainImage === image
                        ? "ring-4 ring-blue-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-blue-300 hover:ring-offset-1"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Ảnh ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-2/5 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
                  {product.productName}
                </h1>

                <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-800 bg-clip-text text-transparent">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-lg text-gray-400 line-through">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price * (1 + product.discount / 100))}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-800">
                    <span className="font-semibold">Loại lá:</span>
                    <span>{product.nameLeaf}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={addToCartHandler}
                  className="w-full py-4 px-8 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-300 to-blue-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Thêm vào giỏ hàng
                </button>
                
                {/* <div className="text-center text-sm text-gray-500">
                  Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;