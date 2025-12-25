import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const linkClass = ({ isActive }) =>
    `font-semibold transition ${
      isActive
        ? "text-black dark:text-white"
        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    }`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white"
        >
          AI Medical Technology
        </motion.h3>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 text-lg">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/appointment" className={linkClass}>Appointment</NavLink>
            <NavLink to="/about" className={linkClass}>About Us</NavLink>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isAuthenticated ? handleLogout : () => navigateTo("/login")}
            className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </motion.button>
        </div>

        {/* Hamburger */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden fixed top-[80px] left-0 h-full w-[85%] max-w-sm bg-white dark:bg-black shadow-xl"
          >
            <div className="flex flex-col items-center justify-between h-full py-10">
              <div className="flex flex-col gap-8 text-xl">
                <NavLink to="/" onClick={() => setShow(false)} className={linkClass}>Home</NavLink>
                <NavLink to="/appointment" onClick={() => setShow(false)} className={linkClass}>Appointment</NavLink>
                <NavLink to="/about" onClick={() => setShow(false)} className={linkClass}>About Us</NavLink>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isAuthenticated ? handleLogout : () => navigateTo("/login")}
                className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
