import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Blog from './pages/Blog';
import Category from './pages/Cateogory';
import CategoryPosts from './pages/CategoryPosts';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Components
import Navbar from './components/Navbar';
import NewsPage from './components/NewsPage'; // Fixed: folder lowercase 'components' aur file exact name 'NewsPage'
import Footer from './components/Footer';
import BlogDetailPage from "./components/BlogDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTopOnRouteChange />
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:slug" element={<CategoryPosts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </Router>
    </div>
  );
};

export default App;