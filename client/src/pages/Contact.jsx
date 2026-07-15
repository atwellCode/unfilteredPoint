import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiLocationMarker,
  HiPhone,
  HiOutlineMail,
  HiUser,
  HiMail,
  HiChatAlt,
} from "react-icons/hi";
import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`Thank you, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: HiLocationMarker,
      title: "Visit Us",
      detail: "Atlaas Plaza near Medicare Hospital, Kharian, Punjab",
    },
    {
      icon: HiPhone,
      title: "Call Us",
      detail: "+92 (342) 5964061",
    },
    {
      icon: HiOutlineMail,
      title: "Email Us",
      detail: "info@unfilterpoint.com",
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, link: "#", color: "#1877f2" },
    { icon: FaTwitter, link: "#", color: "#1da1f2" },
    { icon: FaInstagram, link: "#", color: "#e4405f" },
    { icon: FaYoutube, link: "#", color: "#ff0000" },
  ];

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-[-30%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[#ff0000]/5 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-black/5 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        {/* LEFT SIDE – Brand & Info */}
        <div className="bg-gradient-to-br from-[#ff0000] to-black p-8 md:p-12 flex flex-col justify-between text-white">
          <div>
            

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Let’s Talk
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-white/80 text-lg max-w-sm"
            >
              We’re here to help and answer any question you might have. We look
              forward to hearing from you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 space-y-5"
          >
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <item.icon className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-white/70 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold mb-2">Follow us</p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white transition-colors group"
                    aria-label={social.icon.name}
                  >
                    <social.icon className="text-white text-sm group-hover:text-[#ff0000] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE – Form */}
        <div className="p-8 md:p-12 bg-white/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
              Send a Message
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              We’ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <HiChatAlt className="absolute left-3 top-4 text-gray-400" />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff0000] focus:border-transparent resize-y transition-all"
                    placeholder="Your message…"
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ff0000] text-white font-bold py-3 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;