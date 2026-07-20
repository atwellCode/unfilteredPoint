import { Link } from "react-router-dom"; // ← import Link
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiOutlineMail } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Categories", path: "/category" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    "Politics",
    "Technology",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
  ];

  const socialIcons = [
    { icon: FaFacebookF, link: "#", color: "#1877f2" },
    { icon: FaTiktok, link: "https://www.tiktok.com/@unfilteredpoints?_r=1&_t=ZS-986VWmzeqHI", color: "#1da1f2" },
    { icon: FaInstagram, link: "https://www.instagram.com/unfilteredpoints?igsh=MWdzeXZibWdoZGx2cg%3D%3D&utm_source=qr", color: "#e4405f" },
    { icon: FaLinkedinIn, link: "#", color: "#0a66c2" },
  ];

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-4 overflow-hidden">
      {/* Top decorative border */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-linear-to-r from-[#ff0000] to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-linear-to-l from-[#ff0000] to-transparent" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ff0000] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-[#ff0000] tracking-tight mb-4">
              unfilterpoint
            </h2>
            <p className="text-sm leading-relaxed">
              Your daily dose of unfiltered news, blogs, and insights. We bring
              you the stories that matter, with clarity and honesty.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialIcons.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label={social.icon.name}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-[#ff0000] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#ff0000] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Categories – now with working links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-[#ff0000] pb-2 inline-block">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="hover:text-[#ff0000] transition-colors duration-200 text-sm"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-[#ff0000] pb-2 inline-block">
              Stay Updated
            </h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter and never miss an update.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff0000] text-white placeholder-gray-500 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#ff0000] text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 transition-shadow"
              >
                <FiSend /> Subscribe
              </motion.button>
            </form>

            <div className="mt-6 space-y-4 text-sm">
              <p className="flex items-center gap-2">
                <HiLocationMarker className="text-[#ff0000] text-lg" />
                <span>Atlaas Plaza near Medicare Hospital, Kharian, Punjab</span>
              </p>
              <p className="flex items-center gap-2">
                <HiPhone className="text-[#ff0000] text-lg" />
                <span>+92 (342) 5964061</span>
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineMail className="text-[#ff0000] text-lg" />
                <span>info@unfilterpoint.com</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500"
        >
          <p>
            &copy; {currentYear} <span className="text-[#ff0000] font-semibold">unfilterpoint</span> – All rights reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <span className="text-white font-medium">Arslan</span> &amp;{" "}
            <span className="text-white font-medium">Alishba</span> from{" "}
            <span className="text-[#ff0000] font-semibold">Benzyo Digital Marketing Agency</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;