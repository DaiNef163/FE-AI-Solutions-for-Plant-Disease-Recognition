import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/userForgetPassword", { email: values.email });

      setMessage(response.data);
      console.log(response.data);
      navigate("/inputotp", { state: { email: values.email } }); 
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
          <legend>Quên mật khẩu</legend>
          <Form
            name="basic"
            onFinish={handleSubmit}
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

            <Form.Item className="flex justify-center items-center">
              <Button type="primary" htmlType="submit">
                Gửi Mã OTP
              </Button>
            </Form.Item>
          </Form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </fieldset>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
