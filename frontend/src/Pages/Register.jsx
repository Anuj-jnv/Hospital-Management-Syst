import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

 
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    // ✅ validate only required fields
    if (!firstName || !lastName || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        formData,
        { withCredentials: true ,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-black px-6 py-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create your account to access AI Medical Technology
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegistration} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="First Name">
              <input
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            <Field label="Last Name">
              <input
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Email Address">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-semibold text-black dark:text-white hover:underline"
            >
              Login Now
            </Link>
          </div>

          <div className="flex justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

/* SAME Field component */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

export default Register;
