require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const models = require('./models/models.js');
const db = require('./db.js');
const router = require('./routes/mainRouter.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

const start = async () => {
  await db.authenticate().catch((err) => console.error(err));
  await db.sync().catch((err) => console.error(err));
  app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
};

start();
