import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        { withCredentials: true }
      );

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-28 bg-slate-50 overflow-hidden">
      {/* Decorative Vector */}
      {/* <motion.img
        src="/Vector.png"
        alt="decorative background"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute right-0 bottom-0 w-[480px] pointer-events-none"
      /> */}

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
          Send Us a Message
        </h2>

        <AnimatePresence>
          {success ? (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-14 text-center"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Message Sent Successfully
              </h3>
              <p className="text-lg text-gray-700">
                Our team will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            /* FORM */
            <motion.form
              onSubmit={handleMessage}
              animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-10 space-y-6"
            >
              {/* NAME */}
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             text-gray-900 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             text-gray-900 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* CONTACT */}
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             text-gray-900 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             text-gray-900 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* MESSAGE */}
              <textarea
                rows={6}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300
                           text-gray-900 placeholder-gray-500 resize-none
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {/* SUBMIT */}
              <div className="flex justify-center pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  type="submit"
                  className="px-14 py-3 rounded-full
                             text-lg font-semibold text-white
                             bg-blue-600 hover:bg-blue-700
                             disabled:opacity-60 transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MessageForm;
