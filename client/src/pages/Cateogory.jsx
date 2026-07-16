import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight, HiTrendingUp } from "react-icons/hi";
import {
  FaGlobe,
  FaMicrochip,
  FaHeartbeat,
  FaBuilding,
  FaFilm,
  FaFootballBall,
} from "react-icons/fa";
import { FaBalanceScale, FaLaptop } from "react-icons/fa";
import categoriesData from "../data/categories.json";
import postsData from "../data/database.json";

const iconMap = {
  FaBalanceScale: FaBalanceScale,
  FaLaptop: FaLaptop,
  FaGlobe: FaGlobe,
  FaMicrochip: FaMicrochip,
  FaHeartbeat: FaHeartbeat,
  FaBuilding: FaBuilding,
  FaFilm: FaFilm,
  FaFootballBall: FaFootballBall,
};

const Category = () => {
  const categories = categoriesData;
  const allPosts = postsData.posts;

  const getPostCount = (slug) => {
    return allPosts.filter((post) => post.category === slug).length;
  };

  // Get latest post for a category (for preview)
  const getLatestPost = (slug) => {
    const categoryPosts = allPosts.filter((post) => post.category === slug);
    return categoryPosts.length > 0 ? categoryPosts[categoryPosts.length - 1] : null;
  };

  const totalPosts = allPosts.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ff0000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block px-6 py-1.5 bg-[#ff0000]/10 text-[#ff0000] rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            {categories.length} Categories • {totalPosts} Total Posts
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-tight">
            Explore <span className="text-[#ff0000] relative">
              All Topics
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#ff0000] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Browse every category – from politics to sports, we've got you covered. Click "View All" to explore posts in each topic.
          </p>
        </motion.div>

        {/* All Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            const postCount = getPostCount(category.slug);
            const latestPost = getLatestPost(category.slug);
            const isPopular = postCount > 3;

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: `0 20px 40px -8px ${category.color}40`,
                  borderColor: category.color,
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-start border border-white/50 relative overflow-hidden group"
              >
                {/* Animated gradient glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${category.color}20, transparent 70%)`,
                  }}
                />

                {/* Category color accent bar */}
                <div
                  className="absolute top-0 left-0 w-full h-1.5"
                  style={{ backgroundColor: category.color }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-1/3 h-1.5 rounded-full blur-md"
                  style={{ backgroundColor: category.color }}
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Icon with pulsing glow */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative"
                  style={{ backgroundColor: category.color + "15" }}
                >
                  {IconComponent && (
                    <IconComponent
                      className="text-4xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ color: category.color }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ boxShadow: `0 0 30px ${category.color}30` }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <h3 className="text-2xl font-bold text-black tracking-tight">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed flex-1">
                  {category.description}
                </p>

                {/* Post count & Popular badge */}
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="bg-[#f1f1f1] text-gray-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-[#ff0000] font-bold">{postCount}</span>
                    {postCount === 1 ? "post" : "posts"}
                  </span>
                  {isPopular && (
                    <span className="bg-[#ff0000]/10 text-[#ff0000] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <HiTrendingUp className="text-xs" /> Popular
                    </span>
                  )}
                </div>

                {/* Latest post preview */}
                {latestPost && (
                  <div className="mt-3 w-full">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                      Latest
                    </p>
                    <p className="text-sm text-gray-700 truncate">
                      {latestPost.heading}
                    </p>
                  </div>
                )}

                {/* View All button */}
                <Link
                  to={`/category/${category.slug}`}
                  className="mt-5 w-full group inline-flex items-center justify-between text-sm font-semibold text-[#ff0000] hover:text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-1 group-hover:gap-3 transition-all">
                    View All Posts
                    <HiArrowNarrowRight className="text-lg transition-transform group-hover:translate-x-2" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#ff0000]/10 group-hover:bg-[#ff0000] flex items-center justify-center transition-colors duration-300">
                    <span className="text-[#ff0000] group-hover:text-white transition-colors text-lg font-light">→</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA – if no categories found */}
        {categories.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <p className="text-gray-500 text-lg">No categories found. Please add some categories to your JSON file.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;