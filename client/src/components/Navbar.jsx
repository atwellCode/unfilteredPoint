import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMenu,
  HiX,
  HiSearch,
  HiBell,
  HiHome,
  HiBookOpen,
  HiTag,
  HiMail,
} from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navItems = [
    { name: "Home", path: "/", icon: HiHome },
    { name: "Blogs", path: "/blogs", icon: HiBookOpen },
    { name: "Category", path: "/category", icon: HiTag },
    { name: "Contact", path: "/contact", icon: HiMail },
  ];

  // Mobile menu variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  // Search bar slide animation
  const searchBarVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">U</span>
            </motion.div>
            <motion.span
              className="text-2xl font-extrabold text-black tracking-tight"
              whileHover={{ color: "#ff0000" }}
            >
              unfilterpoint
            </motion.span>
          </NavLink>

          {/* Center: Desktop Nav Items */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white bg-[#ff0000] shadow-md"
                      : "text-black hover:bg-[#ff0000]/10 hover:text-[#ff0000]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>
                    {!isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff0000]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: Search & Subscribe */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button
              onClick={toggleSearch}
              className="text-black hover:text-[#ff0000] transition-colors p-2 rounded-full hover:bg-[#f1f1f1]"
              aria-label="Search"
            >
              <HiSearch className="h-5 w-5" />
            </button>

            {/* Subscribe Button (Desktop) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex bg-[#ff0000] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow items-center gap-2"
            >
              <HiBell className="text-lg" />
              Subscribe
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none p-2 rounded-lg hover:bg-[#f1f1f1] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            variants={searchBarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 w-full bg-white shadow-lg border-t border-[#f1f1f1] overflow-hidden"
            style={{ top: "100%" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search articles, categories, or topics..."
                  className="flex-1 px-4 py-2 border border-[#f1f1f1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-shadow"
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="text-black hover:text-[#ff0000] transition-colors p-2"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm shadow-xl absolute top-16 left-0 w-full h-screen border-t border-[#f1f1f1]"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center h-full space-y-8 text-2xl px-4"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, color: "#ff0000" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full max-w-xs"
                  >
                    <NavLink
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-center gap-4 py-3 px-6 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-[#ff0000] text-white shadow-lg"
                            : "text-black hover:bg-[#ff0000]/10"
                        }`
                      }
                    >
                      <Icon className="text-3xl" />
                      <span className="font-semibold">{item.name}</span>
                    </NavLink>
                  </motion.div>
                );
              })}

              {/* Mobile Subscribe Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-[#ff0000] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg flex items-center gap-3"
              >
                <HiBell /> Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;