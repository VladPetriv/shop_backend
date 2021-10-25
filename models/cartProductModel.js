import pkg from 'sequelize';
import db from '../db.js';

const CartProduct = db.define('cart_product', {
  id: {
    type: pkg.DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default CartProduct;
