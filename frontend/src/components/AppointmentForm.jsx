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
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorFirstName: "",
    doctorLastName: "",
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

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
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

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.nic ||
      !formData.dob ||
      !formData.gender ||
      !formData.appointmentDate ||
      !formData.department ||
      !formData.doctorFirstName ||
      !formData.address
    ) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          nic: formData.nic,
          dob: formData.dob,
          gender: formData.gender,
          appointment_date: formData.appointmentDate,
          department: formData.department,
          doctor_firstName: formData.doctorFirstName,
          doctor_lastName: formData.doctorLastName,
          hasVisited: Boolean(formData.hasVisited),
          address: formData.address,
        },
        { withCredentials: true }
      );

      toast.success(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorFirstName: "",
        doctorLastName: "",
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
    <section className="w-full py-24 bg-gray-50 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Book an Appointment
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Schedule your visit with our expert doctors
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleAppointment}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Name */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* NIC & DOB */}
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="nic"
              placeholder="NIC Number"
              value={formData.nic}
              onChange={handleChange}
              className={inputClass}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Gender & Appointment Date */}
          <div className="grid sm:grid-cols-2 gap-5">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputClass} ${
                formData.gender ? "" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Appointment Date
              </label>
              <input
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Department & Doctor */}
          <div className="grid sm:grid-cols-2 gap-5">
            <select
              name="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                  doctorFirstName: "",
                  doctorLastName: "",
                })
              }
              className={inputClass}
            >
              {departmentsArray.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={`${formData.doctorFirstName} ${formData.doctorLastName}`}
              onChange={(e) => {
                const [first, last] = e.target.value.split(" ");
                setFormData({
                  ...formData,
                  doctorFirstName: first,
                  doctorLastName: last,
                });
              }}
              disabled={!formData.department}
              className={`${inputClass} ${
                formData.doctorFirstName ? "" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select Doctor
              </option>
              {doctors
                .filter(
                  (doc) => doc.doctorDepartment === formData.department
                )
                .map((doc, idx) => (
                  <option
                    key={idx}
                    value={`${doc.firstName} ${doc.lastName}`}
                  >
                    {doc.firstName} {doc.lastName}
                  </option>
                ))}
            </select>
          </div>

          {/* Address */}
          <textarea
            name="address"
            rows={5}
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={inputClass + " resize-none"}
          />

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="hasVisited"
              checked={formData.hasVisited}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Have you visited before?
            </span>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="px-12 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Get Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default AppointmentForm;
