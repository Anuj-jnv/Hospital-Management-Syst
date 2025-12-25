import React from "react";
import { motion } from "framer-motion";

const Biography = ({ imageUrl }) => {
  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* Decorative background */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 opacity-40 blur-2xl" />

          <img
            src={imageUrl}
            alt="Who we are"
            className="relative z-10 w-full max-w-md rounded-2xl shadow-xl object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Biography
          </span>

          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Who We Are
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We are a healthcare-focused technology organization committed to
            delivering compassionate, reliable, and patient-centric medical
            solutions. Our goal is to bridge modern technology with expert care
            to improve lives and outcomes.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            With a team of dedicated professionals and cutting-edge systems, we
            continuously strive to redefine healthcare experiences through
            innovation, transparency, and trust.
          </p>

          {/* Highlight Box */}
          <div className="border-l-4 border-black dark:border-gray-500 pl-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-md">
            <p className="font-semibold text-gray-900 dark:text-white">
              We are all in — building smarter healthcare for 2025 and beyond.
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our philosophy is simple: technology should empower care, not
            replace it. Every solution we build is guided by empathy,
            precision, and responsibility.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
              Innovation
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
              Trust
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
              Care
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Biography;
