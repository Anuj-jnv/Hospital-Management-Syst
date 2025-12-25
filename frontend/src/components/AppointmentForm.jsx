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

  /* Same input style as Login */
  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500";

  const selectClass = inputClass + " cursor-pointer";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
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
      "nic",
      "dob",
      "gender",
      "appointmentDate",
      "department",
      "doctorFirstName",
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
    <section className="min-h-screen bg-gray-50 dark:bg-black px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Book an Appointment
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Schedule your visit with our expert doctors
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid sm:grid-cols-2 gap-5">
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

          {/* Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
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

          {/* NIC & DOB */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Government ID (Optional)">
              <input
                name="governmentId"
                placeholder="Aadhaar / CNIC / Passport (optional)"
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

          {/* Gender & Appointment Date */}
          <div className="grid sm:grid-cols-2 gap-5">
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
                <option className="text-black" value="Male">
                  Male
                </option>
                <option className="text-black" value="Female">
                  Female
                </option>
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

          {/* Department & Doctor */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Department">
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
                className={selectClass}
              >
                {departmentsArray.map((dept, i) => (
                  <option key={i} className="text-black" value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Doctor">
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
                className={selectClass}
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                {doctors
                  .filter(
                    (doc) =>
                      doc.doctorDepartment === formData.department
                  )
                  .map((doc, i) => (
                    <option
                      key={i}
                      className="text-black"
                      value={`${doc.firstName} ${doc.lastName}`}
                    >
                      {doc.firstName} {doc.lastName}
                    </option>
                  ))}
              </select>
            </Field>
          </div>

          {/* Address */}
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

          {/* Checkbox */}
          <div className="flex items-center gap-3 pt-2">
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
              className="px-12 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Get Appointment"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

/* Reusable Field Wrapper */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

export default AppointmentForm;
