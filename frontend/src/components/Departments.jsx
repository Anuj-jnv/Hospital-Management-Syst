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
  ];

  return (
    
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Our Departments
          </h2>
          <p className="text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
            Specialized medical departments delivering expert care supported by
            modern technology and experienced professionals.
          </p>
        </motion.div>

        {/* MOBILE SCROLL | DESKTOP GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="
            flex gap-6 overflow-x-auto pb-6
            lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 lg:overflow-visible
            scrollbar-hide
          "
        >
          {departmentsArray.map((dept, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="
                min-w-[260px] lg:min-w-0
                relative overflow-hidden
                rounded-xl bg-white
                shadow-md hover:shadow-xl transition
              "
            >
              {/* IMAGE */}
              <img
                src={dept.imageUrl}
                alt={dept.name}
                className="
                  w-full h-[220px] object-cover
                  transition-transform duration-500
                  hover:scale-105
                "
              />

              {/* SUBTLE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/10 to-transparent" />

              {/* NAME */}
              <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {dept.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    
  );
};

export default Departments;
