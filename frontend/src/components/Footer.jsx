import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa";
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Medical Technology
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Technology-driven healthcare with compassion, precision, and trust.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-500 hover:text-black dark:hover:text-white transition">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-black dark:hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={item}>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-black dark:hover:text-white">Home</Link></li>
            <li><Link to="/appointment" className="hover:text-black dark:hover:text-white">Appointment</Link></li>
            <li><Link to="/about" className="hover:text-black dark:hover:text-white">About</Link></li>
          </ul>
        </motion.div>

        {/* Working Hours */}
        <motion.div variants={item}>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Working Hours
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {hours.map(({ id, day, time }) => (
              <li key={id} className="flex justify-between gap-4">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={item}>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact
          </h4>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <FaPhoneAlt /> <span>999-987-9999</span>
            </div>
            <div className="flex items-center gap-3">
              <MdEmail /> <span>aimt@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaLocationArrow /> <span>Uttar Pradesh, India</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} AI Medical Technology. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
