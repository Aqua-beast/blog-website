const express = require('express');
const BlogController = require('../controller/BlogController')
const protectRoute = require('../controller/ProtectRouteController');
const articleRouter = express.Router();
const multer = require("multer");
 // Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

articleRouter
    // done
    .get('/articles', protectRoute, BlogController.getAllArticles)

    .get('/profile/articles/:author', protectRoute, BlogController.profileUser)

    // done
    .post('/articles/:author/new', protectRoute, upload.single("image"), BlogController.CreateArticle)
    // done
    .get('/articles/:title', protectRoute, BlogController.GetTitleArticle)
    // done
    .patch('/articles/edit/:title', protectRoute, BlogController.EditArticle)
    // done
    .delete('/articles/delete/:title', protectRoute, BlogController.DeleteArticle)
    // done
    .post('/articles/:title/like', protectRoute, BlogController.addLike)
    // done
    .post('/articles/:title/comment', protectRoute, BlogController.addComment)

module.exports = articleRouter; 
