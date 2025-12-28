import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = ({ title, imageUrl }) => {
  return (
    
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center py-12">

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
            {title}
          </h1>

          <p className="text-lg leading-relaxed text-gray-700 max-w-xl">
            AI Medical Technology is a state-of-the-art healthcare facility
            dedicated to providing comprehensive medical services with
            compassion and precision. Our experienced professionals deliver
            personalized care, ensuring patient safety, trust, and long-term
            well-being through modern medical solutions.
          </p>

          <Link to="/appointment#appointment-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold text-white
                         bg-blue-600 hover:bg-blue-700
                         shadow-md hover:shadow-lg transition"
            >
              Book Appointment
            </motion.button>
          </Link>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Background */}
          <motion.img
            src="/Vector.png"
            alt="decorative background"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute w-[420px] lg:w-[520px] z-0 blur-sm"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-80 h-80 rounded-full
                       bg-blue-100 opacity-40 -z-10"
          />

          {/* Hero Image */}
          <motion.img
            src={imageUrl}
            alt="Healthcare illustration"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-md object-contain"
          />
        </motion.div>

      </div>
    
  );
};

export default Hero;
