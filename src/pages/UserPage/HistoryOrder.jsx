import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";

function HistoryOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/purchase/view") // API để lấy lịch sử đơn hàng
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: ["info", "name"],
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["info", "phone"],
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["info", "address"],
      key: "address",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (products) =>
        products.map((product, index) => (
          <div key={index}>
            <p>
              {product.productId}: {product.quantity} x ${product.price}
            </p>
          </div>
        )),
    },
    {
      title: "Tổng chi phí",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (cost) => `$${cost.toFixed(2)}`,
    },
    {
      title: "Loại thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Ngày mua",
      dataIndex: "buyDate",
      key: "buyDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h1>Lịch sử Đơn Hàng</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default HistoryOrder;
