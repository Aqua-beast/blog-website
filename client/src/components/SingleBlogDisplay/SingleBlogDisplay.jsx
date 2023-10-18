import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SingleBlogDisplay.css';
import { AiFillLike } from 'react-icons//ai'
import { FiUser } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleBlogDisplay() {
  const { slug } = useParams();
  
  const [blogDetails, setBlogDetails] = useState({});
  const [likes, setLikes] = useState(blogDetails.Like);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios
      .get(`https://blog-website-cyan.vercel.app//articles/${slug}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log('Blog details fetched successfully:', response.data);
        setBlogDetails(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
      });
  }, [slug, likes, newComment]);




  const handleLike = () => {
    axios
      .post(`https://blog-website-cyan.vercel.app//articles/${slug}/like`, {}, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setLikes(response.data.likes);
        // console.log(response.data.likes);
        toast(response.data.message)
      })
      .catch((error) => {
        console.error('Error liking article:', error);
      });
  };

  const handleComment = () => {
    axios
      .post(`https://blog-website-cyan.vercel.app//articles/${slug}/comment`, {username: JSON.parse(localStorage.getItem("userdata")).username ,comment: newComment }, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setComments(response.data.comments);
        setNewComment(''); 
        toast(response.data.message)
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  const bg = blogDetails.imageUrl;
  const styled = {
    width: '50%',
    height: 'auto'
  }

  const dte = blogDetails.createdAt ? blogDetails.createdAt.substring(0, 10) : '';

  return (
    <div className='single-blog-display-container'>
      <h1 className='single-blog-display-title'>{blogDetails.title}</h1>
      <div className='profile-design'>
        <span className='icon-profile'><FiUser color='blue' /></span>
        <div className='profile-design-details'>
          <div style={{ marginRight: '5rem' }}>{blogDetails.author}</div>
          <div>{dte}</div>
        </div>
      </div>
      <div className='single-blog-display-img'>
        {/* <div style={styled}> */}
        <img src={bg} style={styled} alt='blog-img' />
        {/* </div> */}
        <div className='text-details-box'>
          <div dangerouslySetInnerHTML={{ __html: blogDetails.sanitizedHtml }} />
        </div>
      </div>
      <div className='like-box'>
        <AiFillLike className='like-icon' onClick={handleLike} />
        <span style={{color: 'blue'}}>{likes}</span>
      </div>

      <div className='comment-box'>
        <div className='single-blog-display-title'>Comments Section</div>
        {comments.map((comment, index) => (
          <div key={index}>
            <div>{comment.username}</div>
            <div>{comment.comment}</div>
          </div>
        ))}
        <div>{JSON.parse(localStorage.getItem('userdata')).username}</div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleComment}>Add Comment</button>
      </div>

    </div>
  );

}

export default SingleBlogDisplay
