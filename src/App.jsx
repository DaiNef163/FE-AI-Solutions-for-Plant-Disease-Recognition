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
import ProfileUser from "./components/profileUser";
import ContactsPage from "./pages/ContactsPage";
import NewsPage from "./pages/NewsPage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CreateNews from "./pages/createPage/createNews";
import ProductDetail from "./pages/detailProducts";
import CartPage from "./pages/CartPage";
import CreateProduct from "./pages/createPage/createProduct";
axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
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
          <Route path="/products" element={<ProductPage />} />
          <Route path="/shoppingcart" element={<CartPage />} />
          <Route path="/shop" element={<ShopPage />} />
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
