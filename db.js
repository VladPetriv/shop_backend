require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    define: {
      timestamps: false,
    },
  }
);
module.exports = db;
