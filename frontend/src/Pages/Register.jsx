import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const { setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* INPUT STYLE — SAME AS APPOINTMENT & MESSAGE */
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white " +
    "text-gray-900 placeholder-gray-500 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-600";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://hospital-management-syst.onrender.com/api/v1/user/patient/register",
        formData,
        {
          withCredentials: true,
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

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-28 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-lg bg-white
          rounded-2xl shadow-lg p-10
        "
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Create Account
          </h2>
          <p className="text-lg text-gray-700 mt-3">
            Create your account to access CareConnect
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegistration} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
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

          {/* LOGIN LINK */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login Now
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
              {loading ? "Creating account..." : "Create Account"}
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

export default Register;
