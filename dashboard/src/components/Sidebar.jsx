import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  MessageSquare,
  UserPlus,
  ShieldPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= SIDEBAR CONTENT ================= */
const SidebarContent = ({ close }) => {
  const { setIsAuthenticated, setAdmin } = useContext(Context);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-management-syst.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setAdmin(null);
      navigate("/login");
      close?.();
    } catch {
      toast.error("Logout failed");
    }
  };

  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition";
  const inactive = "text-gray-700 hover:bg-slate-100";
  const active = "bg-blue-50 text-blue-700 font-semibold";

  return (
    <div className="flex flex-col h-full">
      {/* BRAND */}
      <div className="pb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">
          CareConnect
        </h2>
        <span className="text-sm font-semibold text-gray-500">
          Admin Panel
        </span>
      </div>

      {/* SCROLLABLE NAV */}
      <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
        <NavLink to="/" onClick={close}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <Home size={20} /> Dashboard
        </NavLink>

        <NavLink to="/doctors" onClick={close}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <Users size={20} /> Doctors
        </NavLink>

        <NavLink to="/messages" onClick={close}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <MessageSquare size={20} /> Messages
        </NavLink>

        <NavLink to="/doctor/addnew" onClick={close}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <UserPlus size={20} /> Add Doctor
        </NavLink>

        <NavLink to="/admin/addnew" onClick={close}
          className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <ShieldPlus size={20} /> Add Admin
        </NavLink>
      </nav>

      {/* FIXED LOGOUT */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="
            w-full flex items-center gap-3
            px-4 py-3 rounded-lg
            text-red-600 font-semibold
            hover:bg-red-50 transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

/* ================= MAIN SIDEBAR ================= */
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 h-14
        bg-white border-b flex items-center px-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>
        <span className="ml-3 font-bold text-gray-900">
          CareConnect Admin
        </span>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64
        bg-white border-r px-5 py-6 z-40">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              className="
                fixed left-0 top-0 z-50
                h-screen w-72 bg-white
                border-r px-5
                pt-20 pb-6
              "
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

              <SidebarContent close={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
