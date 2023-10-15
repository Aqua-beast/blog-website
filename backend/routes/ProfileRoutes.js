const express = require('express');
const ProfileRouter = express.Router();
const User = require('../models/UserModel');
const protectRoute = require('../controller/ProtectRouteController');
const cloudinary = require('../config');
const path = require('path');
const fs = require('fs');
const multer = require("multer");


// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


ProfileRouter
.get('/profile/:email', protectRoute, async (req, res) => {
    try {
        const data = await User.findOne({email: req.params.email});
        res.json({details: data});
    }catch(error){
        res.json({message: 'some error'})
    }
})
.patch('/profile/:email', protectRoute, upload.single("imageUrl"), async(req, res)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne({email: email});
        if(user){
            const tempFileImg = path.join(__dirname, '..', 'ctemp', Date.now() + '.jpg');
            fs.writeFileSync(tempFileImg, req.file.buffer);
            const result = await cloudinary.uploader.upload(tempFileImg);
            fs.unlinkSync(tempFileImg);
            console.log(req.file.buffer);
            user.imageUrl = result.secure_url;
            await user.save();
            res.json({message: 'user profile photo updated'})
        }else{
            res.json({message: 'user does not exist'});
        }
    }catch(error){
        res.json({message: 'profile image not updated'});
    }
})

module.exports = ProfileRouter