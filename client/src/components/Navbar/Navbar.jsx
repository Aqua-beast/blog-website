import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import './Navbar.css';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios'
import ProfileComponent from '../ProfileComponent/ProfileComponent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Navbar(props) {
  const [navsym, SetNavSym] = useState(true);
  const styles = useSpring({
    loop: true,
    from: { rotateY: 0 },
    to: { rotateY: 360 },
    duration: 2000,
  });
  const [size, setSize] = useState(0);

  const chechSize = () => {
    if (window.innerWidth >= 970) {
      setSize(25)
    } else {
      setSize(15);
    }
  }

  useEffect(() => {
    chechSize();
    window.addEventListener('resize', chechSize);
    return () => {
      window.removeEventListener('resize', chechSize);
    }
  })

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const details = () => {
    setIsProfileOpen(!isProfileOpen);
  }
  const email = localStorage.getItem('email');

  useEffect(() => {
    axios.get(`https://blog-website-cyan.vercel.app/profile/${email}`,
      {
        headers: {
          "x-access-token": localStorage.getItem('token')
        }
      })
      .then((res) => {
        localStorage.setItem('userdata', JSON.stringify(res.data.details));
        console.log(JSON.parse(localStorage.getItem('userdata')));
      })
      .catch((err) => {
        console.error(err);
      })
  }, [email])

    const [articles, setArticles] = useState([]); // Initialize articles as an empty array

useEffect(() => {
  // Fetch articles from local storage
  const storedArticles = JSON.parse(localStorage.getItem('articleNames'));
  console.log(storedArticles);

  // Check if articles are available and update the state
  if (storedArticles && Array.isArray(storedArticles)) {
    setArticles(storedArticles);
  }
}, []);

  return (
    <nav className='nav-common'>
      <div className='logo'>
        <img src="/logo.png" alt="logo for website" />
        {/* <input
          placeholder='Search' type="text" /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={articles}
          sx={{
            width: 200,
            backgroundColor: '#ffffff',
            marginRight: '1rem'
          }}
          renderInput={(params) => <TextField {...params} label="Articles" />}
        />
        <BsSearch size={size} className='search-icon' />
      </div>
      <h1 className='brand-name'>
        <animated.div style={{ color: 'white', fontSize: '3.5rem', ...styles }} >T</animated.div>
        alkies</h1>
      <div className='just-a-box'>
        <span className={(navsym === false) ? 'cross-menu' : 'hamburger-menu'} onMouseEnter={() => { SetNavSym(!navsym) }}></span>
        <ul className={` ${navsym ? 'hide' : ''} right-menu`}>
          {console.log(navsym)}
          <li className='right-menu-items'><a className='right-menu-items-links' href="/home">Home</a></li>
          <li className='right-menu-items'><a className='right-menu-items-links' href="/about">About</a></li>
          <li className='right-menu-items'><a className='right-menu-items-links' href="/contact">Contact</a></li>
          <li className='right-menu-items'><button onClick={details} style={{ backgroundColor: '#212529', borderWidth: '0px' }} className='right-menu-items-links'><img src="/user.png" alt="profile picture" /></button></li>
          <li><ProfileComponent isOpen={isProfileOpen} onClose={details} /></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
