import React from "react";
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
} from "antd";
import { createUserApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password,phone,gender } = values;
    const res = await createUserApi(name, email, password,phone,gender);
    if (res) {
      notification.success({
        message: "CREATE USER",
        description: "Success",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "TẠO TÀI KHOẢN KHÔNG THÀNH CÔNG",
        description: "Email đã tồn tại hoặc không hợp lệ",
      });
    }

    console.log("Success:", res);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Ký</legend>
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
                { type: "text", message: "Vui lòng nhập đúng kí tự" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
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
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
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
            
            <Form.Item
            label="Giới tính"
            name="gender">
              <Select>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="flex justify-center items-center ">
              <Button className="bg-primary" type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <Link className="flex justify-center items-center" to={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Bạn đã có tài khoản ? <Link to={"/login"}>Đăng nhập tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};
export default Register;
