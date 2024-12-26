// ManageTreatment.jsx
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Popconfirm, message, Form, Input, Select, Modal } from "antd";
import axios from "axios";

const ManageTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách Treatment khi component mount
  useEffect(() => {
    axios
      .get("/treatment/view")
      .then((response) => setTreatments(response.data))
      .catch((error) => {
        console.error("Error fetching treatments:", error);
        message.error("Không thể tải danh sách phương pháp chữa trị.");
      });
  }, []);

  // Xóa Treatment
  const deleteTreatment = (treatmentId) => {
    axios
      .delete(`/treatment/${treatmentId}`)
      .then(() => {
        message.success("Treatment đã được xóa thành công!");
        setTreatments(treatments.filter((treatment) => treatment._id !== treatmentId));
      })
      .catch((error) => {
        console.error("Error deleting treatment:", error);
        message.error("Có lỗi xảy ra khi xóa phương pháp chữa trị.");
      });
  };

  // Thêm mới hoặc cập nhật Treatment
  const handleSubmit = (values) => {
    if (editingTreatment) {
      axios
        .put(`/treatment/${editingTreatment._id}`, values)
        .then(() => {
          message.success("Cập nhật phương pháp chữa trị thành công!");
          setTreatments(
            treatments.map((treatment) =>
              treatment._id === editingTreatment._id ? { ...treatment, ...values } : treatment
            )
          );
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Error updating treatment:", error);
          message.error("Có lỗi xảy ra khi cập nhật phương pháp chữa trị.");
        });
    } else {
      axios
        .post("/treatment", values)
        .then((response) => {
          message.success("Phương pháp chữa trị đã được thêm thành công!");
          setTreatments([...treatments, response.data]);
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Error adding treatment:", error);
          message.error("Có lỗi xảy ra khi thêm mới phương pháp chữa trị.");
        });
    }
  };

  // Hiển thị Modal để Thêm hoặc Chỉnh sửa Treatment
  const showModal = (treatment = null) => {
    setEditingTreatment(treatment);
    form.setFieldsValue(treatment || { name: "", symptoms: "", causes: "", treatment: "", prevention: "", severityLevel: "low" });
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Tên bệnh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Triệu chứng",
      dataIndex: "symptoms",
      key: "symptoms",
    },
    {
      title: "Nguyên nhân",
      dataIndex: "causes",
      key: "causes",
    },
    {
      title: "Mức độ nghiêm trọng",
      dataIndex: "severityLevel",
      key: "severityLevel",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => deleteTreatment(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Thêm mới Treatment
      </Button>
      <Table columns={columns} dataSource={treatments} rowKey="_id" />
      
      <Modal
        title={editingTreatment ? "Chỉnh sửa Treatment" : "Thêm mới Treatment"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Tên bệnh" name="name" rules={[{ required: true, message: "Vui lòng nhập tên bệnh!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Triệu chứng" name="symptoms" rules={[{ required: true, message: "Vui lòng nhập triệu chứng!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nguyên nhân" name="causes" rules={[{ required: true, message: "Vui lòng nhập nguyên nhân!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phương pháp chữa trị" name="treatment" rules={[{ required: true, message: "Vui lòng nhập phương pháp chữa trị!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Cách phòng ngừa" name="prevention">
            <Input />
          </Form.Item>
          <Form.Item label="Mức độ nghiêm trọng" name="severityLevel">
            <Select>
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="moderate">Vừa phải</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="critical">Nghiêm trọng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTreatment ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTreatment;
