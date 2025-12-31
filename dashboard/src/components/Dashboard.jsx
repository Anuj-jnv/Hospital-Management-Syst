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
      .get("https://hospital-management-syst.onrender.com/api/v1/appointment/getall", {
        withCredentials: true,
      })
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => setAppointments([]));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `https://hospital-management-syst.onrender.com/api/v1/appointment/update/${id}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* ================= TOP ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Welcome */}
          <div className="lg:col-span-2 flex items-center gap-6 p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <img
              src="/doc.png"
              alt="admin"
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h2 className="text-2xl font-extrabold text-gray-900">
                {admin?.firstName} {admin?.lastName}
              </h2>
              <p className="mt-2 text-gray-600">
                Manage appointments and doctors efficiently.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard
              icon={<CalendarCheck className="text-blue-600" />}
              label="Total Appointments"
              value={appointments.length}
            />
            <StatCard
              icon={<Users className="text-blue-600" />}
              label="Doctors Involved"
              value={
                new Set(appointments.map((a) => a.doctorId)).size
              }
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-x-auto">
          <h3 className="px-8 py-5 text-xl font-bold text-gray-900 border-b border-gray-200">
            Appointments
          </h3>

          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
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
                    className="border-t border-gray-200 hover:bg-slate-50 transition"
                  >
                    <Td bold>
                      {a.firstName} {a.lastName}
                    </Td>
                    <Td>
                      {a.doctorName}
                    </Td>
                    <Td>{a.department}</Td>
                    <Td>{a.appointmentDate?.substring(0, 10)}</Td>

                    {/* STATUS */}
                    <Td>
                      <select
                        value={a.status}
                        onChange={(e) =>
                          updateStatus(a._id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-md border text-sm font-semibold
                          ${
                            a.status === "Accepted"
                              ? "bg-green-50 text-green-700 border-green-300"
                              : a.status === "Rejected"
                              ? "bg-red-50 text-red-700 border-red-300"
                              : "bg-yellow-50 text-yellow-700 border-yellow-300"
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
                    className="py-8 text-center text-gray-500"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

/* ================= REUSABLE ================= */
const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
    <div className="p-3 rounded-xl bg-blue-50">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <h4 className="text-2xl font-extrabold text-gray-900">
        {value}
      </h4>
    </div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
    {children}
  </th>
);

const Td = ({ children, bold }) => (
  <td
    className={`px-6 py-4 ${
      bold
        ? "font-semibold text-gray-900"
        : "text-gray-700"
    }`}
  >
    {children}
  </td>
);

export default Dashboard;
