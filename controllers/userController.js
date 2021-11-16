import PasswordUtils from '../utils/passwordUtils.js';
import generateToken from '../utils/jwtUtils.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';

class UserController {
  async registarion(req, res) {
    try {
      const { login, password } = req.body;
      const candidate = await UserService.getOne(login);
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this login is exist' });
      }
      const hashPassword = PasswordUtils.hash(password);
      const user = await UserService.create(login, hashPassword);
      const cart = await CartService.create(user.id);
      const token = generateToken(user.id, login, cart);
      res.json({ token });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await UserService.getOne(login);
      if (!user) {
        return res.status(400).json({ message: 'Incorrect login' });
      }

      const comparePassword = PasswordUtils.comparePassword(
        password,
        user.password
      );
      if (!comparePassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      const token = generateToken(user.id, login);
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
