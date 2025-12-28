import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { motion } from "framer-motion";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    governmentId: "",
    dob: "",
    gender: "",
    doctorDepartment: "",
  });

  const [docAvatar, setDocAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 " +
    "bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium " +
    "placeholder-gray-500 dark:placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        return toast.error("All fields are required");
      }
    }

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("docAvatar", docAvatar);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        fd,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/doctors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Register New Doctor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new medical professional to the system
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAddNewDoctor}
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={preview || "/docHolder.jpg"}
              alt="Doctor Avatar"
              className="h-52 w-52 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow"
            />
            <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg 
bg-indigo-600 px-4 py-2 text-sm font-semibold text-white 
hover:bg-indigo-700 transition-colors duration-200
focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
  
  {/* Icon (optional) */}
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v7m0-7l-3 3m3-3l3 3M12 5v7" />
  </svg>

  Upload Photo
  <input type="file" onChange={handleAvatar} className="hidden" />
</label>

          </div>

          {/* Fields */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Field label="Department">
              <select
                name="doctorDepartment"
                value={formData.doctorDepartment}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Register Doctor
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

export default AddNewDoctor;
