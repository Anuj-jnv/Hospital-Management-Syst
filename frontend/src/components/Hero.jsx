import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = ({ title, imageUrl }) => {
  return (
    <section className="w-full pt-38 pb-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            {title}
          </h1>

          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl">
            AI Medical Technology is a state-of-the-art facility dedicated to
            providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs.
            At AIMT, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
         
         <Link to="/appointment#appointment-form">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-black to-gray-700 dark:from-gray-800 dark:to-gray-600"
          >
            Book Appointment
          </motion.button>
          </Link>
        </motion.div>

        {/* Image Section */}
<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
  className="relative flex justify-center items-center"
>
  {/* Decorative Vector Background */}
  <motion.img
    src="/Vector.png"
    alt="vector background"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="absolute w-[420px] lg:w-[520px] -z-0 blur-sm"
  />

  {/* Floating Accent Circle (Optional but Looks Premium) */}
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 opacity-40 -z-10"
  />

  {/* Main Hero Image */}
  <motion.img
    src={imageUrl}
    alt="hero"
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.4 }}
    className="relative z-10 w-full max-w-md object-contain"
  />
</motion.div>

      </div>
    </section>
  );
};

export default Hero;
