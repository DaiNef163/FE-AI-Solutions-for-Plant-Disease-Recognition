import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectedPost from './SelectedPost'; // Import SelectedPost

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/post/viewpost");
        setNews(response.data);
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const truncateText = (text, length = 100) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;

  return (
    <div className=" bg-gray-50 min-h-screen">
      {selectedPost ? (
        <SelectedPost selectedPost={selectedPost} setSelectedPost={setSelectedPost} /> // Hiển thị bài viết đã chọn
      ) : (
        <>
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Posts</h2>
            <p className="text-lg text-gray-500 mb-4">Explore recent posts by users.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {news.map((post) => (
              <div
                key={post._id}
                className="w-full bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPost(post)} // Chuyển sang bài viết chi tiết
              >
                {post.images && (
                  <img
                    src={Array.isArray(post.images) ? post.images[0] : post.images}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-600">
                  {truncateText(post.description)}
                  {post.description.length > 100 && <span className="text-blue-600"> Read More</span>}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPage;
