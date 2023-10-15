const express = require('express');
const protectRoute = require('../controller/ProtectRouteController');
const UserDetails = require('../controller/UserDetails');
const adminRouter = express.Router();

adminRouter
.get('/admin/:user', protectRoute, UserDetails.getAllDetails)
.delete('/admin/:user', protectRoute, UserDetails.deleteAllDetails)


module.exports = adminRouter;