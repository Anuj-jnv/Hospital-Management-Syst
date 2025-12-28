import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    governmentId: "",
    dob: "",
    gender: "",
    password: "",
  });

  const navigateTo = useNavigate();

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 " +
    "bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium " +
    "placeholder-gray-500 dark:placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        return toast.error("All fields are required");
      }
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
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
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new administrator account
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAddNewAdmin}
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="First Name">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass}
              placeholder="John"
            />
          </Field>

          <Field label="Last Name">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Doe"
            />
          </Field>

          <Field label="Email">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="john@example.com"
            />
          </Field>

          <Field label="Phone Number">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="9876543210"
            />
          </Field>

          <Field label="Government ID">
            <input
              name="governmentId"
              value={formData.governmentId}
              onChange={handleChange}
              className={inputClass}
              placeholder="ID Number"
            />
          </Field>

          <Field label="Date of Birth">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>

          <Field label="Gender">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>

          <Field label="Password">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              placeholder="********"
            />
          </Field>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Add Admin
          </button>
        </div>
      </form>
    </motion.section>
  );
};

/* ===== Shared Field Component ===== */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

export default AddNewAdmin;
