import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/patient/login",
        {
          email: formData.email,
          password: formData.password,      
        },
        { withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
        
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue to AI Medical Technology
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Helper Links */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="font-semibold text-black dark:text-white hover:underline"
            >
              Create account
            </Link>
          </div>
 
          {/* Submit */}
          <div className="flex justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
