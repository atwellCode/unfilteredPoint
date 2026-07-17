import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiSearch,
  HiArrowNarrowRight,
  HiOutlineNewspaper,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
} from "react-icons/hi";
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

const API_URL = "http://localhost:3001/posts";

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

const Category = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (activeCategory !== "all" && post.category !== activeCategory) return false;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      post.heading?.toLowerCase().includes(term) ||
      post.subHeading?.toLowerCase().includes(term) ||
      post.description?.toLowerCase().includes(term) ||
      post.category?.toLowerCase().includes(term)
    );
  });

  const getPostCount = (slug) => posts.filter((p) => p.category === slug).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  // Card animation variants (staggered)
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Page content animation
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Category pills stagger
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

  // Search bar animation
  const searchVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff0000]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-[#f1f1f1] py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-10">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF0000] bg-red-50 px-4 py-1.5 rounded-full mb-3"
          >
            Trending Topics
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Explore <span className="text-[#FF0000]">Categories</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-gray-600 max-w-2xl mx-auto"
          >
            Browse all posts by category or search for a specific topic.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-[#ff0000] mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* Category Pills */}
        <motion.div
          variants={pillsContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
        >
          <motion.button
            variants={pillVariants}
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
              activeCategory === "all"
                ? "bg-[#ff0000] text-white shadow-red-200 scale-105"
                : "bg-white text-gray-700 hover:bg-[#ff0000]/10 hover:text-[#ff0000]"
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
                    ? "bg-[#ff0000] text-white shadow-red-200 scale-105"
                    : "bg-white text-gray-700 hover:bg-[#ff0000]/10 hover:text-[#ff0000]"
                }`}
              >
                {Icon && <Icon className="text-base" />}
                {cat.name}
                <span className="text-xs opacity-70 ml-0.5">({count})</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={searchVariants} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search posts by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-shadow text-sm placeholder:text-gray-400"
            />
          </div>
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-3xl shadow-sm"
            >
              <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => {
                const isNews = post.type === "news";
                return (
                  <motion.div
                    key={post.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group border border-gray-100/80"
                  >
                    {/* Image */}
                    <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                      <img
                        src={post.image || "/placeholder-image.jpg"}
                        alt={post.heading}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                      />
                      {/* Type Badge */}
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 ${
                          isNews
                            ? "bg-blue-600 text-white"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {isNews ? (
                          <HiOutlineNewspaper className="text-sm" />
                        ) : (
                          <HiOutlineBookOpen className="text-sm" />
                        )}
                        {isNews ? "News" : "Blog"}
                      </span>
                      {/* Category tag */}
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <HiOutlineCalendar className="text-[#ff0000]" />
                          {formatDate(post.uploadedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineClock className="text-[#ff0000]" />
                          {post.uploadedTime || "12:00"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#ff0000] transition-colors">
                        {post.heading}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                        {post.subHeading || post.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <HiOutlineUser className="text-[#ff0000]" />
                          <span>{post.author || "UnfilterPoint"}</span>
                        </div>
                        {post.type === "blog" && (
                          <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#ff0000] hover:gap-2 transition-all group-hover:underline"
                          >
                            Read More
                            <HiArrowNarrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Category;