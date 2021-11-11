import bcrypt from 'bcryptjs';
import generateToken from '../utils/jwtUtils.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';

class UserController {
  async registarion(req, res) {
    try {
      const { login, password } = req.body;
      const candidate = await UserService.getOne(login);
      if (candidate) {
        res.status(400).json({ message: 'User with this login is exist' });
      }
      const hashPassword = await bcrypt.hash(password, 5);
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
        res.status(400).json({ message: 'Incorrect login' });
      }
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        res.status(400).json('Incorrect password');
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
      const token = generateToken(req.user.id, req.user.email);
      res.json({ token });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new UserController();
