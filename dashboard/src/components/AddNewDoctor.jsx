import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { motion } from "framer-motion";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState(null);
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

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

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        formData,
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
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Register New Doctor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new medical professional to the system
        </p>
      </div>

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleAddNewDoctor}
        className="
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
          rounded-2xl p-8 shadow-sm
          space-y-8
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={docAvatarPreview || "/docHolder.jpg"}
              alt="Doctor Avatar"
              className="h-52 w-52 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow"
            />
            <label className="cursor-pointer text-sm font-medium text-indigo-600">
              Upload Photo
              <input type="file" onChange={handleAvatar} className="hidden" />
            </label>
          </div>

          {/* Inputs */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="input"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              className="input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <select
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="input md:col-span-2"
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart) => (
                <option key={depart} value={depart}>
                  {depart}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
              px-8 py-3 rounded-xl font-semibold text-white
              bg-indigo-600 hover:bg-indigo-700 transition
            "
          >
            Register Doctor
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default AddNewDoctor;
