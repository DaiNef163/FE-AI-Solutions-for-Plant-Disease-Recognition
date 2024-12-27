import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    axios
      .get("/crop")
      .then((response) => setCrops(response.data))
      .catch((error) => console.error("Error fetching crops:", error));
  }, []);
  const statusMapping = {
    healthy: "Cây trồng khỏe mạnh",
    sick: "Cây đang bị bệnh",
    recovered: "Cây đã khỏi bệnh",
  };
  const columns = [
    {
      title: "Tên cây trồng",
      dataIndex: "plantName",
      key: "plantName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (text) => statusMapping[text] || "Không rõ",
    },
    {
      title: "Ngày trồng",
      dataIndex: "plantDate",
      key: "plantDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Lịch sử bệnh",
      key: "illnessHistory",
      render: (_, record) => (
        <ul>
          {record.illnessHistory.map((history, index) => (
            <li key={index}>
              <strong>{history.diseaseName}</strong> -{" "}
              {new Date(history.sickDay).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <span>
          <a
            onClick={() => navigate(`/cropdetail/${record._id}`)} // Điều hướng khi click
            style={{ color: "blue", cursor: "pointer" }}
          >
            Xem chi tiết
          </a>
        </span>
      ),
    },
  ];

  return (
    <div className="m-5">
      <Button
        type="primary"
        onClick={() => navigate("/createillness")}
        style={{ marginBottom: 16 }}
      >
        Thêm bệnh
      </Button>
      <Table dataSource={crops} columns={columns} rowKey="_id" />
    </div>
  );
};

export default CropsPage;
