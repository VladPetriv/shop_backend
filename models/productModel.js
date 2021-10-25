import pkg from 'sequelize';
import db from '../db.js';

const Product = db.define('product', {
  id: {
    type: pkg.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: pkg.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: pkg.DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: pkg.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: pkg.DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: pkg.DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
