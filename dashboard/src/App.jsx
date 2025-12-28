import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";

import AdminLayout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ADMIN SESSION ================= */
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );

        if (data.user?.role !== "Admin") {
          throw new Error("Unauthorized");
        }

        setIsAuthenticated(true);
        setAdmin(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [setIsAuthenticated, setAdmin]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <Router>
      {/* Sidebar only when admin is logged in */}
      {isAuthenticated && admin && <Sidebar />}

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/" replace />
          }
        />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}
        <Route
          path="/"
          element={
            isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="doctor/addnew" element={<AddNewDoctor />} />
          <Route path="admin/addnew" element={<AddNewAdmin />} />
          <Route path="messages" element={<Messages />} />
          <Route path="doctors" element={<Doctors />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>

      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
