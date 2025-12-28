import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 p-6 transition-all">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
