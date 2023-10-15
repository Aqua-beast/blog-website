const Article = require('../models/UserArticles');
const cloudinary = require('../config');
const path = require('path');
const fs = require('fs');

async function getAllArticles(req, res) {
    try {
        const data = await Article.find({})
        res.json({ message: data });
    } catch (error) {
        res.json({ message: 'error while showing articles' })
    }
}

async function profileUser(req, res) {
    try {
        const user = req.params.author;
        const data = await Article.find({ author: user })
        res.json({ message: data });
    } catch (error) {
        res.json({ message: 'user does not exist' })
    }
}

async function CreateArticle(req, res) {
    try {
        const { title, description, markdown } = req.body;
        const tempFilePath = path.join(__dirname, '..', 'temp', Date.now() + '.jpg');
        fs.writeFileSync(tempFilePath, req.file.buffer);
        const result = await cloudinary.uploader.upload(tempFilePath);
        fs.unlinkSync(tempFilePath);
        console.log(req.file.buffer);
        const data = new Article({
            title: title,
            description: description,
            markdown: markdown,
            author: req.params.author,
            imageUrl: result.secure_url,
        });
        await data.save();
        res.json({ user: 'article saved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function GetTitleArticle(req, res) {
    try {
        const data = await Article.findOne({ slug: req.params.title })
        res.json({ message: data });
    } catch (error) {
        res.status(500).json({ info: error.message });
    }
}

async function EditArticle(req, res) {
    try {
        const { title, description, markdown } = req.body;
        const article = await Article.findOne({ slug: req.params.title });
        article.title = title;
        article.description = description;
        article.markdown = markdown;
        await article.save();
        res.json({ user: 'article edited' });
    } catch (error) {
        res.status(500).json({ info: error.message });
    }
}

async function DeleteArticle(req, res) {
    try {
        const data = await Article.findOneAndDelete({ slug: req.params.title });
        res.json({ message: data });
    } catch (error) {
        res.json({ error: 'error' })
    }
}

async function addLike(req, res) {
    try {
        const article = await Article.findOne({ slug: req.params.title });
        article.Like += 1;
        await article.save();
        res.json({ message: 'Like added successfully', likes: article.Like });
    } catch (error) {
        res.status(500).json({ message: 'Error adding like', error: error.message });
    }
}

async function addComment(req, res) {
    try {
        const { username, comment } = req.body;
        console.log('Received request:', username, comment);

        const article = await Article.findOne({ slug: req.params.title });
        console.log('Current article.Comment:', article.Comment);

        article.Comment.push({ username, comment });
        await article.save();

        console.log('Updated article.Comment:', article.Comment);

        res.json({ message: 'Comment added successfully', comments: article.Comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
}



module.exports = {
    getAllArticles, profileUser, CreateArticle, GetTitleArticle, EditArticle, DeleteArticle, addComment, addLike
}