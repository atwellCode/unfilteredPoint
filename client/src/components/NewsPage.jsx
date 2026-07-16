import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane } from "react-icons/fa";
import { HiX } from "react-icons/hi";

// Dummy Data with initial likes and comments count
const INITIAL_NEWS = [
    {
        id: 1,
        author: "Benzyo Tech",
        timeAgo: "2 hours ago",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1080&h=1080&q=80",
        title: "Benzyo Launches New Next-Gen Enterprise Software for Global Markets",
        description: "Benzyo has officially unveiled its latest enterprise solutions dashboard today. The platform aims to reduce data processing times by 40% using advanced internal automation pipelines.",
        likesCount: 12,
        comments: ["Wow, looks amazing!", "Great update by the team!"]
    },
    {
        id: 2,
        author: "Benzyo Growth",
        timeAgo: "5 hours ago",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1080&h=1080&q=80",
        title: "Local Sports Infrastructure Receives $45M Technological Upgrade Grant",
        description: "State officials announced an extensive grant framework dedicated to integrating real-time telemetry systems into domestic tracking clubs.",
        likesCount: 45,
        comments: ["Big win for sports analytics.", "Need this in our local club too."]
    },
    {
        id: 3,
        author: "Global Policy",
        timeAgo: "1 day ago",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1080&h=1080&q=80",
        title: "AI Safety Summit Reaches Historic Regulatory Accord in Kyoto",
        description: "Delegates from over forty nations ratified a comprehensive alignment strategy targeting early containment protocols for ultra-large scalable localized neural frameworks.",
        likesCount: 89,
        comments: ["Crucial step for safety.", "Kyoto is beautiful this time of year."]
    }
];

const NewsPage = () => {
    const [posts, setPosts] = useState(INITIAL_NEWS);
    const [userLikes, setUserLikes] = useState({}); // Tracking which posts user liked

    // Modal States
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activePostForComment, setActivePostForComment] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");

    // Handle Like Logic (+1 / -1)
    const handleLike = (postId) => {
        const isAlreadyLiked = userLikes[postId];

        // Update user state tracking
        setUserLikes(prev => ({ ...prev, [postId]: !isAlreadyLiked }));

        // Update posts state count array dynamically
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likesCount: isAlreadyLiked ? post.likesCount - 1 : post.likesCount + 1
                    };
                }
                return post;
            })
        );
    };

    // Open Comment Modal
    const openCommentModal = (post) => {
        setActivePostForComment(post);
        setIsCommentModalOpen(true);
    };

    // Close Comment Modal
    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
        setActivePostForComment(null);
        setNewCommentText("");
    };

    // Add Comment Logic
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === activePostForComment.id) {
                    const updatedComments = [...post.comments, newCommentText];
                    // instantly update active post visual copy inside modal
                    setActivePostForComment({ ...post, comments: updatedComments });
                    return { ...post, comments: updatedComments };
                }
                return post;
            })
        );
        setNewCommentText("");
    };

    // Share alert feature
    const handleShare = (title) => {
        if (navigator.share) {
            navigator.share({ title: title, url: window.location.href });
        } else {
            alert(`Link Copied for: ${title}`);
        }
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl mx-auto space-y-6">

                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">

                        {/* Card Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="font-bold text-gray-900 text-sm tracking-tight">{post.author}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{post.timeAgo}</span>
                        </div>

                        {/* Card Image */}
                        <div className="w-full aspect-square bg-gray-50 overflow-hidden relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover select-none"
                            />
                        </div>

                        {/* Action Bar (Likes, Comments & Share Area) */}
                        <div className="p-4 flex flex-col gap-2 border-b border-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xl sm:text-2xl text-gray-800">
                                    {/* Like Button */}
                                    <button onClick={() => handleLike(post.id)} className="hover:scale-110 transition-transform active:scale-95">
                                        {userLikes[post.id] ? <FaHeart className="text-[#ff0000]" /> : <FaRegHeart className="hover:text-[#ff0000]" />}
                                    </button>

                                    {/* Comment Trigger */}
                                    <button onClick={() => openCommentModal(post)} className="hover:scale-110 transition-transform hover:text-[#ff0000]">
                                        <FaRegComment />
                                    </button>

                                    {/* Share Button */}
                                    <button onClick={() => handleShare(post.title)} className="hover:scale-110 transition-transform hover:text-[#ff0000]">
                                        <FaRegPaperPlane />
                                    </button>
                                </div>
                            </div>

                            {/* Counter Subtext */}
                            <div className="flex gap-4 text-xs font-bold text-gray-700 mt-1 px-0.5">
                                <span>{post.likesCount} likes</span>
                                <span className="cursor-pointer hover:underline" onClick={() => openCommentModal(post)}>
                                    {post.comments.length} comments
                                </span>
                            </div>
                        </div>

                        {/* Description Content */}
                        <div className="p-5 space-y-2">
                            <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug tracking-tight">
                                {post.title}
                            </h3>
                            {/* line-clamp-2 removed completely so text doesn't hide */}
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {post.description}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

            {/* INSTAGRAM-STYLE COMMENT POPUP MODAL */}
            {isCommentModalOpen && activePostForComment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform transition-all">

                        {/* Modal Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-extrabold text-gray-900 text-base">Comments</h3>
                            <button onClick={closeCommentModal} className="p-1 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                                <HiX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Comments Content Stream Area */}
                        <div className="p-4 flex-1 overflow-y-auto space-y-4 min-h-[250px]">
                            {activePostForComment.comments.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-8">No comments yet. Start the conversation!</p>
                            ) : (
                                activePostForComment.comments.map((comment, index) => (
                                    <div key={index} className="flex gap-3 items-start animate-slideIn">
                                        <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs text-gray-600 flex-shrink-0">
                                            #
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-800 max-w-[85%] break-words">
                                            {comment}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Comment Input Box Field */}
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

                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsPage;