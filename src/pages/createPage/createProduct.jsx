import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { createUserApi } from "../../util/api";
import TextArea from "antd/es/input/TextArea";
import { UserContext } from "../../components/context/auth.context";

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
  const onFinish = async (values) => {
    const { name, email, password, phone, gender } = values;
    // const res = await createUserApi(name, email, password,phone,gender);
    if (res) {
      notification.success({
        message: "CREATE PRODUCT",
        description: "Đăng sản phẩm thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "TẠO SẢN PHẨM KHÔNG THÀNH CÔNG",
        description: "vUI LÒNG NHẬP THÔNG TIN ĐẦY ĐỦ",
      });
    }

    console.log("Success:", res);
  };
  return (
    <div>
      {isAuthenticated &&
        (user?.role === "admin" || user?.role === "staff") && (
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
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item
                      label="Tên sản phẩm"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Nhập tên sản phẩm",
                        },
                        { type: "text", message: "Vui lòng nhập đúng kí tự" },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Giá tiền"
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập giá tiền",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Giảm giá (Nếu có)" name="discount">
                      <Input />
                    </Form.Item>

                    <Form.Item label="TextArea" name="description">
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Loại lá" name="gender">
                      <Select>
                        <Select.Option value="male">Name Leaf</Select.Option>
                      </Select>
                    </Form.Item>
                    <div className=" flex justify-center items-center">
                      <Form.Item
                        label="Ảnh sản phẩm"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          action="/upload.do"
                          listType="picture-card"
                          className="p-2 border-2 border-dashed"
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
        )}
    </div>
  );
}

export default CreateProduct;
