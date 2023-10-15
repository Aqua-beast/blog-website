import React from 'react';
import './Footer.css';
import {AiOutlineMail, AiOutlineTwitter, AiOutlineInstagram} from 'react-icons/ai';

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Talkies</p>
      <p><AiOutlineInstagram /></p>
      <p><AiOutlineMail /></p>
      <p><AiOutlineTwitter /></p>
    </footer>
  );
}

export default Footer;
