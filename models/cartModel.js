import pkg from 'sequelize';
import db from '../db.js';

const Cart = db.define('cart', {
  id: {
    type: pkg.DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default Cart;
