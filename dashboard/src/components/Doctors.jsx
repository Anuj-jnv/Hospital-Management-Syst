import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  Stethoscope,
  IdCard,
  User,
} from "lucide-react";

/* ===== INFO ROW COMPONENT ===== */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
    <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="truncate">{value || "—"}</span>
  </div>
);

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* ===== HEADER ===== */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Doctors
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All registered medical professionals
        </p>
      </div>

      {/* ===== GRID ===== */}
      {doctors.length ? (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doc) => (
            <motion.div
              key={doc._id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="
                group rounded-2xl bg-white dark:bg-zinc-900
                border border-gray-200 dark:border-zinc-800
                shadow-sm hover:shadow-xl transition-all overflow-hidden
              "
            >
              {/* ===== AVATAR ===== */}
              <div className="relative h-56 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                <img
                  src={doc.docAvatar?.url || "/doctor-placeholder.png"}
                  alt="Doctor"
                  className="
                    h-36 w-36 rounded-full object-cover
                    border-4 border-white dark:border-zinc-900
                    shadow-md group-hover:scale-105 transition
                  "
                />
              </div>

              {/* ===== CONTENT ===== */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {doc.firstName} {doc.lastName}
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {doc.doctorDepartment}
                  </p>
                </div>

                <div className="space-y-2">
                  <InfoRow icon={<Mail size={16} />} label="Email" value={doc.email} />
                  <InfoRow icon={<Phone size={16} />} label="Phone" value={doc.phone} />
                  <InfoRow
                    icon={<Calendar size={16} />}
                    label="DOB"
                    value={doc.dob?.substring(0, 10)}
                  />
                  <InfoRow icon={<IdCard size={16} />} label="NIC" value={doc.nic} />
                  <InfoRow icon={<User size={16} />} label="Gender" value={doc.gender} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No registered doctors found.
        </div>
      )}
    </motion.section>
  );
};

export default Doctors;
