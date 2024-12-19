import React, { useState } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values) => {
    if (!image) {
      setError("Vui lòng chọn ảnh cho bài viết.");
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn ảnh cho bài viết.",
      });
      return;
    }
    if (!title || !description) {
      setError("Vui lòng điền đầy đủ nội dung bài viết.");
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ nội dung bài viết.",
      });
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("images", image);

    const token = localStorage.getItem("tokenUser");

    try {
      const response = await axios.post("/post/createPostNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      notification.success({
        message: "Thành công",
        description: "Bài viết đã được tạo thành công!",
      });
      console.log(response.data);
    } catch (err) {
      setError("Tạo bài viết thất bại: " + err.response?.data?.message);
      notification.error({
        message: "Lỗi",
        description: "Tạo bài viết thất bại.",
      });
      console.error(err);
    }
  };

  return (
    <div>
      <h5 className="text-3xl font-bold text-center mb-4">Thông tin bài viết</h5>
      <Form
        name="basic"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Tiêu đề bài viết"
          name="title"
          value={title}
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết" }]}
        >
          <Input onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Nội dung bài viết"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập nôi dung bài viết" }]}
        >
          <Input.TextArea
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Ảnh bài viết"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            className="p-2 border-2 border-dashed"
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
          >
            <button
              className="bg-transparent border-0 hover:bg-gray-200 p-2"
              type="button"
            >
              <PlusOutlined />
              <div className="mt-2 text-sm">Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-center items-center">
          <Button className="bg-primary" type="primary" htmlType="submit">
            Đăng bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateProduct;
