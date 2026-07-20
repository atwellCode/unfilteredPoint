import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const API_URL = "http://localhost:3001/posts";

// Helper: format relative time
const formatTimeAgo = (dateStr, timeStr) => {
  if (!dateStr) return "Just now";
  const dateTime = `${dateStr}T${timeStr || '00:00'}`;
  const then = new Date(dateTime);
  if (isNaN(then)) return "Just now";
  const now = new Date();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

// Helper: truncate description to first sentence
const getFirstSentence = (text) => {
  if (!text) return '';
  const match = text.match(/^[^.!?]*[.!?]/);
  if (match) return match[0];
  return text.slice(0, 120) + (text.length > 120 ? '...' : '');
};

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
  }),
};

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [userLikes, setUserLikes] = useState({});

  // Comment modal state
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  // Load posts from server
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      const newsPosts = data
        .filter((p) => p.type === "news" && p.status === "active")
        .sort((a, b) => {
          const dateA = new Date(`${a.uploadedDate}T${a.uploadedTime || '00:00'}`);
          const dateB = new Date(`${b.uploadedDate}T${b.uploadedTime || '00:00'}`);
          return dateB - dateA;
        });
      setPosts(newsPosts);
      const storedLikes = JSON.parse(localStorage.getItem("newsLikes") || "{}");
      setUserLikes(storedLikes);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Update post on server
  const updatePostOnServer = async (updatedPost) => {
    const res = await fetch(`${API_URL}/${updatedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return await res.json();
  };

  // Like handler
  const handleLike = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const isLiked = userLikes[postId] || false;
    const newLikeState = !isLiked;
    const updatedLikes = newLikeState ? (post.likes || 0) + 1 : (post.likes || 0) - 1;

    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, likes: updatedLikes } : p
    );
    setPosts(updatedPosts);
    setUserLikes((prev) => ({ ...prev, [postId]: newLikeState }));
    localStorage.setItem("newsLikes", JSON.stringify({ ...userLikes, [postId]: newLikeState }));

    try {
      await updatePostOnServer({ ...post, likes: updatedLikes });
    } catch (err) {
      setPosts(posts);
      setUserLikes((prev) => ({ ...prev, [postId]: isLiked }));
      localStorage.setItem("newsLikes", JSON.stringify({ ...userLikes, [postId]: isLiked }));
    }
  };

  // Toggle expanded description
  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Comments
  const openCommentModal = (post) => {
    setActivePost(post);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setActivePost(null);
    setNewCommentText("");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activePost) return;

    const newComment = newCommentText.trim();
    const updatedComments = [...(activePost.comments || []), newComment];
    const updatedPost = { ...activePost, comments: updatedComments };

    const updatedPosts = posts.map((p) =>
      p.id === activePost.id ? updatedPost : p
    );
    setPosts(updatedPosts);
    setActivePost(updatedPost);
    setNewCommentText("");

    try {
      await updatePostOnServer(updatedPost);
    } catch (err) {
      const rollbackPosts = posts.map((p) =>
        p.id === activePost.id ? activePost : p
      );
      setPosts(rollbackPosts);
      setActivePost(activePost);
      alert("Failed to add comment. Please try again.");
    }
  };

  // Share
  const handleShare = (title) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        alert(`Link copied for: ${title}`);
      }).catch(() => alert(`Share: ${title}`));
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff0000]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="bg-[#FAF9F6] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-2xl mx-auto">
        {/* Enhanced Header */}
        <motion.div variants={headerVariants} className="text-center mb-12">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF0000] bg-red-50 px-4 py-1.5 rounded-full mb-3"
          >
            Breaking News
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Latest <span className="text-[#FF0000]">News</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-[#FF0000] mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* Posts List */}
        <AnimatePresence mode="wait">
          {posts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500"
            >
              No news articles found.
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              initial="hidden"
              animate="visible"
              variants={pageVariants}
              className="space-y-6"
            >
              {posts.map((post, index) => {
                const isExpanded = expandedPosts[post.id] || false;
                const fullDesc = post.description || '';
                const firstSentence = getFirstSentence(fullDesc);
                const showReadMore = fullDesc.length > firstSentence.length;

                return (
                  <motion.div
                    key={post.id}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm">
                          {post.heading?.charAt(0) || "U"}
                        </div>
                        <span className="font-bold text-gray-900 text-sm tracking-tight">
                          {post.author || "UnfilterPoint"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {formatTimeAgo(post.uploadedDate, post.uploadedTime)}
                      </span>
                    </div>

                    {/* Image – 4:5 */}
                    <div className="aspect-4/5 relative overflow-hidden bg-gray-50">
                      <img
                        src={post.image || "/placeholder-image.jpg"}
                        alt={post.heading}
                        className="w-full h-full object-cover select-none"
                        onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="p-4 flex flex-col gap-2 border-b border-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xl sm:text-2xl text-gray-800">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="hover:scale-110 transition-transform active:scale-95"
                          >
                            {userLikes[post.id] ? (
                              <FaHeart className="text-[#ff0000]" />
                            ) : (
                              <FaRegHeart className="hover:text-[#ff0000]" />
                            )}
                          </button>
                          <button
                            onClick={() => openCommentModal(post)}
                            className="hover:scale-110 transition-transform hover:text-[#ff0000]"
                          >
                            <FaRegComment />
                          </button>
                          <button
                            onClick={() => handleShare(post.heading)}
                            className="hover:scale-110 transition-transform hover:text-[#ff0000]"
                          >
                            <FaRegPaperPlane />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs font-bold text-gray-700 mt-1 px-0.5">
                        <span>{post.likes || 0} likes</span>
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() => openCommentModal(post)}
                        >
                          {(post.comments?.length || 0)} comments
                        </span>
                      </div>
                    </div>

                    {/* Content with Read More */}
                    <div className="p-5 space-y-2">
                      <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug tracking-tight">
                        {post.heading}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {isExpanded ? fullDesc : firstSentence}
                        {showReadMore && (
                          <button
                            onClick={() => toggleExpand(post.id)}
                            className="ml-2 text-[#ff0000] font-semibold hover:underline focus:outline-none"
                          >
                            {isExpanded ? "Read less" : "Read more"}
                          </button>
                        )}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-extrabold text-gray-900 text-base">Comments</h3>
              <button onClick={closeCommentModal} className="p-1 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4 min-h-62.5">
              {!activePost.comments || activePost.comments.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">No comments yet. Start the conversation!</p>
              ) : (
                activePost.comments.map((comment, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs text-gray-600 shrink-0">
                      U
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-800 max-w-[85%] wrap-break-word">
                      {comment}
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleAddComment} className="p-4 border-t border-gray-100 flex gap-2 items-center bg-white">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-shadow"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="text-[#ff0000] font-bold text-sm px-4 py-2 hover:bg-red-50 rounded-full transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Post
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default NewsPage;