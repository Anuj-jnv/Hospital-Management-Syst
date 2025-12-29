import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1
          ml-0 lg:ml-64
          px-6 py-10
          transition-all
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
