import { Router } from 'express';
import { body } from 'express-validator';
import checkUserAuthorization from '../middlewares/chechUserMiddleware.js';
import UserController from '../controllers/userController.js';

const router = Router();

router.post(
  '/registration',
  body('login')
    .isLength({ min: 4, max: 10 })
    .withMessage('Must be  4+ and less then 10 symbols'),
  body('email').isEmail().withMessage('Please use valid email'),
  body('password').isLength({ min: 4 }).withMessage('Must be 4+ symbols'),
  UserController.registarion
);
router.post('/login', UserController.login);
router.get('/auth', checkUserAuthorization, UserController.check);

export default router;
