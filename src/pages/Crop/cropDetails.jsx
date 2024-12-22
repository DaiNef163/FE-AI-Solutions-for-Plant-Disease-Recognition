import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { Table, Button, Form, Input, DatePicker, message, Spin, Select } from "antd";
import axios from "axios";

const CropDetails = () => {
  const { cropId } = useParams(); // Lấy cropId từ URL
  const [crop, setCrop] = useState(null);
  const [illnessHistory, setIllnessHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch thông tin chi tiết cây trồng
  const fetchCropDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/crop/detail/${cropId}`);
      setCrop(data);
      setIllnessHistory(data.illnessHistory || []);
    } catch (error) {
      message.error("Failed to fetch crop details");
    } finally {
      setLoading(false);
    }
  };

  // Khi component mount hoặc cropId thay đổi, gọi fetchCropDetails
  useEffect(() => {
    fetchCropDetails();
  }, [cropId]);

  // Hàm xử lý thêm bệnh mới vào lịch sử bệnh
  const handleAddIllness = async (values) => {
    try {
      const illnessData = {
        illnessHistory: [
          {
            diseaseName: values.diseaseName,
            sickDay: values.sickDay.format("YYYY-MM-DD"), // Định dạng ngày
          },
        ],
        status: values.status,  // Gửi status cùng với illnessHistory
      };

      // Gửi yêu cầu PATCH để cập nhật bệnh và status vào cây trồng
      await axios.patch(`/crop/update/${cropId}`, illnessData);

      // Cập nhật lại lịch sử bệnh và status trong state
      setIllnessHistory((prevIllnessHistory) => [
        ...prevIllnessHistory,
        { diseaseName: values.diseaseName, sickDay: values.sickDay.format("YYYY-MM-DD") },
      ]);
      setCrop((prevCrop) => ({
        ...prevCrop,
        status: values.status, // Cập nhật status trong state
      }));

      message.success("Illness history and status updated successfully!");
    } catch (error) {
      message.error("Failed to update illness history and status");
    }
  };

  // Cột cho bảng lịch sử bệnh
  const illnessColumns = [
    { title: "Disease Name", dataIndex: "diseaseName", key: "diseaseName" },
    {
      title: "Sick Day",
      dataIndex: "sickDay",
      key: "sickDay",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  // Nếu dữ liệu đang tải, hiển thị loading spinner
  if (loading) return <Spin tip="Loading crop details..." />;

  return (
    <div>
      <h2>{crop.name} - {crop.type}</h2>
      {/* Bảng lịch sử bệnh */}
      <Table dataSource={illnessHistory} columns={illnessColumns} rowKey="_id" />
      
      {/* Form thêm bệnh mới */}
      <Form onFinish={handleAddIllness}>
        <Form.Item name="diseaseName" label="Disease Name" rules={[{ required: true, message: "Enter disease name" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="sickDay" label="Sick Day" rules={[{ required: true, message: "Enter sick day" }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Select status" }]}>
          <Select>
            <Select.Option value="healthy">Healthy</Select.Option>
            <Select.Option value="sick">Sick</Select.Option>
            <Select.Option value="recovered">Recovered</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Add Illness</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CropDetails;
