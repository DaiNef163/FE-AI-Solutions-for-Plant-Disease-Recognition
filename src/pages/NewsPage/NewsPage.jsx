import React, { useEffect, useState } from "react";
import axios from "axios";

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
  if (error)
    return <div className="text-red-600 text-center mt-4">{error}</div>;

  if (selectedPost) {
    return (
      <div className="flex flex-col items-center p-4 bg-green-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
          {selectedPost.images && (
            <img
              src={Array.isArray(selectedPost.images) ? selectedPost.images[0] : selectedPost.images}
              alt={selectedPost.title}
              className="w-1/2 mx-auto mb-4 rounded-lg"
            />
          )}
          <h3 className="text-2xl font-bold text-green-700">{selectedPost.title}</h3>
          <p className="text-gray-600 mt-2">{selectedPost.description}</p>
          <button
            onClick={() => setSelectedPost(null)}
            className="mt-4 bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-green-50">
      <div className="relative w-full max-w-5xl mb-8">
        <div className="absolute left-[190px] top-1 bottom-0 w-[2px] bg-green-600 shadow-md"></div>
        <div className="absolute right-[190px] top-1 bottom-0 w-[2px] bg-green-600 shadow-md"></div>
        <div className="absolute left-[192px] top-1 right-[192px] h-[2px] bg-green-600"></div>
        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg border-2 border-green-300 bg-opacity-80">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-2">User Posts</h2>
            <p className="text-lg text-green-500">Explore recent posts by users.</p>
          </div>
        </div>
      </div>

      {news.length > 0 && (
        <div
          className="w-full max-w-5xl mb-8 cursor-pointer"
          onClick={() => setSelectedPost(news[0])}
        >
          <div className="flex items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-xl">
            <img
              src={Array.isArray(news[0].images) ? news[0].images[0] : news[0].images}
              alt={news[0].title}
              className="w-[400px] h-[240px] object-cover mr-4 rounded-lg"
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-green-700 mb-1">{news[0].title}</h4>
              <p className="text-gray-700">
                {truncateText(news[0].description)}
                {news[0].description.length > 100 && (
                  <span className="text-green-600 cursor-pointer"> Read More</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-green-700 mb-4 self-start ml-[200px]">Latest Posts</h3>
      <div className="grid grid-cols-3 gap-4 justify-start w-full max-w-5xl">
        {news.length > 0 &&
          news.slice(1).map((post) => (
            <Card
              key={post._id}
              images={post.images}
              title={post.title}
              description={post.description}
              onClick={() => setSelectedPost(post)}
            />
          ))}
      </div>
    </div>
  );
};

function Card({ images, title, description, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div
      className="w-[240px] bg-white rounded-lg shadow-md hover:shadow-lg p-4 cursor-pointer border border-green-200"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        {images && (
          <img
            src={Array.isArray(images) ? images[0] : images}
            alt={title}
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}
        <h3 className="text-lg font-bold text-green-700 mb-2">{title}</h3>
        <p className="text-gray-600">
          {isExpanded ? description : truncatedDescription}
          {description.length > 100 && (
            <span
              onClick={handleToggle}
              className="text-green-600 cursor-pointer underline ml-1"
            >
              {isExpanded ? " Show Less" : " Read More ."}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default NewsPage;
