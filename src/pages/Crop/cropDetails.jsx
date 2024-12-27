import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
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
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch thông tin chi tiết cây trồng
  const fetchCropDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/crop/detail/${cropId}`);
      setCrop(data); // Lưu toàn bộ thông tin cây trồng
    } catch (error) {
      message.error("Failed to fetch crop details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropDetails();
    return () => {
      setCrop(null); // Reset crop state khi component unmount hoặc cropId thay đổi
    };
  }, [cropId]);

  // Hàm xử lý thêm bệnh mới vào lịch sử bệnh
  const handleAddIllness = async (values) => {
    try {
      const illnessData = {
        illnessHistory: [
          {
            diseaseName: values.diseaseName,
            sickDay: values.sickDay.format("YYYY-MM-DD"),
            location: values.location,
          },
        ],
        status: values.status,
      };

      await axios.patch(`/crop/update/${cropId}`, illnessData);

      // Cập nhật illnessHistory vào state crop
      setCrop((prevCrop) => ({
        ...prevCrop,
        illnessHistory: [
          ...prevCrop.illnessHistory,
          {
            diseaseName: values.diseaseName,
            sickDay: values.sickDay.format("YYYY-MM-DD"),
            location: values.location,
          },
        ],
        status: values.status, // Cập nhật trạng thái cây trồng
      }));

      message.success(
        "Illness history, status, and location updated successfully!"
      );
      navigate("/crop"); // Redirect to crop list page after successful update
    } catch (error) {
      message.error("Failed to update illness history, status, or location");
    }
  };

  const illnessColumns = [
    { title: "Tên bệnh", dataIndex: "diseaseName", key: "diseaseName" },
    {
      title: "Ngày bị bệnh",
      dataIndex: "sickDay",
      key: "sickDay",
      render: (_, record) => {
        if (record.diseaseName === "Không có") {
          return "Không có";
        }
        return new Date(record.sickDay).toLocaleDateString();
      },
    },
    { title: "Vị trí cây", dataIndex: "location", key: "location" },
  ];

  if (loading) return <Spin tip="Loading crop details..." />;

  return (
    <div className="w-2/5 m-auto">
      <div className="m-5">
        <Button
          href="/crop"
          icon={<ArrowLeftOutlined />}
          className="w-max flex items-center gap-2 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-colors"
        >
          Quay lại
        </Button>
      </div>

      <Table
        dataSource={crop?.illnessHistory || []}
        columns={illnessColumns}
        rowKey="_id"
      />

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

        <Form.Item name="location" label="Vị trí cây trồng">
          <Input placeholder="Nhập vị trí cây trồng" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Chọn trạng thái cây trồng" }]}
        >
          <Select>
            <Select.Option value="healthy">Cây trồng khỏe mạnh</Select.Option>
            <Select.Option value="sick">Cây đang bị bệnh</Select.Option>
            <Select.Option value="recovered">Cây đã khỏi bệnh</Select.Option>
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
