import { Router } from 'express';
import checkUserAuthorization from '../middlewares/chechUserMiddleware.js';
import UserController from '../controllers/userController.js';

const router = Router();

router.post('/registration', UserController.registarion);
router.post('/login', UserController.login);
router.get('/auth', checkUserAuthorization, UserController.check);

export default router;
