const { DataTypes } = require('sequelize');
const db = require('../db.js');

const Brand = db.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Brand;
