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
import RecognizePage from "./pages/RecognizePage/RecognizePage";
import EditProduct from "./pages/ProductPage/editProducts";
import DeleteProduct from "./pages/ProductPage/deleteProduct";
import IntroductionAI from "./pages/AI/introduction";
import MaganeProduct from "./pages/AdminPage/maganeProduct";
import MaganePost from "./pages/AdminPage/maganePost";
import EditPost from "./pages/NewsPage/editProducts";
import EditProfile from "./pages/UserPage/editProfile";
import CropsTable from "./pages/Crop/CropsTable";
import CropDetails from "./pages/Crop/cropDetails";
import CreateIllnessPage from "./pages/Crop/CreateIllnessPage";
import PaymentConfirmation from "./pages/Payment/PaymentConfirmation";
import MaganeUser from "./pages/AdminPage/maganeUser";
import HistoryOrder from "./pages/UserPage/HistoryOrder";
import ManageTreatment from "./pages/AdminPage/Treatment";

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
          <Route path="/recognize" element={<RecognizePage />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/deleteproduct/:productId" element={<DeleteProduct />} />
          <Route path="/introductionAI" element={<IntroductionAI />} />
          <Route path="/maganeProduct" element={<MaganeProduct />} />
          <Route path="/maganePost" element={<MaganePost />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />
          <Route path="/editpost/:postId" element={<EditPost />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/crop" element={<CropsTable />} />
          <Route path="/cropdetail/:cropId" element={<CropDetails />} />
          <Route path="/createillness" element={<CreateIllnessPage />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/maganeUser" element={<MaganeUser />} />
          <Route path="/maganeTreament" element={<ManageTreatment />} />
          <Route path="/HistoryOrder" element={<HistoryOrder />} />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
