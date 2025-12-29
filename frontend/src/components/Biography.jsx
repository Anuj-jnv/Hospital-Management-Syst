import React from "react";
import { motion } from "framer-motion";

const Biography = ({ imageUrl }) => {
  return (
    <section className="w-full py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            space-y-7
            order-1
            lg:order-2
          "
        >
          {/* Mobile-first headings */}
          <span className="block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Biography
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Who We Are
          </h2>

          {/* Body text */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
            We are a healthcare-focused technology organization dedicated to
            delivering compassionate, reliable, and patient-centric medical
            solutions. Our mission is to combine clinical expertise with modern
            technology to improve outcomes and experiences.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
            With a team of skilled professionals and advanced systems, we
            continuously innovate to make healthcare more accessible,
            transparent, and trustworthy.
          </p>

          {/* Highlight */}
          <div className="border-l-4 border-blue-600 pl-5 py-3 bg-white rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-gray-900">
              We are building smarter, safer healthcare for 2025 and beyond.
            </p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
            Our philosophy is simple — technology should empower care, not
            replace it. Every solution we design is guided by empathy,
            precision, and responsibility.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 pt-4">
            {["Innovation", "Trust", "Care"].map((item) => (
              <span
                key={item}
                className="px-5 py-2 rounded-full text-sm font-semibold
                           bg-blue-100 text-blue-800"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            relative flex justify-center
            order-2
            lg:order-1
          "
        >
          <div className="absolute -inset-8 rounded-3xl bg-blue-100 opacity-40 blur-3xl" />

          <img
  src={imageUrl}
  alt="Who we are"
  className="relative z-10 w-full max-w-lg object-contain"
/>
        </motion.div>

      </div>
    </section>
  );
};

export default Biography;
