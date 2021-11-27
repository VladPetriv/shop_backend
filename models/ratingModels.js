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
    validate: {
      min: 0,
      max: 5,
    },
  },
});

export default Rating;
