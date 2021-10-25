import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import router from './routes/mainRouter.js';

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

export default app;
