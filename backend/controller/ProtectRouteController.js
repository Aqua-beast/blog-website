const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// done
const protectRoute = (req, res, next) => {
    const token = req.headers['x-access-token'];
    // frontend 

    // const token = req.cookies['x-access-token']; 
    //backend

    if(token){
        try{
            const decodedToken = jwt.verify(token, secretKey);
            if(decodedToken){
                next();
            }else {
                return res.status(400).json({message: 'token has been modified'});
            }
        }catch(err){
            return res.status(400).json({message: 'invalid token'})  
        }
    }else{
        // browser
        const client = req.get('User-Agent');
        if(client.includes('Mozilla')==true){
            return res.redirect('/auth/login')
        }
        return res.status(400).json({message: 'No token recieved'});
    }
}

module.exports = protectRoute;