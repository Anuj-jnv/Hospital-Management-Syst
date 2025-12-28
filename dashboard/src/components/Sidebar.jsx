import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, MessageSquare, UserPlus, ShieldPlus, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useContext } from "react";

const Sidebar = () => {
  const { setIsAuthenticated, setAdmin } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(false);
      setAdmin(null);
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const itemClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

  const activeClass =
    "bg-black text-white dark:bg-white dark:text-black";

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 px-4 py-6 z-40">
      <div className="flex flex-col w-full">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/" className={({ isActive }) => `${itemClass} ${isActive && activeClass}`}>
            <Home size={20} /> Dashboard
          </NavLink>

          <NavLink to="/doctors" className={({ isActive }) => `${itemClass} ${isActive && activeClass}`}>
            <Users size={20} /> Doctors
          </NavLink>

          <NavLink to="/messages" className={({ isActive }) => `${itemClass} ${isActive && activeClass}`}>
            <MessageSquare size={20} /> Messages
          </NavLink>

          <NavLink to="/doctor/addnew" className={({ isActive }) => `${itemClass} ${isActive && activeClass}`}>
            <UserPlus size={20} /> Add Doctor
          </NavLink>

          <NavLink to="/admin/addnew" className={({ isActive }) => `${itemClass} ${isActive && activeClass}`}>
            <ShieldPlus size={20} /> Add Admin
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
