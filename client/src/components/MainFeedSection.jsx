import React, { useState } from 'react';

const MainFeedSection = () => {
    // Left feed posts state with initial likes and pre-filled comments
    const [feedPosts, setFeedPosts] = useState([
        {
            id: 1,
            tag: "Benzyo Tech",
            title: "Benzyo Launches New Next-Gen Enterprise Software for Global Markets",
            description: "Benzyo has officially unveiled its latest enterprise solutions dashboard today. The platform aims to reduce data processing times by 40% using advanced internal automation pipelines. Corporate clients from 15 countries have already signed up for the beta testing phase which starts next week.",
            time: "2 hours ago",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
            likesCount: 5,
            comments: ["Great innovation!", "Can't wait to test the beta version."]
        },
        {
            id: 2,
            tag: "Benzyo Growth",
            title: "Benzyo Expands Operations with 3 New Tech Hubs Across the Region",
            description: "Following a successful funding round, Benzyo is expanding its physical footprint. The new offices will house over 500 new developers and product managers. According to the board of directors, this expansion will focus heavily on scaling decentralized network tools for modern businesses.",
            time: "5 hours ago",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1080&auto=format&fit=crop&q=80",
            likesCount: 12,
            comments: ["Phenomenal growth!", "Is Pakistan listed in the new hubs?"]
        },
        {
            id: 3,
            tag: "Benzyo Design",
            title: "How Benzyo's New Instagram-Inspired Layout Boosted User Retention by 60%",
            description: "In a recent case study, Benzyo's product design team revealed that shifting from traditional corporate news designs to interactive, media-centric feeds drastically improved daily active usage. Users spent an average of 18 minutes longer engaging with corporate announcements.",
            time: "1 day ago",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
            likesCount: 24,
            comments: ["Clean layout always wins.", "User experience is top notch here."]
        },
    ]);

    const [userLikes, setUserLikes] = useState({}); // Tracks if the current user liked a post
    const [activeNews, setActiveNews] = useState(null);

    // Instagram Comment Modal State
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activePostForComment, setActivePostForComment] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");

    const pickForYouPosts = [
        {
            id: 1,
            heading: "Market Analysis",
            news: "Benzyo stock reaches record high after breakthrough quarterly financial performance reports.",
            image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=60",
            time: "Yesterday",
        },
        {
            id: 2,
            heading: "Exclusive Interview",
            news: "Benzyo CEO shares insights on why clean, modern interfaces are the future of corporate software.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60",
            time: "18 hours ago",
        },
        {
            id: 3,
            heading: "Future Strategy",
            news: "Benzyo announces plan to integrate AI-driven analytics widgets inside user feeds by next quarter.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
            time: "2 days ago",
        }
    ];

    // Responsive Action Toggle for Likes
    const toggleLike = (postId) => {
        const hasLiked = userLikes[postId];

        // Toggle user's specific state
        setUserLikes(prev => ({ ...prev, [postId]: !hasLiked }));

        // Increment/Decrement overall database/state counter
        setFeedPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likesCount: hasLiked ? post.likesCount - 1 : post.likesCount + 1
                    };
                }
                return post;
            })
        );
    };

    // Open Comment Modal Panel
    const openCommentModal = (post) => {
        setActivePostForComment(post);
        setIsCommentModalOpen(true);
    };

    // Close Comment Modal Panel
    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
        setActivePostForComment(null);
        setNewCommentText("");
    };

    // Form submission inside comment box
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        setFeedPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === activePostForComment.id) {
                    const updatedComments = [...post.comments, newCommentText];
                    // instantly sync local copy visual inside active modal viewport
                    setActivePostForComment({ ...post, comments: updatedComments });
                    return { ...post, comments: updatedComments };
                }
                return post;
            })
        );
        setNewCommentText("");
    };

    // Web API Sharing trigger
    const handleShare = (title) => {
        if (navigator.share) {
            navigator.share({ title: title, url: window.location.href })
                .catch(console.error);
        } else {
            alert(`Copied link for post: "${title}"`);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Feed Posts */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {feedPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white text-xs font-bold">B</div>
                                <span className="font-bold text-sm text-gray-800">{post.tag}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{post.time}</span>
                        </div>

                        {/* Visual Image Layout */}
                        <div className="w-full relative bg-gray-100 aspect-[1080/1350] overflow-hidden">
                            <img src={post.image} alt="Benzyo News Visual" className="w-full h-full object-cover" />
                        </div>

                        {/* Interactive Buttons Bar */}
                        <div className="p-4 flex flex-col gap-2 border-t border-b border-gray-100 bg-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    {/* Like Button */}
                                    <button onClick={() => toggleLike(post.id)} className={`transition-transform duration-100 focus:outline-none active:scale-95 ${userLikes[post.id] ? 'text-red-500 scale-110' : 'text-gray-700 hover:text-red-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={userLikes[post.id] ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </button>

                                    {/* Comment Trigger Modal icon */}
                                    <button onClick={() => openCommentModal(post)} className="text-gray-700 hover:text-red-500 transition-colors focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48L4.25 21.25l3.811-1c1.138.38 2.363.57 3.614.57Z" />
                                        </svg>
                                    </button>

                                    {/* Share Trigger button */}
                                    <button onClick={() => handleShare(post.title)} className="text-gray-700 hover:text-red-500 transition-colors focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <button onClick={() => setActiveNews(activeNews === post.id ? null : post.id)} className="text-xs font-bold text-[#FF0000] bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors uppercase tracking-wider">
                                    {activeNews === post.id ? "Hide News ↑" : "Read More →"}
                                </button>
                            </div>

                            {/* Sub counts */}
                            <div className="flex gap-4 text-xs font-extrabold text-gray-700 mt-1 px-0.5">
                                <span>{post.likesCount} likes</span>
                                <span className="cursor-pointer hover:underline" onClick={() => openCommentModal(post)}>
                                    {post.comments.length} comments
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-white">
                            <h3 className="text-lg font-bold leading-snug text-gray-900 mb-2">{post.title}</h3>
                            <p className={`text-sm text-gray-600 leading-relaxed ${activeNews === post.id ? '' : 'line-clamp-2'}`}>{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Sidebar Pick For You */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-6 h-fit">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h2 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-[#FF0000] pb-2 mb-5">Pick For You</h2>
                    <div className="flex flex-col gap-6">
                        {pickForYouPosts.map((item) => (
                            <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col bg-gray-50">
                                <div className="bg-white px-3 py-2 border-b border-gray-100">
                                    <span className="text-xs font-black text-[#FF0000] uppercase tracking-wider">{item.heading}</span>
                                </div>
                                <div className="h-36 w-full overflow-hidden bg-gray-200">
                                    <img src={item.image} alt="Trending" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3 bg-white flex flex-col justify-between flex-1">
                                    <p className="text-xs font-semibold text-gray-800 leading-relaxed">{item.news}</p>
                                    <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wide">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* DYNAMIC INSTAGRAM-STYLE COMMENT MODAL */}
            {isCommentModalOpen && activePostForComment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">

                        {/* Header of Popup */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-extrabold text-gray-900 text-base">Comments</h3>
                            <button onClick={closeCommentModal} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* List of comments */}
                        <div className="p-4 flex-1 overflow-y-auto space-y-4 min-h-[250px]">
                            {activePostForComment.comments.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-8">Be the first to leave a comment!</p>
                            ) : (
                                activePostForComment.comments.map((comment, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                        <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center font-bold text-xs text-[#FF0000] flex-shrink-0">
                                            #
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-800 max-w-[85%] break-words">
                                            {comment}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Box Footer */}
                        <form onSubmit={handleAddComment} className="p-4 border-t border-gray-100 flex gap-2 items-center bg-white">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newCommentText.trim()}
                                className="text-[#FF0000] font-bold text-sm px-4 py-2 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                Post
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </main>
    );
};

export default MainFeedSection;