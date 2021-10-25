import pkg from 'sequelize';
import db from '../db.js';

const Brand = db.define('brand', {
  id: {
    type: pkg.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: pkg.DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default Brand;
