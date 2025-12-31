import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      const { data } = await axios.post(
        "https://hospital-management-syst.onrender.com/api/v1/user/admin/login",
        {
          email,
          password,
          role: "Admin",
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

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-28">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="
  text-base font-extrabold tracking-wide
  text-gray-900
  border border-gray-300
  px-6 py-2
  rounded-full
  bg-gray-100
">
            CareConnect Admin
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
          Admin Login
        </h1>

        <p className="text-sm text-gray-600 text-center mb-8">
          Only authorized administrators can access this dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300
              text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-600
            "
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg
                border border-gray-300
                text-gray-900 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-600
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-full
              bg-blue-600 hover:bg-blue-700
              text-white text-lg font-semibold
              transition
            "
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
