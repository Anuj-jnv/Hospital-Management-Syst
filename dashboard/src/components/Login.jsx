import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/admin/login",
        { email, 
          password, 
          role: "Admin"
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <section className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="text-sm font-medium text-emerald-400 border border-emerald-400/40 px-4 py-1 rounded-full">
            AI Medical Technology
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Admin Login
        </h1>

        <p className="text-sm text-slate-400 text-center mb-6">
          Only authorized administrators can access this dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>

        </form>
      </section>
    </div>
  );
};

export default Login;
