import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DUMMY_BLOGS = [
    {
        id: 1,
        title: "Benzyo launches fully functional Instagram-style enterprise dashboard portal layout",
        description: "Explore the newly released layout updates that bring social-media aesthetics into high-performance enterprise systems. Built for modern fast-paced teams.",
        category: "technology",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
        date: "15 July 2026",
        content: "Explore the newly released layout updates that bring social-media aesthetics into high-performance enterprise systems. Built for modern fast-paced teams.\n\nTraditional interfaces are changing rapidly. By introducing a feed-like experience to system statistics, operators can instantly monitor background activities with infinite scroll mechanisms, real-time widget filters, and immersive dark modes tailored for high-intensity work environments."
    },
    {
        id: 2,
        title: "How local sports clubs are leveraging real-time analytics to boost player safety",
        description: "A deep dive into how data tracking devices and local club systems are working together to prevent major injuries and optimize on-field performance metrics.",
        category: "sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
        date: "14 July 2026",
        content: "Local sports clubs are rapidly adopting telemetry devices to secure player health parameters in real-time. This system tracks heart rate fluctuations, heat exhaustion metrics, and collision impacts dynamically.\n\nWith customized dashboards, coaches and medical personnel can immediately pull a player off the field before a minor strain escalates into a serious, season-ending injury."
    },
    {
        id: 3,
        title: "Global summits set eyes on artificial intelligence regulation protocols for late 2026",
        description: "World leaders are gathering to discuss the unified framework required to regulate safety, copyright, and ethical deployment of next-generation autonomous models.",
        category: "politics",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80",
        date: "13 July 2026",
        content: "International regulatory bodies are establishing strict compliance milestones for artificial intelligence systems. Key topics include generative safety layers, intellectual property ownership rights, and autonomous execution frameworks.\n\nThis summit marks a historic shift towards global accountability, ensuring model developers strictly adhere to decentralized transparency standards."
    },
    {
        id: 4,
        title: "The rise of ultra-fast localized rendering engines in next-gen web frameworks",
        description: "Traditional rendering is giving way to hybrid architectures that deliver sub-millisecond load times. Here is how it impacts enterprise application development.",
        category: "technology",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        date: "12 July 2026",
        content: "Hybrid localized rendering engines are reshaping web performance benchmarks globally. By evaluating and caching component trees directly on edge nodes, users experience instant visual paint updates.\n\nThis completely eliminates bulky client-side JavaScript execution pipelines, reducing loading thresholds drastically and securing peak conversions for high-traffic platforms."
    },
    {
        id: 5,
        title: "Decentralized sports broadcasting: Empowering individual creators worldwide",
        description: "Why high-tier sports networks are moving towards micro-licensing, giving smaller content creators the rights to stream matches with local commentary.",
        category: "sports",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
        date: "10 July 2026",
        content: "The sports broadcast licensing landscape is fracturing—in a highly beneficial way for creators. Newer distribution models bypass central television distribution contracts, enabling localized micro-broadcasting rights.\n\nIndie commentators can now broadcast major league games directly to their niche communities, bringing unprecedented flavor and personality to standard athletic reporting."
    }
];

const BlogDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const currentId = parseInt(id);
    const activeBlog = DUMMY_BLOGS.find(b => b.id === currentId);

    // Page reset on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!activeBlog) {
        return (
            <div className="text-center py-20 bg-[#FAF9F6] min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800">Blog post not found!</h2>
                <button
                    onClick={() => navigate('/blogs')}
                    className="mt-4 px-6 py-2 bg-[#FF0000] text-white rounded-full font-bold uppercase tracking-wider text-sm"
                >
                    Back to Blogs
                </button>
            </div>
        );
    }

    // 🔥 1. Filter related blogs (Same Category but excluding the current open blog)
    let relatedBlogs = DUMMY_BLOGS.filter(
        blog => blog.category === activeBlog.category && blog.id !== currentId
    );

    // 🔥 2. Backup Fallback: Agar same category mein aur posts na hon (like politics),
    // toh baqi kisi bhi category ke blogs show kar do taake sidebar khali na rahe.
    if (relatedBlogs.length === 0) {
        relatedBlogs = DUMMY_BLOGS.filter(blog => blog.id !== currentId).slice(0, 2);
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/blogs')}
                    className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#FF0000] transition-colors"
                >
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                    Back to Blogs
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Main Content */}
                    <div className="w-full lg:w-[68%] bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF0000] bg-red-50 px-3 py-1 rounded">
                            {activeBlog.category}
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
                            {activeBlog.title}
                        </h1>

                        <div className="w-full h-64 sm:h-[400px] rounded-xl overflow-hidden mb-6 bg-gray-100">
                            <img
                                src={activeBlog.image}
                                alt={activeBlog.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-6 pb-4 border-b border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-[#FF0000]"></span>
                            Updated: {activeBlog.date}
                        </div>

                        <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line">
                            {activeBlog.content || activeBlog.description}
                        </div>
                    </div>

                    {/* Right Side: Sidebar (DYNAMICS BASED ON CATEGORY) */}
                    <div className="w-full lg:w-[32%] bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-fit">
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                                Related Posts
                            </h2>
                            <div className="h-[2px] w-full bg-[#FF0000] mt-2"></div>
                        </div>

                        <div className="space-y-6">
                            {relatedBlogs.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/blog/${item.id}`)}
                                    className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="p-4 bg-white border-b border-gray-50 flex justify-between items-center">
                                        <span className="text-xs font-bold text-[#FF0000] tracking-wider uppercase">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium">
                                            {item.date}
                                        </span>
                                    </div>
                                    <div className="h-44 w-full bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 bg-white">
                                        <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug line-clamp-3 group-hover:text-[#FF0000] transition-colors duration-150">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogDetailPage;