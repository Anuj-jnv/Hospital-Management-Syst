import axios from "axios";
import { useContext, useEffect, useState,useRef } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, User, MessageSquare, X } from "lucide-react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
  const { isAuthenticated } = useContext(Context);

  const fetchedRef = useRef(false);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/admin",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load messages");
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Patient messages & enquiries
          </p>
        </div>

        {/* ===== MESSAGE LIST ===== */}
        {messages.length ? (
          <div className="space-y-6">
            {messages.map((msg) => {
              const isExpanded = expandedId === msg._id;

              return (
                <motion.div
                  key={msg._id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="
                    rounded-2xl bg-white border border-gray-200
                    shadow-sm hover:shadow-md transition
                  "
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* LEFT */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="text-blue-600" size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {msg.firstName} {msg.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{msg.email}</p>
                        </div>
                      </div>

                      <div className="text-sm space-y-1 text-gray-600">
                        <p className="flex items-center gap-2">
                          <Mail size={14} /> {msg.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={14} /> {msg.phone}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveReply(msg)}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Reply
                      </button>
                    </div>

                    {/* RIGHT */}
                    <div className="md:col-span-2">
                      <div className="rounded-xl bg-slate-100 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <MessageSquare size={16} className="text-blue-600" />
                          Message
                        </div>

                        <p className="text-sm leading-relaxed text-gray-700">
                          {isExpanded || msg.message.length <= 160
                            ? msg.message
                            : `${msg.message.slice(0, 160)}...`}
                        </p>

                        {msg.message.length > 160 && (
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : msg._id)
                            }
                            className="text-sm font-semibold text-blue-600 hover:underline"
                          >
                            {isExpanded ? "Show less" : "Read full message"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center text-gray-500">
            No messages available.
          </div>
        )}
      </motion.div>

      {/* ===== REPLY MODAL ===== */}
      {activeReply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Reply to {activeReply.firstName}
              </h3>
              <button
                onClick={() => setActiveReply(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X />
              </button>
            </div>

            <textarea
              rows={5}
              placeholder="Type your reply..."
              className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveReply(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  toast.info("This Reply feature (Comming Soon)");
                  setActiveReply(null);
                }}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Messages;
