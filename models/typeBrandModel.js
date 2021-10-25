import pkg from 'sequelize';
import db from '../db.js';

const TypeBrand = db.define('type_brand', {
  id: {
    type: pkg.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default TypeBrand;
