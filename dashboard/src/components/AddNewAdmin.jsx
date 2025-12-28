import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        { firstName, lastName, email, phone, nic, dob, gender, password },
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
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new administrator account
        </p>
      </div>

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleAddNewAdmin}
        className="
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
          rounded-2xl p-8 shadow-sm
          space-y-6
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* ===== SUBMIT ===== */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
              px-8 py-3 rounded-xl font-semibold text-white
              bg-indigo-600 hover:bg-indigo-700 transition
            "
          >
            Add Admin
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default AddNewAdmin;
