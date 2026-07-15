import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiCalendar,
  HiClock,
  HiThumbUp,
  HiChatAlt,
  HiArrowLeft,
} from "react-icons/hi";
import postsData from "../data/database.json";
import categoriesData from "../data/categories.json";

const CategoryPosts = () => {
  const { slug } = useParams();
  const allPosts = postsData.posts;
  const category = categoriesData.find((cat) => cat.slug === slug);

  // Filter posts by category slug
  const categoryPosts = allPosts.filter((post) => post.category === slug);

  // If category not found
  if (!category) {
    return (
      <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">Category not found</h2>
          <Link to="/category" className="text-[#ff0000] hover:underline mt-4 inline-block">
            Browse all categories
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const postVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/category"
          className="inline-flex items-center gap-2 text-black hover:text-[#ff0000] transition-colors mb-6"
        >
          <HiArrowLeft className="text-xl" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-[#ff0000]"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            {category.name}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">{category.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>{categoryPosts.length} posts</span>
            <span>•</span>
            <span>
              {categoryPosts.filter((p) => p.isTrending).length} trending
            </span>
          </div>
        </motion.div>

        {/* Posts Grid */}
        {categoryPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <p className="text-gray-500 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categoryPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={postVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.heading}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="uppercase font-semibold text-[#ff0000]">
                      {post.type}
                    </span>
                    {post.isTrending && (
                      <span className="bg-[#ff0000]/10 text-[#ff0000] px-2 py-0.5 rounded-full text-[10px] font-bold">
                        🔥 Trending
                      </span>
                    )}
                    {post.isLocal && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Local
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-black leading-tight mb-2 line-clamp-2">
                    {post.heading}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1 line-clamp-3">
                    {post.subHeading}
                  </p>

                  {/* Meta info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <HiThumbUp className="text-[#ff0000]" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiChatAlt className="text-[#ff0000]" /> {post.comments}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiCalendar className="text-[#ff0000]" />
                      <span>{post.uploadedDate}</span>
                    </div>
                  </div>

                  <Link
                    to={`/post/${post.id}`}
                    className="mt-4 inline-block text-center bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg hover:bg-black transition-colors text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPosts;