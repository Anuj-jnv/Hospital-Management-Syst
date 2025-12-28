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

  /* INPUT STYLE — SAME AS REGISTER / APPOINTMENT */
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white " +
    "text-gray-900 placeholder-gray-500 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-600";

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
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
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
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-md bg-white
          rounded-2xl shadow-lg p-10
        "
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-700 mt-3">
            Sign in to continue to AI Medical Technology
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <Field label="Email Address">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>

          {/* PASSWORD */}
          <Field label="Password">
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </Field>

          {/* HELPERS */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Forgot Password?</span>
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create account
            </Link>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="
                w-full py-3 rounded-full
                text-lg font-semibold text-white
                bg-blue-600 hover:bg-blue-700
                disabled:opacity-60 transition
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

/* FIELD — SAME TYPOGRAPHY SYSTEM */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default Login;
