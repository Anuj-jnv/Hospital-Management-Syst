import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
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

  /* ===== Scroll Detection ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== Logout ===== */
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(false);
      setUser({});
      navigateTo("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  /* ===== Desktop Link Style ===== */
  const linkClass = ({ isActive }) =>
    `relative font-bold text-lg tracking-tight transition-colors
     text-gray-900 hover:text-blue-700
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
     after:bg-blue-600 after:origin-left
     after:transition-transform after:duration-300
     ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all ${scrolled
          ? "bg-white shadow-md"
          : "bg-white/90 backdrop-blur-md"
          } border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            <span className="text-blue-700">CareConnect</span>
          </h3>

          {/* ===== DESKTOP MENU ===== */}
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={
                isAuthenticated
                  ? handleLogout
                  : () => navigateTo("/login")
              }
              className="px-7 py-2.5 rounded-full text-sm font-semibold
                         text-white bg-blue-600 hover:bg-blue-700
                         shadow-md transition"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </motion.button>
          </div>

          {/* ===== HAMBURGER ===== */}
          <button
            className="lg:hidden text-2xl text-gray-800"
            onClick={() => setShow(true)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
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
              className="fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b">
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
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/appointment", label: "Appointment" },
                    { to: "/about", label: "About Us" },
                  ].map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setShow(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between
                         px-4 py-3 rounded-xl
                         text-base font-semibold transition-all
                         ${isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-800 hover:bg-gray-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* LEFT SIDE */}
                          <span className="flex items-center gap-3">
                            <FaStar
                              size={14}
                              className={
                                isActive ? "text-red-600" : "text-red-400"
                              }
                            />
                            {label}
                          </span>

                          {/* RIGHT SIDE ARROW */}
                          {isActive ? (
                            <HiChevronDown className="text-blue-600 text-lg" />
                          ) : (
                            <HiChevronRight className="text-gray-400 text-lg" />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>


                {/* ACTION */}
                <div className="p-6 border-t">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={
                      isAuthenticated
                        ? handleLogout
                        : () => navigateTo("/login")
                    }
                    className="w-full py-3 rounded-full
                               text-sm font-semibold text-white
                               bg-blue-600 hover:bg-blue-700 transition"
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
