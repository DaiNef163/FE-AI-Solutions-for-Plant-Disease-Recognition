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
              onClick={""}
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
