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
          productId: product._id,  // Assuming _id is used for product identification
          quantity: 1,  // Default quantity is 1
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
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-around ">
          <div className="">
            <img
              alt={product.productName}
              className="w-64 h-64 rounded-xl object-cover"
              src={product.images?.[0] || "default-image.jpg"}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{product.productName}</h1>
            <p>{product.description}</p>
            <p>Giá: {product.price} VND</p>
            <p>Tên lá: {product.nameLeaf}</p>
            <p>Giảm giá: {product.discount}</p>
            <div className=" flex">
              {product.images &&
                product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-32 h-32 rounded-lg"
                    />
                  </div>
                ))}
            </div>
            <button
              onClick={addToCartHandler}
              className="text-lg px-3 bg-primary mx-1 rounded-2xl"
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
