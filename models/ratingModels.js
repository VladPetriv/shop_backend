import pkg from 'sequelize';
import db from '../db.js';

const Rating = db.define('rating', {
  id: {
    type: pkg.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: pkg.DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Rating;
