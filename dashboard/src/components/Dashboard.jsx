import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/appointment/getall", {
        withCredentials: true,
      })
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => setAppointments([]));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${id}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* ================= TOP SECTION ================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Welcome */}
        <div className="lg:col-span-2 flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-sm">
          <img src="/doc.png" alt="admin" className="w-20 h-20" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back,
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {admin?.firstName} {admin?.lastName}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage appointments and doctors efficiently.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard
            icon={<CalendarCheck />}
            label="Total Appointments"
            value={appointments.length}
          />
          <StatCard
            icon={<Users />}
            label="Doctors Involved"
            value={
              new Set(appointments.map((a) => a.doctorId)).size
            }
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-x-auto bg-white dark:bg-black">
        <h3 className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
          Appointments
        </h3>

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <Th>Patient</Th>
              <Th>Doctor</Th>
              <Th>Department</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Visited</Th>
            </tr>
          </thead>

          <tbody>
            {appointments.length ? (
              appointments.map((a) => (
                <tr
                  key={a._id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <Td bold>
                    {a.firstName} {a.lastName}
                  </Td>
                  <Td>
                    {a.doctor.firstName} {a.doctor.lastName}
                  </Td>
                  <Td>{a.department}</Td>
                  <Td>{a.appointment_date?.substring(0, 10)}</Td>

                  {/* STATUS */}
                  <Td>
                    <select
                      value={a.status}
                      onChange={(e) =>
                        updateStatus(a._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-md border text-sm font-medium
                        ${
                          a.status === "Accepted"
                            ? "bg-green-50 text-green-600 border-green-300"
                            : a.status === "Rejected"
                            ? "bg-red-50 text-red-600 border-red-300"
                            : "bg-yellow-50 text-yellow-600 border-yellow-300"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </Td>

                  {/* VISITED */}
                  <Td>
                    {a.hasVisited ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

/* ================= REUSABLE COMPONENTS ================= */
const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-sm">
    <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </h4>
    </div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium">
    {children}
  </th>
);

const Td = ({ children, bold }) => (
  <td
    className={`px-6 py-4 ${
      bold
        ? "font-medium text-gray-900 dark:text-white"
        : "text-gray-700 dark:text-gray-300"
    }`}
  >
    {children}
  </td>
);

export default Dashboard;
