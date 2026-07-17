import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBalanceScale,
  FaBuilding,
  FaMicrochip,
  FaFlask,
  FaLeaf,
  FaHeartbeat,
  FaFootballBall,
  FaFilm,
  FaHeart,
  FaGlobe,
  FaCity,
  FaGavel,
  FaGraduationCap,
  FaComment,
} from "react-icons/fa";
import categoriesData from "../data/categories.json";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const iconMap = {
    FaBalanceScale: FaBalanceScale,
    FaBuilding: FaBuilding,
    FaMicrochip: FaMicrochip,
    FaFlask: FaFlask,
    FaLeaf: FaLeaf,
    FaHeartbeat: FaHeartbeat,
    FaFootballBall: FaFootballBall,
    FaFilm: FaFilm,
    FaHeart: FaHeart,
    FaGlobe: FaGlobe,
    FaCity: FaCity,
    FaGavel: FaGavel,
    FaGraduationCap: FaGraduationCap,
    FaComment: FaComment,
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const blogPosts = data.filter(
          (p) => p.type === "blog" && p.status === "active"
        );
        setPosts(blogPosts);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const getPostCount = (slug) => posts.filter((p) => p.category === slug).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  // ---------- Animation Variants ----------
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const pillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="bg-[#FAF9F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-10">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF0000] bg-red-50 px-4 py-1.5 rounded-full mb-3"
          >
            Featured Blogs
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Latest <span className="text-[#FF0000]">Insights & Updates</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-[#FF0000] mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* Category Pills */}
        <motion.div
          variants={pillsContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
        >
          <motion.button
            variants={pillVariants}
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
              activeCategory === "all"
                ? "bg-[#FF0000] text-white shadow-red-200 scale-105"
                : "bg-white text-gray-700 hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
            }`}
          >
            All ({posts.length})
          </motion.button>
          {categoriesData.map((cat) => {
            const Icon = iconMap[cat.icon];
            const count = getPostCount(cat.slug);
            return (
              <motion.button
                key={cat.id}
                variants={pillVariants}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                  activeCategory === cat.slug
                    ? "bg-[#FF0000] text-white shadow-red-200 scale-105"
                    : "bg-white text-gray-700 hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
                }`}
              >
                {Icon && <Icon className="text-base" />}
                {cat.name}
                <span className="text-xs opacity-70 ml-0.5">({count})</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Blog Cards */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              variants={pageVariants}
              className="space-y-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
                >
                  {/* Image */}
                  <div className="w-full md:w-[35%] h-64 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={post.image || "https://via.placeholder.com/600x400?text=No+Image"}
                      alt={post.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between grow">
                    <div>
                      <h3
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#FF0000] transition-colors duration-200 cursor-pointer"
                      >
                        {post.heading}
                      </h3>
                      <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed line-clamp-3">
                        {post.subHeading || post.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <span className="text-xs md:text-sm text-gray-400 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
                        {formatDate(post.uploadedDate)}
                      </span>
                      <button
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="flex items-center gap-1 text-[#FF0000] font-bold text-sm tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200 hover:underline"
                      >
                        Read More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500"
            >
              No articles found for this category.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Blog;