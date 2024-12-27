import React, { useContext } from "react";
import { Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../../util/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/auth.context";
import { ArrowLeftOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const res = await loginApi(email, password);
      if (res && res.EC === 0) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("_id", res.user._id);
        localStorage.setItem("tokenUser", res.tokenUser);
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
        setIsAuthenticated(true);
        window.location.reload();
        window.location.href = "/";
        notification.success({
          message: "Đăng nhập thành công",
          description: `Chào mừng ${res.user.name}!`,
        });
        navigate("/");
      } else {
        notification.error({
          message: "Đăng nhập thất bại",
          description: res?.EM || "Vui lòng kiểm tra thông tin đăng nhập!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi đăng nhập",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Tech leaf background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/api/placeholder/800/800')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60%',
          opacity: 0.1
        }}
      />
      
      <Row justify="center" className="pt-8 px-4 relative z-10">
        <Col xs={24} md={16} lg={9}>
          <fieldset className="p-6 m-2 border border-gray-200 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg">
            <legend className="p-2 bg-gradient-to-r from-teal-400 to-blue-500 text-3xl font-medium text-transparent bg-clip-text">
              Đăng Nhập
            </legend>

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
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="flex justify-center items-center">
                <button className="rounded-md px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-green-300">
                  Đăng nhập
                </button>
              </Form.Item>
            </Form>
            
            <Link className="flex justify-center items-center hover:text-teal-600" to="/">
              <ArrowLeftOutlined className="mr-1" /> Quay lại trang chủ
            </Link>
            
            <Divider />
            
            <div className="flex justify-around text-sm">
              <div>
                Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:text-blue-600">Đăng ký tại đây</Link>
              </div>
              <div>
                <Link to="/forgetpassword" className="text-blue-500 hover:text-blue-600">Quên mật khẩu</Link>
              </div>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;