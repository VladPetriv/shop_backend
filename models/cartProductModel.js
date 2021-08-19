const { DataTypes } = require('sequelize');
const db = require('../db.js');

const CartProduct = db.define('cart_product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = CartProduct;
