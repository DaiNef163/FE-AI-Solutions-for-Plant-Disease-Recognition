import React from "react";
import { Col, Divider, Form, Input, notification, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { createUserApi } from "../../util/api";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await createUserApi(
        values.name,
        values.age,
        values.phone,
        values.gender,
        values.email,
        values.password,
        values.role
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
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-teal-50 via-blue-50 to-green-50">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/api/placeholder/800/800')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50%',
          opacity: 0.08
        }}
      />
      
      <Row justify="center" className="py-8 px-4">
        <Col xs={24} md={16} lg={10}>
          <fieldset className="p-8 m-2 border border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
            <legend className="p-2 bg-gradient-to-r from-teal-400 to-blue-500 text-3xl font-medium text-transparent bg-clip-text">
              Đăng Ký
            </legend>
            
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[{ required: true, message: "Nhập đầy đủ họ tên" }]}
                >
                  <Input className="hover:border-teal-500 focus:border-teal-500" />
                </Form.Item>

                <Form.Item
                  label="Tuổi"
                  name="age"
                  rules={[{
                    pattern: /^(?:1[01]?[0-9]|100|[1-9]?[0-9])$/,
                    message: "Số tuổi không hợp lệ!"
                  }]}
                >
                  <Input placeholder="Nhập số tuổi" className="hover:border-teal-500 focus:border-teal-500" />
                </Form.Item>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ! Vui lòng nhập từ 10 đến 11 chữ số."
                    }
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" className="hover:border-teal-500 focus:border-teal-500" />
                </Form.Item>

                <Form.Item label="Giới tính" name="gender">
                  <Select className="hover:border-teal-500">
                    <Select.Option value="male">Nam</Select.Option>
                    <Select.Option value="female">Nữ</Select.Option>
                    <Select.Option value="other">Khác</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Vui lòng nhập đúng định dạng email!" }
                ]}
              >
                <Input className="hover:border-teal-500 focus:border-teal-500" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password className="hover:border-teal-500 focus:border-teal-500" />
              </Form.Item>

              <Form.Item label="Vai trò" name="role">
                <Select className="hover:border-teal-500">
                  <Select.Option value="customer">Khách hàng</Select.Option>
                  <Select.Option value="staff">Nhân viên</Select.Option>
                  <Select.Option value="admin">Quản trị viên</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item className="flex justify-center items-center pt-4">
                <button className="w-full md:w-auto rounded-md px-8 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg">
                  Đăng ký
                </button>
              </Form.Item>
            </Form>

            <Link 
              className="flex justify-center items-center text-gray-600 hover:text-teal-600 transition-colors duration-300" 
              to="/"
            >
              <ArrowLeftOutlined className="mr-2" /> Quay lại trang chủ
            </Link>

            <Divider className="my-6" />

            <div className="text-center text-gray-600">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                Đăng nhập tại đây
              </Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default Register;