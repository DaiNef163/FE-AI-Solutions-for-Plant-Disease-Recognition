import { UserContextProvider } from "./components/context/auth.context";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { HomePage } from "./pages/home";
import Layout from "./Layout";
import LoginPage from "./pages/UserPage/login";
import Register from "./pages/UserPage/register";
import ForgotPassword from "./pages/UserPage/ForgetPassword";
import OTPForm from "./components/otpForgetPassword";
import ResetPasswordForm from "./components/resetPassword";
import ProductDetail from "./pages/ProductPage/detailProducts";
import CreateNews from "./pages/NewsPage/createNews";
import CreateProduct from "./pages/ProductPage/createProduct";
import NewsPage from "./pages/NewsPage/NewsPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProfileUser from "./pages/UserPage/profileUser";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "tokenUser"
)}`;

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
          <Route path="/product" element={<ProductPage />} />
          <Route path="/shoppingcart" element={<CartPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
