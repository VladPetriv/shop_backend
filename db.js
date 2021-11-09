import dotenv from 'dotenv';
dotenv.config();
import Sequelize from 'sequelize';
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
      timestamps: false,
    },
  }
);
export default db;
