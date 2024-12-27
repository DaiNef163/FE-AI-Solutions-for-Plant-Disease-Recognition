import React, { useState } from "react";
import { Form, Input, Button, message, DatePicker, Select, Checkbox } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateIllnessPage = () => {
  const [plantName, setPlantName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("healthy");
  const [plantDate, setPlantDate] = useState(null);
  const [diseaseName, setDiseaseName] = useState("");
  const [sickDay, setSickDay] = useState(null);
  const [location, setLocation] = useState("");
  const [hasDisease, setHasDisease] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!localStorage.getItem("tokenUser")) {
      message.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    if (!plantName || !quantity || (hasDisease && !diseaseName) || (hasDisease && !sickDay) || !plantDate) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await axios.post("/crop/create", {
        plantName,
        quantity,
        status,
        plantDate: plantDate?.format("YYYY-MM-DD"),
        diseaseName: hasDisease ? diseaseName : "Không có",
        sickDay: hasDisease ? sickDay?.format("YYYY-MM-DD") : null,
        location: hasDisease ? location : "Không có",
      });
      message.success("Cây trồng và bệnh đã được thêm thành công!");
      navigate("/crop");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi thêm cây trồng!");
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{
        background: 'linear-gradient(180deg, rgba(220,252,231,0.5) 0%, rgba(219,234,254,0.5) 100%)',
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url('/api/placeholder/800/800')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80%',
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          layout="vertical"
        >
          <h2 style={{ 
            fontSize: '1.875rem',
            fontWeight: '600',
            textAlign: 'center',
            color: '#166534',
            marginBottom: '2rem'
          }}>
            Thêm cây trồng
          </h2>

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
              onChange={(value) => setStatus(value)}
              options={[
                { label: "Cây trồng khỏe mạnh", value: "healthy" },
                { label: "Cây đang bị bệnh", value: "sick" },
                { label: "Cây đã khỏi bệnh", value: "recovered" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Ngày trồng">
            <DatePicker
              value={plantDate}
              onChange={(date) => setPlantDate(date)}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={hasDisease}
              onChange={(e) => setHasDisease(e.target.checked)}
            >
              Cây có bệnh
            </Checkbox>
          </Form.Item>

          {hasDisease && (
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
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
                  onChange={(date) => setSickDay(date)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Vị trí">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nhập địa điểm cây trồng"
                />
              </Form.Item>
            </div>
          )}

          <Button 
            type="primary"
            onClick={handleSubmit}
            style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#16a34a',
              borderColor: '#16a34a'
            }}
          >
            Thêm cây trồng và bệnh
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateIllnessPage;