import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Đường dẫn API
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.slug} className="border rounded-lg shadow-md p-4">
            <img src={product.thumbnails[0]} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">{product.price} $</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
