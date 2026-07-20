import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date (YYYY-MM-DD → "15 July 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  // Fetch post by ID and related posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all posts
        const res = await fetch('http://localhost:3001/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();

        // Find the current post (only active blogs)
        const current = data.find(
          (p) => p.id === parseInt(id) && p.type === 'blog' && p.status === 'active'
        );
        if (!current) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }
        setPost(current);

        // Related posts: same category, exclude current, active blogs
        let related = data.filter(
          (p) =>
            p.category === current.category &&
            p.id !== current.id &&
            p.type === 'blog' &&
            p.status === 'active'
        );

        // If no related posts, take any other active blogs (fallback)
        if (related.length === 0) {
          related = data.filter(
            (p) => p.id !== current.id && p.type === 'blog' && p.status === 'active'
          ).slice(0, 3);
        }

        // Limit to 3 related posts
        setRelatedPosts(related.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen py-4 bg-[#FAF9F6] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">{error || 'Blog post not found!'}</h2>
        <button
          onClick={() => navigate('/blogs')}
          className="mt-6 px-6 py-6 bg-[#FF0000] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
        >
          Back to Blogs
        </button>
      </div>
    );
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
          {/* Main Content */}
          <div className="w-full lg:w-[68%] bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF0000] bg-red-50 px-3 py-1 rounded">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
              {post.heading}
            </h1>

            <div className="w-full h-64 sm:h-100 rounded-xl overflow-hidden mb-6 bg-gray-100">
              <img
                src={post.image || '/placeholder-image.jpg'}
                alt={post.heading}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-6 pb-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-[#FF0000]"></span>
              Updated: {formatDate(post.uploadedDate)}
            </div>

            <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line">
              {post.description || post.subHeading}
            </div>
          </div>

          {/* Sidebar – Related Posts */}
          <div className="w-full lg:w-[32%]">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-fit sticky top-20">
              <div className="mb-6">
                <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                  Related Posts
                </h2>
                <div className="h-0.5 w-full bg-[#FF0000] mt-2"></div>
              </div>

              {relatedPosts.length === 0 ? (
                <p className="text-gray-500 text-sm">No related posts found.</p>
              ) : (
                <div className="space-y-6">
                  {relatedPosts.map((item) => (
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
                          {formatDate(item.uploadedDate)}
                        </span>
                      </div>
                      <div className="h-44 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={item.image || '/placeholder-image.jpg'}
                          alt={item.heading}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug line-clamp-3 group-hover:text-[#FF0000] transition-colors duration-150">
                          {item.heading}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;