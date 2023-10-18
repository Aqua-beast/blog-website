import React, { useState } from 'react';
import './BlogComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogComponent = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    markdown: '',
    author: '',
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const handleArticle = async () => {
    try {
      setIsLoading(true);
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      const formDataToSend = new FormData();

      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('markdown', formData.markdown);
      formDataToSend.append('author', userdata.username);
      formDataToSend.append('image', formData.imageFile);

      if (formData.title !== '' && formData.markdown !== '') {
        const dta = await axios.post(`https://blog-website-cyan.vercel.app/articles/${userdata.username}/new`, formDataToSend, {
          withCredentials: true,
          credentials: 'include',
          headers: {
            "x-access-token": localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          }
        });
        toast(dta.data.user);
        // console.log(dta);
        setTimeout(() => {
          Navigate('/home');
        }, 4500);
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }

  return (
    (isLoading ?
      (!isError && <Loading />) :
      <div className="article-form">
        <h2 className='article-form-title'>Create Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className='form-group-input'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className='form-group-input'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className='form-group-input'
            />
          </div>

          <div className="form-group">
            <label htmlFor="markdown">Markdown Content</label>
            <textarea
              id="markdown"
              name="markdown"
              style={{ height: '130px' }}
              value={formData.markdown}
              onChange={handleChange}
              required
            />
          </div>
          <button onClick={handleArticle} className='form-group-btn' type="submit">Submit</button>
        </form>
        {isError && <p style={{ fontSize: '1.2rem', color: 'red' }}>try again</p>}
        <div>
          <ToastContainer />
        </div>
      </div>
    )
  );
};

export default BlogComponent;
