import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./components/context/auth.context";
// import axios from "axios";
import { Spin } from "antd";
import { HomePage } from "./pages/home";
import Layout from "./Layout";
import  LoginPage  from "./pages/login";
import Register from "./pages/register";



function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
