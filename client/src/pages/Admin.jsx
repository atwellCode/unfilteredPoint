// src/pages/Admin.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiEye,
  HiEyeOff,
  HiThumbUp,
  HiChatAlt,
  HiX,
  HiDownload,
  HiUpload,
  HiSearch,
} from "react-icons/hi";
import { FaImage } from "react-icons/fa";

// ---------- API endpoint ----------
const API_URL = "http://localhost:3001/posts";

// ---------- Default empty post ----------
const emptyPost = {
  id: 0,
  type: "news",
  heading: "",
  subHeading: "",
  description: "",
  image: "",
  category: "politics",
  isTrending: false,
  isLocal: false,
  likes: 0,
  comments: 0,
  uploadedDate: "",
  uploadedTime: "",
  day: "",
  status: "active",
};

// ---------- Category list ----------
const categories = [
  "politics",
  "sport",
  "entertainment",
  "technology",
  "education",
  "artificial intelligence",
  "health",
  "disasters",
  "breaking news",
  "local",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Admin = () => {
  // ---------- State ----------
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...emptyPost });
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Added

  const fileInputRef = useRef(null);

  // ---------- Load posts from API ----------
  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
      // Fallback to localStorage if API fails
      const stored = localStorage.getItem("unfilterpoint_posts");
      if (stored) setPosts(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // ---------- Save post (create or update) ----------
  const savePost = async (post) => {
    try {
      if (post.id === 0) {
        // CREATE: remove id and POST
        const { id, ...newPost } = post;
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
      } else {
        // UPDATE: PUT
        const res = await fetch(`${API_URL}/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save post. Check console for details.");
      throw error; // rethrow so handleSubmit knows
    }
  };

  // ---------- Delete post ----------
  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // ---------- Toggle active/inactive ----------
  const toggleStatus = async (id) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    const updated = {
      ...post,
      status: post.status === "active" ? "inactive" : "active",
    };
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const result = await res.json();
    setPosts((prev) => prev.map((p) => (p.id === result.id ? result : p)));
  };

  // ---------- Edit post (populate form) ----------
  const editPost = (post) => {
    setFormData({ ...post });
    setImagePreview(post.image || "");
    setEditingId(post.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Reset form ----------
  const resetForm = () => {
    setFormData({ ...emptyPost });
    setImagePreview("");
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------- Form handlers ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------- Submit handler (with loading state) ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered!"); // Debug

    if (!formData.heading || !formData.description || !formData.category) {
      alert("Please fill in heading, description, and category.");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const uploadedDate = formData.uploadedDate || now.toISOString().split("T")[0];
      const uploadedTime =
        formData.uploadedTime ||
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const day = formData.day || daysOfWeek[now.getDay()];

      const postToSave = {
        ...formData,
        uploadedDate,
        uploadedTime,
        day,
        id: editingId || 0, // 0 means new
      };
      await savePost(postToSave);
      resetForm();
    } catch (error) {
      // Error already handled in savePost
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------- Export JSON (backup) ----------
  const exportData = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "database.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Import JSON (manual backup) ----------
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          localStorage.setItem("unfilterpoint_posts", JSON.stringify(data));
          setPosts(data);
          alert("Data imported to localStorage. To persist to database.json, please replace the file manually.");
        } else {
          alert("Invalid JSON – expected an array.");
        }
      } catch (err) {
        alert("Error parsing JSON: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset input
  };

  // ---------- Filter & search ----------
  const filteredPosts = posts
    .filter((p) => {
      if (filterType !== "all" && p.type !== filterType) return false;
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      return true;
    })
    .filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        p.heading.toLowerCase().includes(term) ||
        p.subHeading?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    });

  // ---------- Stats ----------
  const totalPosts = posts.length;
  const activePosts = posts.filter((p) => p.status === "active").length;
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff0000]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Manage your news and blog posts</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#ff0000] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <HiPlus className="text-lg" /> Add New Post
            </button>
            <button
              onClick={exportData}
              className="bg-white border border-gray-300 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-50"
            >
              <HiDownload /> Export JSON
            </button>
            <label className="bg-white border border-gray-300 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
              <HiUpload /> Import JSON
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-black">{totalPosts}</p>
            <p className="text-gray-500 text-sm">Total Posts</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-green-600">{activePosts}</p>
            <p className="text-gray-500 text-sm">Active</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-red-500">{totalLikes}</p>
            <p className="text-gray-500 text-sm">Total Likes</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-blue-500">{totalComments}</p>
            <p className="text-gray-500 text-sm">Total Comments</p>
          </div>
        </div>

        {/* ---------- Add/Edit Form ---------- */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border-l-4 border-[#ff0000]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {editingId ? "Edit Post" : "Create New Post"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-[#ff0000] transition-colors"
                >
                  <HiX className="text-2xl" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    >
                      <option value="news">News</option>
                      <option value="blog">Blog</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heading *
                    </label>
                    <input
                      type="text"
                      name="heading"
                      value={formData.heading}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      placeholder="Enter heading"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sub Heading
                    </label>
                    <input
                      type="text"
                      name="subHeading"
                      value={formData.subHeading}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      placeholder="Enter sub heading"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      placeholder="Write full content..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                      >
                        <FaImage /> Choose Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-24 w-auto rounded-lg border border-gray-200 object-cover"
                        />
                      </div>
                    )}
                    {!imagePreview && formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Existing"
                          className="h-24 w-auto rounded-lg border border-gray-200 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Uploaded Date
                      </label>
                      <input
                        type="date"
                        name="uploadedDate"
                        value={formData.uploadedDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Uploaded Time
                      </label>
                      <input
                        type="time"
                        name="uploadedTime"
                        value={formData.uploadedTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day
                    </label>
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    >
                      <option value="">Auto</option>
                      {daysOfWeek.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="isTrending"
                        checked={formData.isTrending}
                        onChange={handleChange}
                      />
                      Trending News
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="isLocal"
                        checked={formData.isLocal}
                        onChange={handleChange}
                      />
                      Local News
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Likes
                      </label>
                      <input
                        type="number"
                        name="likes"
                        value={formData.likes || 0}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comments
                      </label>
                      <input
                        type="number"
                        name="comments"
                        value={formData.comments || 0}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-[#ff0000] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : editingId ? (
                      "Update Post"
                    ) : (
                      "Publish Post"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- Filters ---------- */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1 shadow-sm flex-1 min-w-[200px]">
            <HiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 outline-none bg-transparent text-sm"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#ff0000]"
          >
            <option value="all">All Types</option>
            <option value="news">News</option>
            <option value="blog">Blog</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#ff0000]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* ---------- Posts Table ---------- */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No posts found.</p>
              <p className="text-gray-400 text-sm">
                Add your first post by clicking "Add New Post".
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Heading</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Likes</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Comments</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500">{post.id}</td>
                      <td className="px-4 py-3 font-medium text-black max-w-[200px] truncate">
                        {post.heading}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                            post.type === "news"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {post.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{post.category}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          <HiThumbUp className="text-red-500" /> {post.likes || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          <HiChatAlt className="text-blue-500" /> {post.comments || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            post.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => editPost(post)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <HiPencil className="text-lg" />
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <HiTrash className="text-lg" />
                          </button>
                          <button
                            onClick={() => toggleStatus(post.id)}
                            className={`p-1 rounded ${
                              post.status === "active"
                                ? "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                                : "text-green-600 hover:text-green-800 hover:bg-green-50"
                            }`}
                            title={
                              post.status === "active" ? "Set Inactive" : "Set Active"
                            }
                          >
                            {post.status === "active" ? (
                              <HiEyeOff className="text-lg" />
                            ) : (
                              <HiEye className="text-lg" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-400 text-center">
          Total {filteredPosts.length} posts (of {posts.length} total)
        </div>
      </div>
    </div>
  );
};

export default Admin;