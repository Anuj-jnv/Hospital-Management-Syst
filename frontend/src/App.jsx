import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Section from "./components/Layout/Section.jsx";

import { Context } from "./main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home.jsx";
import Appointment from "./Pages/Appointment.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    loading,
    setLoading,
  } = useContext(Context);

  // ✅ Restore session from cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );

        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setLoading(false); // ✅ VERY IMPORTANT
      }
    };

    fetchUser();
  }, []);

  // ✅ Prevent UI flicker / screen lock
  if (loading) return null;

  return (
    <Router>
      <ScrollToTop /> 
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      
        <Footer />
      
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
