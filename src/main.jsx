import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register.jsx";
import UserPage from "./pages/users.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import Footer from "./components/layout/footer.jsx"
import { AuthWrapper } from "./components/context/auth.context.jsx";
// import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <UserPage></UserPage>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/ft",
    element: <Footer></Footer>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
    
      {/* <App /> */}
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);
