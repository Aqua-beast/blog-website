const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// done
async function getSignUp(req, res) {
    try {
        const { email, password, confirmedPassword, username } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists with the email' })
        }
        if (password !== confirmedPassword) {
            return res.status(400).json({ message: 'password and confirmed password does not match' })
        }
        let dta = new User({
            email: email,
            username: username,
            password: password,
            confirmedPassword: confirmedPassword,
        });
        await dta.save();
        return res.status(201).json({ message: `signup was successful for ${dta.username}` })
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// done
async function getLoggedIn(req, res){
    try{
        const {email, password} = req.body;
        const dta = await User.findOne({email: email});
        if(dta){
            if(bcrypt.compareSync(password, dta.password)){
                const token = jwt.sign({ userId: dta._id }, secretKey, {expiresIn: '1d'});
                res.cookie('x-access-token', token, { httpOnly: true, maxAge: 1000*24*60*60, secure: true });
                res.status(200).json({message: 'user credentials are valid', token: token});
                return ;
            }else{
                return res.status(400).json({message: 'password is incorrect'});
            }
        }else{
            return res.status(400).json({message: 'password or email id is invalid'})
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ error : 'Internal Server Error'});
    }
}

// done
function getLoggedOut(req, res){
    res.cookie('x-access-token', '', {maxAge: 1});
    res.json({message: 'user has successfully logged out'});
}

module.exports = {
    getSignUp, getLoggedIn, getLoggedOut
};