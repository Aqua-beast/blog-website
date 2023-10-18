import React, { useEffect, useState } from 'react'
import './EditPageComponent.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPageComponenet() {
  const Navigate = useNavigate();
  const titleArticle = useParams().title;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    markdown: '',
    author: '',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://blog-website-cyan.vercel.app//articles/${titleArticle}`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
        console.log(titleArticle)
        console.log(response.data.message);
        setFormData({
          ...response.data.message,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [titleArticle]);


  const handleArticle = async () => {
    try {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      setFormData({ author: userdata.username });
      if (formData.title !== '' && formData.markdown !== '') {
        const dta = await axios.patch(`https://blog-website-cyan.vercel.app//articles/edit/${titleArticle}`, formData, {
          withCredentials: true,
          credentials: 'include',
          headers: {
            "x-access-token": localStorage.getItem('token')
          }
        });
        // console.log(dta);
        toast(dta.data.user);
        setTimeout(()=>{
          Navigate('/home')
        }, 4500)        
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <div className="article-form">
        <h2 className='article-form-title'>Edit Article</h2>
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
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditPageComponenet
