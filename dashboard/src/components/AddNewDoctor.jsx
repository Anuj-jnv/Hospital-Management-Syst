import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { motion } from "framer-motion";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

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
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white " +
    "text-gray-900 placeholder-gray-500 font-medium " +
    "focus:outline-none focus:ring-2 focus:ring-blue-600";

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
      navigateTo("/doctors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Register New Doctor
          </h1>
          <p className="text-gray-600 mt-1">
            Add a new medical professional to the system
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleAddNewDoctor}
          className="
            bg-white border border-gray-200
            rounded-2xl p-10 shadow-sm space-y-10
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-5">
              <img
                src={preview || "/docHolder.jpg"}
                alt="Doctor Avatar"
                className="h-48 w-48 object-cover rounded-full"
              />

              <label className="
                cursor-pointer px-5 py-2 rounded-full
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold text-sm
                transition
              ">
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
              Register Doctor
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

export default AddNewDoctor;
