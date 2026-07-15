import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Homepage from "./pages/Homepage"
import Blog from './pages/Blog'
import Category from './pages/Cateogory'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
   <div>
  <Router>
      <Navbar />
      <main className="min-h-screen"> {/* optional wrapper */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/category" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
   </div>
  )
}

export default App
