const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = User;