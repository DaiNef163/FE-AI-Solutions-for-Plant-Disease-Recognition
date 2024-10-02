import { useContext, useEffect, useState } from "react";
import axios from "./util/axios.customize";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { authContext } from "./components/context/auth.context";
// import axios from "axios";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(authContext);
  useEffect(() => {
    const fetchEffect = async () => {
      setAppLoading(true);
      // const res = await axios.get(`/v1/api/account`);
      // if (res.data) {
      setAuth({
        isAuthenticated: true,
        user: {
          email: localStorage.email,
          name: localStorage.name,
        },
      });
      //   console.log("sdasd ", res.data);
      // }
      setAppLoading(false);
    };
    fetchEffect();
  }, []);
  return (
    <div>
      {appLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header></Header>
          <Outlet></Outlet>
          <Footer></Footer>
          
        </>
      )}
    </div>
  );
}

export default App;
