const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

//@desc register 

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const exists = await User.findOne({where: {email}});
        if(exists) return res.status(400).json({message: "Email already taken!"});

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashed});

        res.status(201).json({
            user: {id: user.id, username:user.username, email: user.email},
            token: generateToken(user.id)
        })
    } catch (err) {
        res.status(500).json({message: 'Internal server error!'});
        console.error('Error in egister', err);
    }
};

// @desc login

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if(!user) return res.status(404).json({message: "We do not have the email entered!"});
      
     
        const match = await bcrypt.compare(password.trim(), user.password.trim());
        if(!match) return res.status(400).json({message: 'Incorrect password!'});

        return res.status(200).json({
            user: {id: user.id, email: user.email},
            token: generateToken(user.id)
        })
    } catch (err) {
        return res.status(500).json({message: "Internal server error!"});
        console.error('Login error', err);
    }
}