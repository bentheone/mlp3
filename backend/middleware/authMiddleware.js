const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    const authHeader  = req.headers.authorization;
    
    if(authHeader && authHeader.startsWith('Bearer')){
        try {
            const token = authHeader.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decode.id, {attributes: {exclude: ['password']}});

            if(!req.user) return res.status(401).json({message: "User not found!"});

            next();
        } catch (err) {
            return res.status(401).json({message: "Invalid token!"})
        }
    } else {
        return res.status(401).json({message: "No token provided!"});
    }
};
module.exports = protect; 