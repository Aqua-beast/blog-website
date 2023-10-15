const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controller/UserController');

// signup
UserRouter
.post('/signup', UserController.getSignUp);

// login
UserRouter
.post('/login', UserController.getLoggedIn);

// logout
UserRouter
.get('/logout', UserController.getLoggedOut);

module.exports = UserRouter