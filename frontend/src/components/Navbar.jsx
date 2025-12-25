import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  /* Scroll Detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/register/logout",
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      setShow(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const linkClass = ({ isActive }) =>
    `relative font-medium transition ${
      isActive
        ? "text-black dark:text-white"
        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    }`;

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          scrolled
            ? "bg-white dark:bg-black shadow-md"
            : "bg-white/70 dark:bg-black/60 backdrop-blur-md"
        } border-b border-gray-200 dark:border-gray-800`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            AI Medical Technology
          </h3>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8">
              {["/", "/appointment", "/about"].map((path, idx) => (
                <NavLink key={idx} to={path} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      <span>
                        {path === "/"
                          ? "Home"
                          : path === "/appointment"
                          ? "Appointment"
                          : "About Us"}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="activeLink"
                          className="absolute -bottom-1 left-0 w-full h-[2px] bg-black dark:bg-white"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isAuthenticated ? handleLogout : () => navigateTo("/login")}
              className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-2xl text-gray-900 dark:text-white"
            onClick={() => setShow(true)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShow(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 z-50 h-full w-[75%] max-w-sm bg-white dark:bg-black shadow-xl"
            >
              <div className="flex flex-col h-full px-6 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Menu
                  </h3>
                  <button
                    onClick={() => setShow(false)}
                    className="text-2xl text-gray-900 dark:text-white"
                  >
                    <IoClose />
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-6 text-lg">
                  <NavLink to="/" onClick={() => setShow(false)} className={linkClass}>
                    Home
                  </NavLink>
                  <NavLink
                    to="/appointment"
                    onClick={() => setShow(false)}
                    className={linkClass}
                  >
                    Appointment
                  </NavLink>
                  <NavLink to="/about" onClick={() => setShow(false)} className={linkClass}>
                    About Us
                  </NavLink>
                </div>

                {/* Action */}
                <div className="mt-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={isAuthenticated ? handleLogout : () => navigateTo("/login")}
                    className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700"
                  >
                    {isAuthenticated ? "Logout" : "Login"}
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
