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
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v)) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
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
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign up to continue to AI Medical Technology
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegistration} className="space-y-6">

          {/* Name */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* NIC & DOB */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="nic"
              placeholder="NIC Number"
              value={formData.nic}
              onChange={handleChange}
              className={inputClass}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Gender & Password */}
          <div className="grid sm:grid-cols-2 gap-5">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputClass} ${
                formData.gender
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male" className="text-black">
                Male
              </option>
              <option value="Female" className="text-black">
                Female
              </option>
            </select>

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Already registered?</span>
            <Link
              to="/signin"
              className="font-semibold text-black dark:text-white hover:underline"
            >
              Login Now
            </Link>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="px-12 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600 disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
