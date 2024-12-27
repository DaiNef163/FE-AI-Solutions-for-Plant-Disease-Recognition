import React, { useState } from "react";
import { Form, Input, Button, message, DatePicker, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import dayjs

const CreateIllnessPage = () => {
  const [plantName, setPlantName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("healthy"); // Trạng thái mặc định là "healthy"
  const [plantDate, setPlantDate] = useState(null); // null thay vì chuỗi
  const [diseaseName, setDiseaseName] = useState("");
  const [sickDay, setSickDay] = useState(null); // null thay vì chuỗi

  const navigate = useNavigate(); // Hook để điều hướng

  // Kiểm tra tokenUser từ localStorage
  const tokenUser = localStorage.getItem("tokenUser");

  const handleSubmit = async () => {
    if (!tokenUser) {
      message.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
      navigate("/login"); // Điều hướng đến trang đăng nhập
      return;
    }

    if (!plantName || !quantity || !diseaseName || !sickDay || !plantDate) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Gửi yêu cầu POST tới API tạo cây trồng mới cùng bệnh
      const response = await axios.post("/crop/create", {
        plantName,
        quantity,
        status,
        plantDate: plantDate ? plantDate.format("YYYY-MM-DD") : "", // Chuyển ngày về dạng chuỗi
        diseaseName,
        sickDay: sickDay ? sickDay.format("YYYY-MM-DD") : "", // Chuyển ngày về dạng chuỗi
      });

      message.success("Cây trồng và bệnh đã được thêm thành công!");
      navigate("/crop");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi thêm cây trồng!");
      console.error(error);
    }
  };

  return (
    <div className="border border-sky-500">
      <h2 className="text-3xl font-medium my-3 text-center">
        Thêm cây trồng và bệnh
      </h2>
      <Form
        style={{ border: "solid", width: 600, margin: "0 auto", padding: 20 }}
        layout="vertical"
      >
        <Form.Item label="Tên cây trồng">
          <Input
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            placeholder="Nhập tên cây trồng"
          />
        </Form.Item>

        <Form.Item label="Số lượng">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nhập số lượng"
          />
        </Form.Item>

        <Form.Item label="Tình trạng">
          <Select
            value={status}
            onChange={(value) => setStatus(value)} // Cập nhật trạng thái
            options={[
              { label: "Cây trồng khỏe mạnh.", value: "healthy" },
              { label: "Cây đang bị bệnh.", value: "sick" },
              { label: "Cây đã khỏi bệnh.", value: "recovered" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Ngày trồng">
          <DatePicker
            value={plantDate}
            onChange={(date) => setPlantDate(date)} // Sử dụng dayjs
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item label="Tên bệnh">
          <Input
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            placeholder="Nhập tên bệnh"
          />
        </Form.Item>

        <Form.Item label="Ngày bị bệnh">
          <DatePicker
            value={sickDay}
            onChange={(date) => setSickDay(date)} // Sử dụng dayjs
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Button type="primary" onClick={handleSubmit}>
          Thêm cây trồng và bệnh
        </Button>
      </Form>
    </div>
  );
};

export default CreateIllnessPage;
