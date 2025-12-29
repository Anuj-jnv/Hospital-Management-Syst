import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white " +
    "text-gray-900 placeholder-gray-500 font-medium " +
    "focus:outline-none focus:ring-2 focus:ring-blue-600";

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
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto space-y-10"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Add New Admin
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new administrator account
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleAddNewAdmin}
          className="
            bg-white border border-gray-200
            rounded-2xl p-10 shadow-sm space-y-8
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="First Name">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
                placeholder=""
              />
            </Field>

            <Field label="Last Name">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
                placeholder=""
              />
            </Field>

            <Field label="Email Address">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder=""
              />
            </Field>

            <Field label="Phone Number">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder=""
              />
            </Field>

            <Field label="Government ID">
              <input
                name="governmentId"
                value={formData.governmentId}
                onChange={handleChange}
                className={inputClass}
                placeholder=""
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

            {/* Password with Eye Toggle */}
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </Field>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="
                px-10 py-3 rounded-full
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold text-lg
                transition
              "
            >
              Add Admin
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

/* ===== Shared Field Component ===== */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default AddNewAdmin;
