import React from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { createUserApi } from "../../util/api";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, age, phone, gender, email, password, role } = values;
    console.log("Submitted values:", values);
    const res = await createUserApi(
      name,
      age,
      phone,
      gender,
      email,
      password,
      role
    );

    if (res) {
      notification.success({
        message: "Tạo tài khoản thành công",
        description: "Bạn đã đăng ký tài khoản thành công!",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Tạo tài khoản không thành công",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }

    console.log("Response:", res);
  };

  return (
    <div className="animate-fade animate-once animate-duration-1000 animate-delay-100 bg-backgroundPageGradient">
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={32} md={16} lg={10}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "white",
              padding: "10px",
            }}
          >
            <legend className="p-2 bg-gradient-to-r from-teal-400 to-blue-500 text-3xl font-medium text-transparent bg-clip-text z9">
              Đăng Ký
            </legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ họ tên",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tuổi"
                name="age"
                rules={[
                  {
                    pattern: /^(?:1[01]?[0-9]|100|[1-9]?[0-9])$/,
                    message: "Số tuổi không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Nhập số tuổi" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message:
                      "Số điện thoại không hợp lệ! Vui lòng nhập từ 10 đến 11 chữ số.",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item label="Giới tính" name="gender">
                <Select>
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                  <Select.Option value="other">Khác</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: "email",
                    message: "Vui lòng nhập đúng định dạng email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label="Vai trò" name="role">
                <Select>
                  <Select.Option value="customer">Khách hàng</Select.Option>
                  <Select.Option value="staff">Nhân viên</Select.Option>
                  <Select.Option value="admin">Quản trị viên</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item className="flex justify-center items-center">
                <button className="rounded-md px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300">
                  Đăng ký
                </button>
              </Form.Item>
            </Form>
            <Link className="flex justify-center items-center" to={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
