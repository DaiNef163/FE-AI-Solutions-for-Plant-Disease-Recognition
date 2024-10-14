import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./components/context/auth.context";
// import axios from "axios";
import { Spin } from "antd";
import { HomePage } from "./pages/home";
import Layout from "./Layout";
import  LoginPage  from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgetPassword"
import axios from "axios";
import OTPForm from "./components/otpForgetPassword";
import ResetPasswordForm from "./components/resetPassword";


axios.defaults.baseURL = "http://localhost:8080/v1/api";
axios.defaults.withCredentials = true;


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/inputotp" element={<OTPForm />} />
          <Route path="/resetpassword" element={<ResetPasswordForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
