import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllBlogs.css'
import { AiOutlineDelete, AiTwotoneEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'


function AllBlogs() {
    const Navigate = useNavigate();

    const [blogs, setBlogs] = useState([{
        title: '',
        description: '',
        sanitizedHtml: '',
        author: '',
    }])

    const [articleNames, setArticleNames] = useState([]);

    const editHandle = (title) => {
        const id = JSON.parse(localStorage.getItem('userdata')).username;
        Navigate(`/${id}/${title}/edit`);
    }

    const deleteHandle = async (title) => {
        try {
            const res = await axios.delete(`https://blog-website-cyan.vercel.app/articles/delete/${title}`, {
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            console.log(res.data.message)

        } catch (err) {
            console.error(err);
        }
    }

    const id = JSON.parse(localStorage.getItem('userdata')).username;

    useEffect(() => {
        axios.get('https://blog-website-cyan.vercel.app/articles', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((response) => {
                console.log('Data fetched successfully:', response.data);
                const title = response.data.message.map((blog) => blog.title);
                setArticleNames([...title])
                setBlogs(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    useEffect(() => {
        localStorage.setItem('articleNames', JSON.stringify(articleNames));
        console.log(localStorage.getItem('articleNames'));
    }, [articleNames])

    return (
        <>
            <div className='allblogs-container'>
                {(blogs.length !== 0)?blogs.map((blog, index) => (
                    <div className='allblogs-container-item' key={index}>
                        <div className='allblogs-container-item-title'>{blog.title}</div>
                        <div className='allblogs-container-item-desc'>description : {blog.description}</div>
                        <div className='allblogs-container-item-author'>by ~ {blog.author}</div>
                        <div className='allblogs-container-item-buttonset'>
                            <Link to={blog.slug}>
                                <button className='button'>Read More</button>
                            </Link>
                            <div style={{ display: (JSON.parse(localStorage.getItem('userdata')).username === blog.author) ? 'block' : 'none' }}>
                                <button className='button' onClick={() => { editHandle(blog.slug) }}><AiTwotoneEdit /></button>
                                <a href='/home' >
                                    <button className='button' onClick={() => deleteHandle(blog.slug)}><AiOutlineDelete /></button>
                                </a>
                            </div>
                        </div>
                    </div>
                )):
                <p className='no-articles'>No articles yet</p>}
            </div>
            <div className='new-article-button-container'>
                <Link to={`../${id}/new`}>
                    <button className='new-article-button'>+</button>
                </Link>
            </div>
        </>
    )
}

export default AllBlogs
