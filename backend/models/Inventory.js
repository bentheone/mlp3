const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User');
const Product = require('./Product');

const Inventory = sequelize.define('Inventory', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

User.hasMany(Inventory, {foreignKey: 'userId'});
Inventory.belongsTo(User, {foreignKey: 'userId'});
Product.hasOne(Inventory, {foreignKey: 'productId'});
Inventory.belongsTo(Product, {foreignKey: 'productId'});

module.exports = Inventory;