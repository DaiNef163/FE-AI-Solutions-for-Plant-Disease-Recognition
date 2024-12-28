import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd"; // Đã thêm message từ Ant Design để hiển thị thông báo
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    axios
      .get("/crop")
      .then((response) => {
        if (response.data.length === 0) {
          message.warning("Không có cây trồng nào.");
        } else {
          setCrops(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching crops:", error);
        message.error("Lỗi khi lấy dữ liệu cây trồng.");
      });
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
          {Array.isArray(record.illnessHistory) &&
          record.illnessHistory.length > 0 ? (
            record.illnessHistory.map((history, index) => (
              <li key={index}>
                <strong>{history.diseaseName}</strong>
                {history.diseaseName === "Không có"
                  ? "" // Nếu là "Không có", không hiển thị ngày
                  : ` - ${new Date(history.sickDay).toLocaleDateString()}`}
              </li>
            ))
          ) : (
            <li>Không có lịch sử bệnh</li>
          )}
        </ul>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <span>
          <a
            onClick={() => {
              console.log(record._id); // Log ID để kiểm tra
              navigate(`/cropdetail/${record._id}`);
            }} // Điều hướng khi click
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
        Thêm cây
      </Button>
      <Table dataSource={crops} columns={columns} rowKey="_id" />
    </div>
  );
};

export default CropsPage;
