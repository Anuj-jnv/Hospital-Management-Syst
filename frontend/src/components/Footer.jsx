import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaLocationArrow,
  FaInstagram,
  FaFacebook,
  FaYoutube
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-7xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-4 lg:grid-cols-4"
      >
        {/* BRAND */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
            CareConnect
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-sm">
            Technology-driven healthcare built on compassion, precision, and
            trust.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-5 pt-3">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div variants={item}>
          <h4 className="text-xl font-bold text-gray-900 mb-5">
            Quick Links
          </h4>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:text-blue-700 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/appointment"
                className="hover:text-blue-700 transition"
              >
                Appointment
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-700 transition"
              >
                About
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* WORKING HOURS */}
        <motion.div variants={item}>
          <h4 className="text-xl font-bold text-gray-900 mb-5">
            Working Hours
          </h4>
          <ul className="space-y-3 text-gray-700">
            {hours.map(({ id, day, time }) => (
              <li
                key={id}
                className="flex justify-between gap-4 text-lg"
              >
                <span className="font-semibold">{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div variants={item}>
          <h4 className="text-xl font-bold text-gray-900 mb-5">
            Contact
          </h4>
          <div className="space-y-4 text-lg text-gray-700">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600" />
              <span>999-987-9999</span>
            </div>
            <div className="flex items-center gap-4">
              <MdEmail className="text-blue-600" />
              <span>cc@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaLocationArrow className="text-blue-600" />
              <span>Uttar Pradesh, India</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 py-6 text-center text-base text-gray-600">
        © {new Date().getFullYear()} CareConnect. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
