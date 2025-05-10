const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User');
const Product = require('./Product');

const StockMovement = sequelize.define('StockMovement', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    type: {
        type: DataTypes.ENUM('In', 'Out'),
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(StockMovement, {foreignKey: 'userId'});
StockMovement.belongsTo(User, {foreignKey: 'userId'});

module.exports = StockMovement;