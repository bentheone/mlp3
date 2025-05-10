const { DataTypes } = require('sequelize');
const  sequelize = require('../config/db');
const User = require('./User');

const Category = sequelize.define('Category', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Category',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name'] // Unique name per user
      }
    ]
  });

User.hasMany(Category, {foreignKey: 'userId'});
Category.belongsTo(User, {foreignKey: 'userId'});

module.exports = Category;
