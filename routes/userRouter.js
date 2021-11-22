import { Router } from 'express';
import { body } from 'express-validator';
import checkUserAuthorization from '../middlewares/chechUserMiddleware.js';
import UserController from '../controllers/userController.js';
import {
  NOT_VALID_EMAIL,
  NOT_VALID_LOGIN,
  NOT_VALID_PASSWORD,
} from '../error_messages/userErrorMessages.js';

const router = Router();

router.post(
  '/registration',
  body('login').isLength({ min: 4, max: 10 }).withMessage(NOT_VALID_LOGIN),
  body('email').isEmail().withMessage(NOT_VALID_EMAIL),
  body('password').isLength({ min: 4 }).withMessage(NOT_VALID_PASSWORD),
  UserController.registarion
);
router.post('/login', UserController.login);
router.get('/auth', checkUserAuthorization, UserController.check);

export default router;
