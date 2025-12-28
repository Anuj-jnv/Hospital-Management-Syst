import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Patient messages & enquiries
        </p>
      </div>

      {/* Messages */}
      {messages.length ? (
        <div className="space-y-6">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg._id;

            return (
              <div
                key={msg._id}
                className="relative rounded-2xl bg-white dark:bg-zinc-900
                border border-gray-200 dark:border-zinc-800
                shadow-sm hover:shadow-lg transition"
              >
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  {/* LEFT: Sender */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <User className="text-indigo-600 dark:text-indigo-400" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {msg.firstName} {msg.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{msg.email}</p>
                      </div>
                    </div>

                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                      <p className="flex items-center gap-2">
                        <Mail size={14} /> {msg.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} /> {msg.phone}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveReply(msg)}
                      className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                      Reply
                    </button>
                  </div>

                  {/* RIGHT: Message */}
                  <div className="md:col-span-2">
                    <div className="rounded-xl bg-gray-50 dark:bg-zinc-800 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <MessageSquare size={16} className="text-indigo-600" />
                        Message
                      </div>

                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                        {isExpanded || msg.message.length <= 160
                          ? msg.message
                          : `${msg.message.slice(0, 160)}...`}
                      </p>

                      {msg.message.length > 160 && (
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : msg._id)
                          }
                          className="text-sm font-medium text-indigo-600 hover:underline"
                        >
                          {isExpanded ? "Show less" : "Read full message"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center text-gray-500">
          No messages available.
        </div>
      )}

      {/* Reply Modal (UI only) */}
      {activeReply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reply to {activeReply.firstName}</h3>
              <button onClick={() => setActiveReply(null)}>
                <X />
              </button>
            </div>

            <textarea
              rows={5}
              placeholder="Type your reply..."
              className="w-full px-4 py-3 rounded-lg border dark:border-zinc-700
              bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveReply(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => {
                  toast.info("Reply UI ready (backend can be added)");
                  setActiveReply(null);
                }}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Messages;
