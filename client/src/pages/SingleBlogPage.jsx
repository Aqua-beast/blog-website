import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import SingleBlogDisplay from '../components/SingleBlogDisplay/SingleBlogDisplay'
import Footer from '../components/Footer/Footer'

function SingleBlogPage() {
  return (
    <>
      <Navbar display='true' />
      {/* <context.Provider> */}
        <SingleBlogDisplay />
      {/* </context.Provider> */}
      <Footer />
    </>
  )
}

export default SingleBlogPage
