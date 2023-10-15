import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className='text-1-box'>
        <h1 className='heading-about-h1'>About Us</h1>
        <p>
          Welcome to our blog writing website! We are passionate about sharing
          knowledge and experiences through the art of writing.
        </p>
        <p>
          Our mission is to provide a platform for writers, bloggers, and content
          creators to express their ideas and connect with a global audience.
        </p>
        <p>
          Whether you're an aspiring writer or an avid reader, we hope you find
          inspiration and valuable content on our platform.
        </p>
      </div>
      <h2 className='heading-about-h2'>Our Vision</h2>
      <p>
        We envision a world where every voice is heard, where diverse
        perspectives are celebrated, and where knowledge is freely shared.
      </p>
      <h2 className='heading-about-h2'>Our Team</h2>
      <p>
        Our team consists of passionate writers, editors, and developers who
        work together to make this platform a welcoming space for creators and
        readers alike.
      </p>
      <p>
        Meet our talented authors who bring you thought-provoking content on a
        wide range of topics.
      </p>
      <h2 className='heading-about-h2'>Contact Us</h2>
      <p>
        We'd love to hear from you! If you have any questions, feedback, or
        inquiries, please don't hesitate to contact us at
        <a href="mailto:sadharyan3@gmail.com"> sadharyan3@gmail.com</a>.
      </p>
    </div>
  );
};

export default About;

