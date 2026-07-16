import React, { useState } from 'react';
// 1. Pehle useNavigate hook ko import karein
import { useNavigate } from 'react-router-dom';

const DUMMY_BLOGS = [
  {
    id: 1,
    title: "Benzyo launches fully functional Instagram-style enterprise dashboard portal layout",
    description: "Explore the newly released layout updates that bring social-media aesthetics into high-performance enterprise systems. Built for modern fast-paced teams.",
    category: "technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    date: "15 July 2026"
  },
  {
    id: 2,
    title: "How local sports clubs are leveraging real-time analytics to boost player safety",
    description: "A deep dive into how data tracking devices and local club systems are working together to prevent major injuries and optimize on-field performance metrics.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
    date: "14 July 2026"
  },
  {
    id: 3,
    title: "Global summits set eyes on artificial intelligence regulation protocols for late 2026",
    description: "World leaders are gathering to discuss the unified framework required to regulate safety, copyright, and ethical deployment of next-generation autonomous models.",
    category: "politics",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80",
    date: "13 July 2026"
  },
  {
    id: 4,
    title: "The rise of ultra-fast localized rendering engines in next-gen web frameworks",
    description: "Traditional rendering is giving way to hybrid architectures that deliver sub-millisecond load times. Here is how it impacts enterprise application development.",
    category: "technology",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    date: "12 July 2026"
  },
  {
    id: 5,
    title: "Decentralized sports broadcasting: Empowering individual creators worldwide",
    description: "Why high-tier sports networks are moving towards micro-licensing, giving smaller content creators the rights to stream matches with local commentary.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    date: "10 July 2026"
  }
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // 2. Navigation function initialize karein
  const navigate = useNavigate();

  const filteredBlogs = activeCategory === 'all'
    ? DUMMY_BLOGS
    : DUMMY_BLOGS.filter(blog => blog.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'sports', label: 'Sports' },
    { id: 'technology', label: 'Technology' },
    { id: 'politics', label: 'Politics' }
  ];

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF0000]">Featured Posts</span>
          <h2 className="text-4xl font-extrabold text-[#111111] mt-2 tracking-tight">
            Latest Insights & Updates
          </h2>
          <div className="h-1 w-16 bg-[#FF0000] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 border shadow-sm uppercase ${activeCategory === cat.id
                ? 'bg-[#FF0000] text-white border-[#FF0000] scale-105 shadow-red-200'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF0000] hover:text-[#FF0000]'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Cards Container */}
        <div className="space-y-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
              >
                {/* Left Side: Image */}
                <div className="w-full md:w-[35%] h-64 md:h-auto relative overflow-hidden shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
                    {blog.category}
                  </span>
                </div>

                {/* Right Side: Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#FF0000] transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <span className="text-xs md:text-sm text-gray-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
                      {blog.date}
                    </span>

                    {/* 3. Button par onClick listener attach kar diya jo sahi route par le jaye ga */}
                    <button
                      onClick={() => navigate(`/blog/${blog.id}`)}
                      className="flex items-center gap-1 text-[#FF0000] font-bold text-sm tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200 hover:underline"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No articles found for this category.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;