import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen font-inter">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
