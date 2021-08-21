const { DataTypes } = require('sequelize');
const db = require('../db.js');

const Rating = db.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Rating;
