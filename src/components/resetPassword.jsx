// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, notification } from "antd";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const handleReset = async (values) => {
    try {
      const response = await axios.post("/resetpassword", {
        email: values.email,
        newPassword: values.newPassword,
      });

      setMessage(response.data);
      console.log(response.data);
      notification.success({
        message: "Thành công",
        description: "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập ngay bây giờ.",
      });
      navigate("/login"); 
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        error.response
          ? error.response.data
          : "Có lỗi xảy ra. Vui lòng thử lại."
      );
      notification.error({
        message: "Lỗi",
        description: error.response
          ? error.response.data
          : "Có lỗi xảy ra. Vui lòng thử lại.",
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
          <legend>Đặt lại mật khẩu</legend>
          <Form
            name="resetPassword"
            onFinish={handleReset}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              initialValue={emailFromState}
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
              <Input disabled={!!emailFromState} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải ít nhất 6 ký tự!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="flex justify-center items-center">
              <Button type="primary" htmlType="submit">
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </fieldset>
      </Col>
    </Row>
  );
};

export default ResetPassword;
