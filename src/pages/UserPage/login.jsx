import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
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
      console.log("API response:", res);

      if (res && res.EC === 0) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("_id", res.user._id);
        localStorage.setItem("tokenUser", res.tokenUser);
        localStorage.setItem("user", JSON.stringify(res.user));

        setUser(res.user);
        setIsAuthenticated(true);

        console.log("Login successful:", res.user);
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
        console.error(res?.EM || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Lỗi đăng nhập",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
      });
    }
  };

  return (
    <div className="bg-backgroundPageGradient animate-fade animate-once animate-duration-1000 animate-delay-100">
      <Row justify={"center"} style={{ marginTop: "30px",padding:"20px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background:"white",
            }}
          >
            <legend className="p-4 rounded-full text-3xl font-medium ">Đăng Nhập</legend>
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
                <Button className="bg-primary" type="primary" htmlType="submit">
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
    </div>
  );
};

export default LoginPage;
