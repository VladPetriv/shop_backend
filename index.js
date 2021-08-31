require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const models = require('./models/models.js');
const router = require('./routes/mainRouter.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

module.exports = app;
