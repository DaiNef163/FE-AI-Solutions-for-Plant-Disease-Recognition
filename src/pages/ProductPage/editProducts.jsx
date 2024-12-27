import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const { TextArea } = Input;
const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get productId from URL params
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    discount: "",
    description: "",
    nameLeaf: "",
  });
  const [image, setImage] = useState([]);
  const [nameLeafList, setNameLeafList] = useState([]);

  // Fetch available leaf types on component mount
  useEffect(() => {
    axios
      .get("/leaf/nameLeaf")
      .then((response) => {
        setNameLeafList(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching leaf types:", error);
      });
  }, []);

  // Fetch product details by ID if productId exists
  useEffect(() => {
    if (productId) {
      axios
        .get(`/product/editproduct/${productId}`)
        .then((response) => {
          const productData = response.data;
          setFormData({
            productName: productData.productName || "",
            price: productData.price || 0,
            discount: productData.discount || 0,
            description: productData.description || "",
            nameLeaf: productData.nameLeaf || "",
          });
          setImage(
            productData.images?.map((img, index) => ({
              uid: index,
              name: `Image-${index}`,
              url: img,
            })) || []
          );
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  // Handle form submission
  const handleFinish = () => {
    const payload = new FormData(); // Use FormData to handle file uploads

    // Append form fields to FormData
    payload.append("productName", formData.productName);
    payload.append("price", formData.price);
    payload.append("discount", formData.discount);
    payload.append("description", formData.description);
    payload.append("nameLeaf", formData.nameLeaf);

    if (Array.isArray(image) && image.length > 0) {
      image.forEach((file) => {
        payload.append("images", file);
      });
    }
    axios
      .put(`/product/editproduct/${productId}`, payload)
      .then(() => {
        message.success("Cập nhật sản phẩm thành công!");
        navigate("/maganeproduct");
      })
      .catch((error) => {
        message.error("Cập nhật sản phẩm thất bại!");
        console.error(
          "Error updating product:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={formData}
      >
        <Form.Item label="Tên sản phẩm" name="productName" className="mb-4">
          <Input
            placeholder={formData.productName}
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            className="p-3 border rounded-md w-full"
          />
        </Form.Item>

        <Form.Item label="Giá tiền" name="price" className="mb-4">
          <InputNumber
            placeholder={formData.price}
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            className="p-3 border rounded-md w-full"
          />
        </Form.Item>

        <Form.Item
          placeholder={formData.discount}
          label="Giảm giá (Nếu có)"
          name="discount"
          className="mb-4"
        >
          <InputNumber
            placeholder={formData.discount}
            value={formData.discount}
            onChange={(value) => setFormData({ ...formData, discount: value })}
            className="p-3 border rounded-md w-full"
          />
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm" name="description" className="mb-4">
  <TextArea
    placeholder="Mô tả sản phẩm"
    value={formData.description}
    rows={4}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
    className="p-3 border rounded-md w-full overflow-hidden text-ellipsis"
    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
  />
</Form.Item>


        <Form.Item label="Loại lá" name="nameLeaf" className="mb-4">
          <Select
            value={formData.nameLeaf}
            placeholder="Chọn loại lá" // Set the placeholder to a string
            onChange={(value) => setFormData({ ...formData, nameLeaf: value })}
            className="w-full border rounded-md"
          >
            {nameLeafList.map((leaf) => (
              <Select.Option
                key={leaf}
                value={leaf}
                placeholder={formData.nameLeaf.value}
              >
                {leaf}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Hình ảnh sản phẩm" className="mb-4">
          <Upload
            listType="picture-card"
            fileList={image}
            beforeUpload={(file) => {
              setImage((prevImages) => [...prevImages, file]);
              return false;
            }}
            onRemove={(file) => {
              setImage((prevImages) =>
                prevImages.filter((item) => item.uid !== file.uid)
              );
            }}
            multiple
            className="w-full"
          >
            <button
              className="bg-transparent border-2 border-dashed p-2 rounded-md hover:bg-gray-200 w-full"
              type="button"
            >
              <PlusOutlined />
              <div className="mt-2 text-sm">Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md"
          >
            Lưu sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
