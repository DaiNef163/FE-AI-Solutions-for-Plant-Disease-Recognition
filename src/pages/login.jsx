import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/auth.context"; // Import đúng UserContext
import { ArrowLeftOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext); // Lấy setUser và setIsAuthenticated từ context

  const onFinish = async (values) => {
    // values.preventDefault();
    const { email, password } = values;
    try {
      const res = await loginApi(email, password);
      if (res && res.data.EC === 0) {
        localStorage.setItem("access_token", res.data.access_token);
        setUser(res.data.user); // Cập nhật user
        setIsAuthenticated(true); // Đánh dấu người dùng đã xác thực
        notification.success({
          message: "LOGIN USER",
          description: "Success",
        });
        navigate("/");
      } else {
        notification.error({
          message: "LOGIN USER",
          description: res?.EM ?? "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "LOGIN USER",
        description: "An error occurred during login.",
      });
    }
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
          <legend>Đăng Nhập</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
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

            <Form.Item className="flex justify-center items-center">
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <Link className="flex justify-center items-center" to={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div className="flex justify-around">
            <div>
              Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
            </div>
            <div>
              <Link to={"/forgetpassword"}>Quên mật khẩu</Link>
            </div>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
