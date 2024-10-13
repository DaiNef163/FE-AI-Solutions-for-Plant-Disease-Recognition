import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <div className="flex-grow p-4 flex flex-col justify-center">
        <Outlet />
      </div>
      <Footer /> 
    </div>
  );
}
