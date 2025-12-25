import React from "react";
import { motion } from "framer-motion";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    // { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Our Departments
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Specialized medical departments delivering expert care with modern
            technology.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="
            flex gap-6 overflow-x-auto pb-4
            lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 lg:overflow-visible
            scrollbar-hide
          "
        >
          {departmentsArray.map((dept, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="
                min-w-[260px] lg:min-w-0
                relative rounded-2xl overflow-hidden
                shadow-lg group bg-white dark:bg-gray-900
              "
            >
              {/* Image */}
              <img
                src={dept.imageUrl}
                alt={dept.name}
                className="
                  w-full h-[220px] object-cover
                  transition-transform duration-500
                  group-hover:scale-110
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Name */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                <h3 className="text-lg font-semibold text-white">
                  {dept.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Departments;
