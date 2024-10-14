// src/pages/VerifyOtp.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, notification } from "antd";

const VerifyOtp = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const handleVerify = async (values) => {
    try {
      const response = await axios.post("/verifyotp", {
        email: values.email,
        otp: values.otp,
      });

      setMessage(response.data);
      console.log(response.data);
      notification.success({
        message: "Thành công",
        description: "OTP xác minh thành công. Bạn có thể đặt lại mật khẩu.",
      });
      navigate("/resetpassword", { state: { email: values.email } }); // Chuyển hướng đến trang đặt lại mật khẩu
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Hiển thị thông báo lỗi
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
          <legend>Xác minh OTP</legend>
          <Form
            name="verifyOtp"
            onFinish={handleVerify}
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
              label="Mã OTP"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã OTP!",
                },
                {
                  len: 6,
                  message: "Mã OTP phải có 6 chữ số!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="flex justify-center items-center">
              <Button type="primary" htmlType="submit">
                Xác Minh OTP
              </Button>
            </Form.Item>
          </Form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </fieldset>
      </Col>
    </Row>
  );
};

export default VerifyOtp;
