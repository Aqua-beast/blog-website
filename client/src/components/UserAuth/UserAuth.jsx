import React from 'react'
import { useState } from 'react'
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserAuth.css'
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAuth = () => {
  const style1 = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    duration: 2000,
    delay: 1000,
  });

  const style2 = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    duration: 2000,
    delay: 2000
  })

  const style3 = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    duration: 2000,
    delay: 4000
  })
  const style4 = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    duration: 2000,
    delay: 6000
  })

  const [page404, setPage404] = useState(false);
  const [UserAuth, SetUserAuth] = useState('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmedPassword: '',
  });

  const formhandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...formData,
      [name]: value,
    })
  }

  const formAction = async (e) => {
    e.preventDefault();
  }

  const Navigate = useNavigate();

  const SubmitAction = async () => {
    try {
      if (UserAuth === 'login') {
        setIsLoading(true);
        localStorage.setItem('email', formData.email)
        console.log(formData.email);
      }
      const response = await axios.post(`https://blog-website-nu-flame.vercel.app/auth/${UserAuth}`, formData, {
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (UserAuth === 'signup') {
        console.log('signup');
        // alert(response.data.message);
        toast(response.data.message);
        setTimeout(() => { SetUserAuth('login') }, 6000);
      }
      if (UserAuth === 'login') {
        if (!page404) {
          localStorage.setItem('token', response.data.token);
          console.log('login');
          console.log(localStorage.getItem('token'));
          setTimeout(() => {
            Navigate('/home')
          }, 4500);
        }
      }
    } catch (error) {
      if (UserAuth === 'login') {
        alert(error.response.data.message)
        setPage404(true);
      }
      console.error('Error:', error.response.data);
    }
  }

  return (
    <>
      {!isLoading &&
        <div className='UserAuth-container'>
          {(UserAuth === 'signup') ?
            <form className='UserAuth-container-form' onSubmit={formAction}>
              <div className='ucfd'>
                <h1 className='ucfdh'>Create Account</h1>
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Name</label>
                <input className='form-item-input' onChange={formhandler} required placeholder='Name' name='username' type="text" />
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Email</label>
                <input className='form-item-input' onChange={formhandler} required placeholder='Email' name='email' type="email" />
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Password</label>
                <input className='form-item-input' onChange={formhandler} required placeholder='Password' name='password' type="password" />
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Confirm Password</label>
                <input className='form-item-input' onChange={formhandler} required placeholder='Password' name='confirmedPassword' type="password" />
              </div>
              <div>
                <button onClick={SubmitAction} className='form-button'>Create Account</button>
                <div>
                  <ToastContainer />
                </div>
              </div>
              <div className='form-lines'>
                <span className='line1'>Or</span>
                <span className='line2'>Already Have An Account ?</span>
                <a className='link' onClick={(e) => {
                  e.preventDefault();
                  SetUserAuth('login');
                }} href=''>Log In</a>
              </div>
            </form>
            :
            <form className='UserAuth-container-form' onSubmit={formAction}>
              <div className='ucfd'>
                <h1 className='ucfdh'>Log In</h1>
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Email</label>
                <input className='form-item-input' onChange={formhandler} required placeholder='Email' name='email' value={formData.email} type="email" />
              </div>
              <div className='form-item-container'>
                <label className='form-item' htmlFor="">Password</label>
                <input className='form-item-input' onChange={formhandler} required value={formData.password} placeholder='Password' name='password' type="password" />
              </div>
              <div>
                <button onClick={SubmitAction} className='form-button'>Login </button>
              </div>
              <div className='form-lines'>
                <span className='line1'>Or</span>
                <span className='line2'>Don't Have An Account ?</span>
                <a onClick={(e) => {
                  e.preventDefault();
                  SetUserAuth('signup');
                }} className='link' href=''>Sign Up</a>
              </div>
            </form>}
          <div className='animation-login'>
            <animated.div style={{
              width: '50px',
              textAlign: 'center', height: '50px', backgroundColor: 'white', marginRight: '2rem', ...style1
            }}>H</animated.div>
            <animated.div style={{
              width: '50px', textAlign: 'center',
              height: '50px', backgroundColor: 'white', marginRight: '2rem', ...style2
            }}>E</animated.div>
            <animated.div style={{ width: '50px', textAlign: 'center', height: '50px', backgroundColor: 'white', marginRight: '2rem', ...style3 }}>Y</animated.div>
            <animated.div style={{ width: '50px', textAlign: 'center', height: '50px', backgroundColor: 'white', ...style4 }}>!</animated.div>
          </div>

        </div>
      }
      {(isLoading && !page404) ? <Loading />
        : <>
          {page404 &&
            Navigate('/404page')}
        </>}
    </>
  )
}

export default UserAuth
