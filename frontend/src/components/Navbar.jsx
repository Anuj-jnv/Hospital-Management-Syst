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

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);
  const navigateTo = useNavigate();

  /* Scroll Detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Logout */
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(false);
      setUser({});
      setTimeout(() => {
      navigateTo("/login");
      }, 50);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  /* NavLink Styling with Active Underline */
  const linkClass = ({ isActive }) =>
    `relative font-bold text-lg tracking-tight transition-colors duration-300
     text-gray-900 hover:text-blue-700
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
     after:bg-blue-600 after:origin-left after:scale-x-0
     after:transition-transform after:duration-300
     ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all ${scrolled
            ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-md"
          } border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            AI <span className="text-blue-700">Medical</span> Technology
          </h3>


          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex gap-10">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/appointment" className={linkClass}>
                Appointment
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About Us
              </NavLink>
            </div>

            {/* LOGIN / LOGOUT */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={
                isAuthenticated
                  ? handleLogout
                  : () => navigateTo("/login")
              }
              className="px-7 py-2.5 rounded-full text-sm font-semibold
                         text-white bg-blue-600 hover:bg-blue-700
                         shadow-md hover:shadow-lg transition"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </motion.button>
          </div>

          {/* HAMBURGER */}
          <button
            className="lg:hidden text-2xl text-gray-800"
            onClick={() => setShow(true)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {show && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setShow(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* DRAWER */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 z-50 h-full w-[75%] max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full px-6 py-6">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-gray-900">
                    Menu
                  </h3>
                  <button
                    onClick={() => setShow(false)}
                    className="text-2xl text-gray-700"
                  >
                    <IoClose />
                  </button>
                </div>

                {/* LINKS */}
                <div className="flex flex-col gap-8">
                  <NavLink
                    to="/"
                    onClick={() => setShow(false)}
                    className={linkClass}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/appointment"
                    onClick={() => setShow(false)}
                    className={linkClass}
                  >
                    Appointment
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={() => setShow(false)}
                    className={linkClass}
                  >
                    About Us
                  </NavLink>
                </div>

                {/* ACTION */}
                <div className="mt-auto">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={
                      isAuthenticated
                        ? handleLogout
                        : () => navigateTo("/login")
                    }
                    className="w-full py-3 rounded-full text-sm font-semibold
                               text-white bg-blue-600 hover:bg-blue-700
                               shadow-md transition"
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
