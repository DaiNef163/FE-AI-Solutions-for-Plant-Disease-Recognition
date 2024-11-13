import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { createUProductAPi } from "../../util/api";
import TextArea from "antd/es/input/TextArea";
import { UserContext } from "../../components/context/auth.context";
import Page404 from "../page404/page404";
import axios from "axios";

function CreateProduct() {
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(UserContext);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const navigate = useNavigate();

  const [nameLeaf, setNameLeaf] = useState([]);
  useEffect(() => {
    axios
      .get("/leaf/nameLeaf")
      .then((response) => setNameLeaf(response.data))
      .catch((error) => console.error("Error fetching name leaf:", error));
  }, []);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [accept, setAccept] = useState(false);
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (values) => {
    if (!image) {
      setError("Vui lòng chọn ảnh cho sản phẩm.");
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn ảnh cho sản phẩm.",
      });
      return;
    }
    if (!productName || !price || !description || !nameLeaf) {
      setError("Vui lòng điền đầy đủ thông tin sản phẩm.");
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin sản phẩm.",
      });
      return;
    }

    setError(null); 

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("discount", discount);
    formData.append("accept", accept);
    formData.append("slug", slug);
    formData.append("nameLeaf", nameLeaf);
    formData.append("images", image);

    const token = localStorage.getItem("tokenUser");

    try {
      const response = await axios.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Sản phẩm đã được tạo thành công!");
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được tạo thành công!",
      });
      navigate("/product");
      console.log(response.data);
    } catch (err) {
      setError("Tạo sản phẩm thất bại: " + err.response?.data?.message);
      notification.error({
        message: "Lỗi",
        description: "Tạo sản phẩm thất bại.",
      });
      console.error(err);
    }
  };

  return (
    <div>
      {isAuthenticated && (user?.role === "admin" || user?.role === "staff") ? (
        <div>
          <h5 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-wrap bg-clip-text text-transparent ">
            Thông tin sản phẩm
          </h5>
          <Row
            justify={"space-between"}
            style={{ marginTop: "30px", marginLeft: "12rem" }}
          >
            <Col className="" xs={24} md={16} lg={8}>
              <fieldset
                style={{
                  padding: "15px",
                  margin: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "1080px",
                }}
              >
                <legend>Thông tin sản phẩm</legend>
                <Form
                  name="basic"
                  onFinish={handleSubmit}
                  autoComplete="off"
                  layout="vertical"
                  type="primary"
                >
                  <Form.Item
                    label="Tên sản phẩm"
                    name="productName"
                    value={productName}
                    rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
                  >
                    <Input onChange={(e) => setProductName(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                      { required: true, message: "Vui lòng nhập giá tiền" },
                    ]}
                  >
                    <InputNumber onChange={(value) => setPrice(value)} />
                  </Form.Item>

                  <Form.Item label="Giảm giá (Nếu có)" name="discount">
                    <InputNumber onChange={(value) => setDiscount(value)} />
                  </Form.Item>

                  <Form.Item label="Mô tả sản phẩm" name="description">
                    <TextArea
                      rows={4}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Loại lá" name="nameLeaf">
                    <Select onChange={(value) => setNameLeaf(value)}>
                      {Array.isArray(nameLeaf) && nameLeaf.length > 0 ? (
                        nameLeaf.map((leaf) => (
                          <Select.Option key={leaf} value={leaf}>
                            {leaf}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No data available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>

                  <div className=" flex justify-center items-center">
                    <Form.Item
                      label="Ảnh sản phẩm"
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
                  </div>

                  <Form.Item className="flex justify-center items-center ">
                    <Button
                      className="bg-primary"
                      type="primary"
                      htmlType="submit"
                    >
                      Đăng sản phẩm
                    </Button>
                  </Form.Item>
                </Form>
                <Link
                  className="flex justify-center items-center"
                  to={"/product"}
                >
                  <ArrowLeftOutlined /> Quay lại trang sản phẩm
                </Link>
                <Divider />
              </fieldset>
            </Col>
          </Row>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  );
}

export default CreateProduct;
