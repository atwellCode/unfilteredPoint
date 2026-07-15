import React from 'react'
import Homepage from "./pages/Homepage"
import Blog from './pages/Blog'
import Cateogory from './pages/Cateogory'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const App = () => {
  return (
   <div>
    <Homepage/>
    <Blog/>
    <Cateogory/>
    <Contact/>
    <Admin/>
   </div>
  )
}

export default App
