import { validationResult } from 'express-validator';
import PasswordUtils from '../utils/passwordUtils.js';
import generateToken from '../utils/jwtUtils.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';
import {
  USE_ANOTHER_LOGIN,
  INCORRECT_LOGIN,
  INCORRECT_PASSWORD,
} from '../error_messages/UserErrorMessages.js';

class UserController {
  async registarion(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { login, email, password } = req.body;
      const candidate = await UserService.getOne(login);
      if (candidate) {
        return res.status(400).json({ message: USE_ANOTHER_LOGIN });
      }
      const hashPassword = PasswordUtils.hash(password);
      const user = await UserService.create(login, email, hashPassword);
      const cart = await CartService.create(user.id);
      const token = generateToken(user.id, login, email, cart);
      res.json({ token });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async login(req, res) {
    try {
      const { login, email, password } = req.body;
      const user = await UserService.getOne(login);
      if (!user) {
        return res.status(400).json({ message: INCORRECT_LOGIN });
      }

      const comparePassword = PasswordUtils.comparePassword(
        password,
        user.password
      );
      if (!comparePassword) {
        return res.status(400).json({ message: INCORRECT_PASSWORD });
      }
      const token = generateToken(user.id, login, email);
      res.json({ token });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async check(req, res) {
    try {
      const { id, email } = req.user;
      const token = generateToken(id, email);
      res.json({ token });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new UserController();
