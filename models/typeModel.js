import pkg from 'sequelize';
import db from '../db.js';

const Type = db.define('type', {
  id: {
    type: pkg.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: pkg.DataTypes.STRING,
    allowNull: false,
  },
});

export default Type;
