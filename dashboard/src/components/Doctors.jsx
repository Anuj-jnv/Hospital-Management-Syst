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
  IdCard,
  User,
} from "lucide-react";

/* ===== INFO ROW ===== */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 text-sm text-gray-700">
    <span className="text-blue-600 mt-0.5">{icon}</span>
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
    <section className="min-h-screen bg-slate-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Doctors
          </h1>
          <p className="text-gray-600 mt-1">
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
                  rounded-2xl bg-white border border-gray-200
                  shadow-sm hover:shadow-md transition
                  overflow-hidden
                "
              >
                {/* AVATAR */}
                <div className="h-48 bg-slate-100 flex items-center justify-center">
                  <img
                    src={doc.docAvatar?.url || "/doctor-placeholder.png"}
                    alt="Doctor"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doc.firstName} {doc.lastName}
                    </h3>
                    <p className="text-sm font-medium text-blue-600">
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
                    <InfoRow
                      icon={<IdCard size={16} />}
                      label="Government ID"
                      value={doc.governmentId}
                    />
                    <InfoRow
                      icon={<User size={16} />}
                      label="Gender"
                      value={doc.gender}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500">
            No registered doctors found.
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Doctors;
