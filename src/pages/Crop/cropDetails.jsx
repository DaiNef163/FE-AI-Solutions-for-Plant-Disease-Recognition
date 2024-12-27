import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams
import {
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  message,
  Spin,
  Select,
} from "antd";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
        status: values.status, // Gửi status cùng với illnessHistory
      };

      // Gửi yêu cầu PATCH để cập nhật bệnh và status vào cây trồng
      await axios.patch(`/crop/update/${cropId}`, illnessData);

      // Cập nhật lại lịch sử bệnh và status trong state
      setIllnessHistory((prevIllnessHistory) => [
        ...prevIllnessHistory,
        {
          diseaseName: values.diseaseName,
          sickDay: values.sickDay.format("YYYY-MM-DD"),
        },
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
    { title: "Tên bệnh", dataIndex: "diseaseName", key: "diseaseName" },
    {
      title: "Ngày bị bênh",
      dataIndex: "sickDay",
      key: "sickDay",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  // Nếu dữ liệu đang tải, hiển thị loading spinner
  if (loading) return <Spin tip="Loading crop details..." />;

  return (
    <div className=" w-2/5 m-auto ">
      <div className="m-5">
        <Button
          href="/crop"
          icon={<ArrowLeftOutlined />}
          className="w-max flex items-center gap-2 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-colors"
        >
          Quay lại
        </Button>
      </div>
      {/* Bảng lịch sử bệnh */}
      <Table
        dataSource={illnessHistory}
        columns={illnessColumns}
        rowKey="_id"
      />

      {/* Form thêm bệnh mới */}
      <Form onFinish={handleAddIllness}>
        <Form.Item
          name="diseaseName"
          label="Tên bệnh"
          rules={[{ required: true, message: "Nhập tên bệnh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sickDay"
          label="Ngày bị bệnh"
          rules={[{ required: true, message: "Nhập ngày bị bệnh" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Chọn trạng thái cây trồng" }]}
        >
          <Select>
            <Select.Option value="healthy">Cây trồng khỏe mạnh.</Select.Option>
            <Select.Option value="sick">Cây đang bị bệnh.</Select.Option>
            <Select.Option value="recovered">Cây đã khỏi bệnh.</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm bệnh
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CropDetails;
