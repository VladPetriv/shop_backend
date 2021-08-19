const { DataTypes } = require('sequelize');
const db = require('../db.js');

const Cart = db.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Cart;
