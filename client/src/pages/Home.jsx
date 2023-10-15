import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import AllBlogs from '../components/AllBlogs/AllBlogs'

function Home() {
  return (
    <div>
      <Navbar />
      <AllBlogs />
      <Footer />
    </div>
  )
}

export default Home
