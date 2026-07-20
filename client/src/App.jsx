import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Blog from './pages/Blog';
import Cateogory from './pages/Cateogory'; // ✅ fixed typo
import CategoryPosts from './pages/CategoryPosts';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Components
import Navbar from './components/Navbar';
import NewsPage from './components/NewsPage';
import Footer from './components/Footer';
import BlogDetailPage from "./components/BlogDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/category" element={<Cateogory />} />
          <Route path="/category/:slug" element={<CategoryPosts />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Protected admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* ✅ Login route with leading slash */}
          <Route path="/login" element={<Login />} />
      
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </Router>
  );
};

export default App;