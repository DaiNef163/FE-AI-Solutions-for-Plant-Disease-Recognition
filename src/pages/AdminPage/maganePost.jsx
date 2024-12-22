import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
  
  console.log(productId);
  

  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
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
        ></img>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
      render: (price) => `${price} VND`,
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

  return <Table columns={columns} dataSource={products} rowKey="productId" />;
};

export default MaganePost;