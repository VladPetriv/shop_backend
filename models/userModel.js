import pkg from 'sequelize';
import db from '../db.js';

const User = db.define('user', {
  id: {
    type: pkg.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  login: {
    type: pkg.DataTypes.STRING,
    unique: true,
  },
  password: {
    type: pkg.DataTypes.STRING,
  },
  role: {
    type: pkg.DataTypes.STRING,
    defaultValue: 'USER',
  },
});

export default User;
