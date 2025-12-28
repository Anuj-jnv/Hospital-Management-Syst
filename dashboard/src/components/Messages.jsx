import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";

/* ===== INFO ROW ===== */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
    <span className="mt-0.5 text-indigo-600 dark:text-indigo-400">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="break-words">{value || "—"}</span>
  </div>
);

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load messages"
        );
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* ===== HEADER ===== */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Messages received from patients
        </p>
      </div>

      {/* ===== CONTENT ===== */}
      {messages.length ? (
        <div className="space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg._id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="
                rounded-2xl bg-white dark:bg-zinc-900
                border border-gray-200 dark:border-zinc-800
                shadow-sm hover:shadow-lg transition-all
                p-6 space-y-4
              "
            >
              {/* Sender */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <User className="text-indigo-600 dark:text-indigo-400" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {msg.firstName} {msg.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{msg.email}</p>
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-2 pl-1">
                <InfoRow icon={<Mail size={16} />} label="Email" value={msg.email} />
                <InfoRow icon={<Phone size={16} />} label="Phone" value={msg.phone} />
                <InfoRow label="Message" value={msg.message} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
          No messages available.
        </div>
      )}
    </motion.section>
  );
};

export default Messages;
