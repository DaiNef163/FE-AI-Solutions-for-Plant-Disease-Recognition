import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const MaganeProduct = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/product/maganeview")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`/product/deleteproduct/${productId}`)
      .then(() => {
        message.success("Sản phẩm đã được xóa!");
        // Remove the deleted product from the list in the state
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        message.error("Xóa sản phẩm thất bại!");
        console.error("Error deleting product:", error);
      });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
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
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => `${quantity}`,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} VND`,
    },
    {
      title: "Loại cây",
      dataIndex: "nameLeaf",
      key: "nameLeaf", // sửa lại key đúng
      render: (nameLeaf) => `${nameLeaf}`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        const maxLength = 200; // Set maximum length for truncation
        const truncatedText =
          text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
        return <Tooltip title={text}>{truncatedText}</Tooltip>;
      },
      width: 300, // Set the width here
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/editproduct/${record._id}`)}>
            <Button icon={<EditOutlined />} className="mr-2" />
          </a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table className="m-5" columns={columns} dataSource={products} rowKey="_id" />; // sửa rowKey thành _id
};

export default MaganeProduct;
