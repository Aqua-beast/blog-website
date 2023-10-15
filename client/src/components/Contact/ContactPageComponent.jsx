import React, { useRef } from 'react';
import './ContactPage.css';
import emailjs from '@emailjs/browser';
import { SiMinutemailer } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactPageComponent() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Gmail
    emailjs.sendForm('service_o67u019', 'template_tqbjlf5', form.current, '11acOV7up16rSVqXv')
      .then((result) => {
        console.log(result.text);
        toast("email sent")
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
    <div className='contact-container'>
      {/* Heading Section */}
      <h1 className='heading-contact-h1'>About Us</h1>
      <div className='contact-edit-container'>
        <form ref={form} onSubmit={sendEmail} className='contact-me-form'>
          <div className='contact-me-form-item'>
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" name="user_name" placeholder="Enter your full name" />
          </div>
          <div className='contact-me-form-item'>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="user_email" placeholder="Enter your email address" />
          </div>
          <div className='contact-me-form-item'>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Enter your message"></textarea>
          </div>
          < button className='contact-submit-button' type='submit' >
            <SiMinutemailer /> Send Message
          </button >
        </form>
      </div >
      {/* Submit Button */}

      <div>
        <ToastContainer />
      </div>
    </div >
  );
}

export default ContactPageComponent;
