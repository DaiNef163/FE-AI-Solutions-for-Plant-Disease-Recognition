import React, { useEffect, useState } from "react";
import { Space, Table, Typography } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Paragraph } = Typography;

const MaganePost = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/post/viewpostUser")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const truncateText = (text, maxLength = 50) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ maxWidth: 200, margin: 0 }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={images?.[0]}
          alt="product"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ maxWidth: 300, margin: 0 }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/editpost/${record._id}`)}>Sửa</a>
          <a onClick={() => navigate(`/deletepost/${record._id}`)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="_id" />;
};

export default MaganePost;