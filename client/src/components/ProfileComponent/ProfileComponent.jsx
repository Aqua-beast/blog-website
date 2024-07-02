import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './ProfileComponent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileComponent = ({ isOpen, onClose }) => {
  // State for image upload component
  const [imgUpload, setingUpload] = useState(false);
  // State for user data
  const [imgData, setImgData] = useState({
    imageUrl: null,
  });
  // State for user data fetched from the server
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem('email');
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server
    axios
      .get(`https://blog-website-server-tau.vercel.app/profile/${email}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        // Store user data in state
        // console.log(response.data.details);
        setUserData(response.data.details);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email]);

  const onLogOut = async () => {
    try {
      const response = await axios.get(`https://blog-website-server-tau.vercel.app/auth/logout`);
      toast(response.data.message);
      setTimeout(()=>{
        Navigate('/');
      }, 4500)
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgData({
      imageUrl: file,
    });
  };

  const [imgStat, setImgStat] = useState('/user.png');

  useEffect(() => {
    // Update imgStat when userData changes
    if (userData && userData.imageUrl) {
      setImgStat(userData.imageUrl);
    }
  }, [userData]);

  const InputImage = () => {
    setingUpload(true);
  }

  const ImageUploader = async () => {
    try {
      const response = await axios.patch(`https://blog-website-server-tau.vercel.app/profile/${email}`, imgData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      toast(response.data.message);
      setingUpload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!imgUpload ? (
        <div className={`profile ${isOpen ? 'open' : ''}`}>
          <div className="profile-content">
            <button onClick={onClose}>Close Profile</button>
            <button onClick={InputImage}>
              <img src={imgStat} alt="User Image" style={{ height: '3rem', width: 'auto' }} />
            </button>
            {userData && (
              <>
                <h3>{userData.username}</h3>
                <h3>{userData.email}</h3>
                <h3>{userData.role}</h3>
              </>
            )}
            <button onClick={onLogOut}>Log Out</button>
          </div>
          <div>
            <ToastContainer />
          </div>
        </div>
      ) : (
        <div className="container">
          <AiOutlineCloseCircle onClick={() => { setingUpload(false) }} className="close" />
          <form className="profile-img-input">
            <label className="profile-label" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button onClick={ImageUploader}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
