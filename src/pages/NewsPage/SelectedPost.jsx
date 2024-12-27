import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Title, Text } = Typography;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SelectedPost = ({ selectedPost, setSelectedPost, fetchUserByToken }) => {
  const [authorName, setAuthorName] = useState("Loading...");

  useEffect(() => {
    const loadUserInfo = async () => {
      if (selectedPost?.tokenUser) {
        try {
          const userInfo = await fetchUserByToken(selectedPost.tokenUser);
          setAuthorName(userInfo.name || "Anonymous");
        } catch (error) {
          console.error("Error fetching user info:", error);
          setAuthorName("Anonymous");
        }
      }
    };

    loadUserInfo();
  }, [selectedPost?.tokenUser, fetchUserByToken]);

  if (!selectedPost) return null;

  return (
    <div className="min-h-screen bg-backgroundPageGradient">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="m-5">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Quay lại
            </Button>
          </div>
          <div className="p-8">
            {/* Title and Meta Information */}
            <Title level={1} className="text-3xl font-bold text-gray-800 mb-4">
              {selectedPost.title}
            </Title>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockCircleOutlined />
                <span>{formatDate(selectedPost.createdAt)}</span>
              </div>
            </div>

            {/* Hero Image */}
            {selectedPost.images && selectedPost.images.length > 0 && (
              <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                <img
                  src={selectedPost.images[0]}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <Text className="text-gray-600 leading-relaxed text-lg block mb-6">
                {selectedPost.description}
              </Text>

              {selectedPost.content && (
                <div
                  className="mt-6"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              )}
            </div>

            {/* Comments Section */}
            {selectedPost.comments && selectedPost.comments.length > 0 && (
              <div className="mt-8 border-t pt-8">
                <Title level={3} className="mb-4">
                  Bình luận
                </Title>
                <div className="space-y-4">
                  {selectedPost.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      {/* Add comment rendering here when you have the comment structure */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPost;
