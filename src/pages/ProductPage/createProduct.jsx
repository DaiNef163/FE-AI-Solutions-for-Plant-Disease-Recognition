import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, InputNumber, Select, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const CreateProduct = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [nameLeafList, setNameLeafList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchLeafTypes = async () => {
      try {
        const response = await axios.get("/leaf/nameLeaf");
        setNameLeafList(response.data);
      } catch (error) {
        console.error("Error fetching leaf types:", error);
        message.error("Không thể tải danh sách loại lá");
      }
    };

    fetchLeafTypes();
  }, []);

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    if (!imageFiles.length) {
      message.error("Vui lòng chọn ít nhất một ảnh");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    const token = localStorage.getItem("tokenUser");
    formData.append("tokenUser", token);

    try {
      await axios.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      message.success("Tạo sản phẩm thành công!");
      navigate("/product");
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Tạo sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "staff")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-96 shadow-md">
          <h2 className="text-2xl font-bold text-red-600">Không có quyền truy cập</h2>
          <p className="mt-2">Bạn cần đăng nhập với quyền admin hoặc staff.</p>
          <Link to="/" className="mt-4 text-blue-600 hover:underline inline-block">
            Về trang chủ
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card 
          title={
            <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              Tạo Sản Phẩm Mới
            </h1>
          }
          className="shadow-md"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
            >
              <Input className="rounded" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
              >
                <InputNumber
                  className="w-full rounded"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
              >
                <InputNumber className="w-full rounded" min={0} />
              </Form.Item>
            </div>

            <Form.Item
              label="Giảm giá (%)"
              name="discount"
            >
              <InputNumber
                className="w-full rounded"
                min={0}
                max={100}
              />
            </Form.Item>

            <Form.Item
              label="Loại lá"
              name="nameLeaf"
              rules={[{ required: true, message: 'Vui lòng chọn loại lá' }]}
            >
              <Select className="w-full">
                <Select.Option value="">Chọn loại lá</Select.Option>
                {nameLeafList.map((leaf) => (
                  <Select.Option key={leaf} value={leaf}>
                    {leaf}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
            >
              <TextArea rows={4} className="rounded" />
            </Form.Item>

            <Form.Item label="Hình ảnh sản phẩm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded border border-gray-200"
                    />
                    <Button
                      type="primary"
                      danger
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      icon={<span className="text-xl">×</span>}
                    />
                  </div>
                ))}
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImageFiles(prev => [...prev, file]);
                      setImagePreviews(prev => [...prev, reader.result]);
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                  multiple
                >
                  <div className="text-center">
                    <PlusOutlined className="text-2xl" />
                    <div className="mt-2">Thêm ảnh</div>
                  </div>
                </Upload>
              </div>
            </Form.Item>

            <div className="flex justify-between mt-8">
              <Link to="/product">
                <Button icon={<ArrowLeftOutlined />}>
                  Quay lại
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-blue-600"
              >
                {loading ? 'Đang xử lý...' : 'Tạo sản phẩm'}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateProduct;