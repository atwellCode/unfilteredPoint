import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

const API_URL = "http://localhost:3001/posts";

// Helper: format date to "15 July 2026"
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

// Animation variants
const containerVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.4, type: "spring", stiffness: 200 } },
};

const TrendingSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        const blogPosts = data
          .filter((p) => p.type === 'blog' && p.status === 'active')
          .sort((a, b) => {
            const dateA = new Date(`${a.uploadedDate}T${a.uploadedTime || '00:00'}`);
            const dateB = new Date(`${b.uploadedDate}T${b.uploadedTime || '00:00'}`);
            return dateB - dateA;
          });
        setBlogs(blogPosts.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center text-red-500">
        Error loading blogs: {error}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center text-gray-500">
        No blog posts available.
      </div>
    );
  }

  const mainBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative"
    >
      {/* Background subtle decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF0000]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF0000]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Section Header */}
      <motion.div variants={headerVariants} className="text-center mb-10 relative z-10">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF0000] bg-red-50 px-4 py-1.5 rounded-full mb-3"
        >
          Featured Stories
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
          Trending <span className="text-[#FF0000]">Blogs</span>
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-16 h-1 bg-[#FF0000] mx-auto mt-4 rounded-full"
        />
      </motion.div>

      {/* Blog Grid – Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Main Blog – Large Card */}
        <motion.div variants={cardVariants} className="lg:col-span-2">
          <Link
            to={`/blog/${mainBlog.id}`}
            className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="aspect-video md:aspect-[16/10] bg-gray-900 relative">
              <img
                src={mainBlog.image || "/placeholder-image.jpg"}
                alt={mainBlog.heading}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-[#FF0000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {mainBlog.category || "Featured"}
                  </span>
                  <span className="text-white/60 text-xs font-medium">
                    {formatDate(mainBlog.uploadedDate)}
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2 line-clamp-2">
                  {mainBlog.heading}
                </h3>
                <p className="text-sm md:text-base text-gray-300 line-clamp-2 max-w-2xl">
                  {mainBlog.subHeading || mainBlog.description}
                </p>
                <div className="mt-4 flex items-center text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
                  <span className="inline-flex items-center gap-2">
                    Read Article
                    <HiArrowNarrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Side Blogs – Two Small Cards */}
        <motion.div variants={cardVariants} className="flex flex-col gap-6">
          {sideBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="group block flex-1 relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <div className="aspect-video sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-video bg-gray-900 relative">
                <img
                  src={blog.image || "/placeholder-image.jpg"}
                  alt={blog.heading}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-[#FF0000] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {blog.category || "Blog"}
                    </span>
                    <span className="text-white/50 text-[10px] font-medium">
                      {formatDate(blog.uploadedDate)}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base lg:text-lg font-bold text-white leading-snug line-clamp-2">
                    {blog.heading}
                  </h4>
                  <div className="mt-2 flex items-center text-white/70 text-xs font-semibold group-hover:text-white transition-colors">
                    <span className="inline-flex items-center gap-1">
                      Read More
                      <HiArrowNarrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Animated "View All Blogs" Button */}
      <motion.div variants={buttonVariants} className="flex justify-center mt-12 relative z-10">
        <Link
          to="/blogs"
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#FF0000] text-white font-bold rounded-full shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 text-sm uppercase tracking-wider font-bold">
            View All Blogs
          </span>
          <HiArrowNarrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default TrendingSection;