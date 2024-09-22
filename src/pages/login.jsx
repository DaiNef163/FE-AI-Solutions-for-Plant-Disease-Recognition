import React, { useContext } from "react";
import { Button, Checkbox, Col, Divider, Form, Input, notification, Row } from "antd";
import { createUserApi, loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../components/context/auth.context";
import { ArrowLeftOutlined } from '@ant-design/icons';
const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);
    console.log(res.data.EC);

    if (res && res.data.EC === 0) {
      console.log(res);

      localStorage.setItem("access_token", res.data.access_token);
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      localStorage.email = res.data?.user?.email || "";
      localStorage.name = res.data?.user?.name || "";
      setAuth({
        isAuthenticated: true,
        user: {
          email: res.data?.user?.email ?? "",
          name: res.data?.user?.name ?? "",
        },
      });
      navigate("/");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "error",
      });
    }
    console.log("check res", res);
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
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Link to={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
