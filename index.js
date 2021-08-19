require('dotenv').config();

const express = require('express');
const db = require('./db.js');

const PORT = process.env.PORT || 3000;

const app = express();

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
