import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    governmentId: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorName: "",
    address: "",
    hasVisited: false,
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

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

  /* INPUT STYLES — CONSISTENT WITH HERO / BIOGRAPHY */
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 " +
    "placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600";

  const selectClass = inputClass + " cursor-pointer";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-syst.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "governmentId",
      "dob",
      "gender",
      "appointmentDate",
      "department",
      "doctorName",
      "hasVisited",
      "address",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error("All fields are required");
      }
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hospital-management-syst.onrender.com/api/v1/appointment/post",
        {
          ...formData,
          hasVisited: Boolean(formData.hasVisited),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        governmentId: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorName: "",
        address: "",
        hasVisited: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-5xl mx-auto bg-white
          rounded-2xl shadow-lg p-10
        "
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-700 mt-3">
            Schedule your visit with our expert doctors
          </p>
        </div>

        {/* FORM */}
        <form id="appointment-form" onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="First Name">
              <input
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            <Field label="Last Name">
              <input
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
          </div>

          {/* EMAIL & PHONE */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Email">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            <Field label="Mobile Number">
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
          </div>

          {/* ID & DOB */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Government ID">
              <input
                name="governmentId"
                placeholder="Aadhaar / Passport"
                value={formData.governmentId}
                onChange={handleChange}
                className={inputClass}
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
          </div>

          {/* GENDER & DATE */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Gender">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>

            <Field label="Appointment Date">
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
          </div>

          {/* DEPARTMENT & DOCTOR */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Department">
              <select
                name="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                    doctorName: "",
                  })
                }
                className={selectClass}
              >
                {departmentsArray.map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Doctor">
              <select
                value={formData.doctorName}
                onChange={(e) =>
                  setFormData({ ...formData, doctorName: e.target.value })
                }
                className={selectClass}
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                {doctors
                  .filter(
                    (doc) => doc.doctorDepartment === formData.department
                  )
                  .map((doc, i) => (
                    <option
                      key={i}
                      value={`${doc.firstName} ${doc.lastName}`}
                    >
                      {doc.firstName} {doc.lastName}
                    </option>
                  ))}
              </select>
            </Field>
          </div>

          {/* ADDRESS */}
          <Field label="Address">
            <textarea
              rows={4}
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass + " resize-none"}
            />
          </Field>

          {/* CHECKBOX */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="hasVisited"
              checked={formData.hasVisited}
              onChange={handleChange}
              className="h-5 w-5 accent-blue-600"
            />
            <span className="text-gray-700">
              Have you visited before?
            </span>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="
                px-14 py-3 rounded-full
                text-white text-lg font-semibold
                bg-blue-600 hover:bg-blue-700
                disabled:opacity-60 transition
              "
            >
              {loading ? "Submitting..." : "Get Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

/* FIELD WRAPPER — TYPOGRAPHY MATCHED */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default AppointmentForm;
