const User = require('../models/UserModel');
const bcrypt = require('bcrypt');


// admin can get details for everyone
async function getAllDetails(req, res){
    try{
        const admin = req.params.user;
        const data = await User.findOne({username: admin});
        const alluser = await User.find({});
        if(!data){
            res.status(200).json({message: 'admin user does not exist'});
        }
        if(bcrypt.compareSync('admin1234', data.password)){
            res.status(200).json({users: alluser});
        }else{
            res.status(200).json({message: 'user is not admin'});
        }
    }catch(error){
        res.status(500).json({message: error});
    }
}

// to delete users by admin
async function deleteAllDetails(req, res){
    try{
        const data = await User.deleteOne({username: req.body.username});
        if(data){
            res.status(200).json({message: 'user has been deleted by the admin'});
        }else {
            res.status(400).json({message: `user couldn't be found`});
        }
    }catch(error){
        res.status(500).json({message: `couldn't delete this due to some server problems`})
    }
}


module.exports = {
    getAllDetails, deleteAllDetails
}