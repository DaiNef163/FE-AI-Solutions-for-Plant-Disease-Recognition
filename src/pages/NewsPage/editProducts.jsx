import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const { TextArea } = Input;

const EditPost = () => {
  const { postId } = useParams(); // Get postId from URL params
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  // Fetch post details by ID if postId exists
  useEffect(() => {
    if (postId) {
      axios
        .get(`/post/editpost/${postId}`)
        .then((response) => {
          const postData = response.data;
          setFormData({
            title: postData.title || "",
            description: postData.description || "",
          });

          // Ensure images are strings and set them
          const images =
            postData.images?.map((img, index) => ({
              uid: index,
              name: `Image-${index}`,
              url: typeof img === "string" ? img : "", // Ensure img is a string
            })) || [];

          setImage(images);
        })
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [postId]);

  // Handle form submission
  const handleFinish = () => {
    const payload = new FormData(); // Use FormData to handle file uploads

    // Append form fields to FormData
    payload.append("title", formData.title);
    payload.append("description", formData.description);

    // Check if there are any files before appending them to FormData
    if (image.length > 0) {
      image.forEach((file) => {
        payload.append("images", file.originFileObj); // Use originFileObj for the actual file
      });
    } else {
      message.error("Vui lòng tải lên ít nhất một ảnh.");
      return; // If no images, return to prevent the request
    }

    // Make the PUT request to update the post
    axios
      .put(`/post/editpost/${postId}`, payload)
      .then(() => {
        navigate("/news")
        message.success("Cập nhật bài viết thành công!");
      })
      .catch((error) => {
        message.error("Cập nhật bài viết thất bại!");
        console.error(
          "Error updating post:",
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
        <Form.Item label="Tiêu đề bài viết" name="title" className="mb-4">
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-3 border rounded-md w-full"
            placeholder={formData.title}
          />
        </Form.Item>

        <Form.Item
          label="Nội dung bài viết"
          name="description"
          className="mb-4"
        >
          <TextArea
            placeholder={formData.description}
            value={formData.description}
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-3 border rounded-md w-full"
          />
        </Form.Item>

        <Form.Item label="Hình ảnh bài viết" className="mb-4">
          <Upload
            listType="picture-card"
            fileList={image}
            beforeUpload={(file) => {
              setImage((prevImages) => [...prevImages, file]);
              return false; // Prevent auto-upload
            }}
            onRemove={(file) => {
              setImage((prevImages) =>
                prevImages.filter((item) => item.uid !== file.uid)
              );
            }}
            multiple
            className="w-full"
          >
            <div className="flex justify-center items-center">
              <PlusOutlined />
              <div className="mt-2 text-sm">Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md"
          >
            Lưu bài viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPost;
