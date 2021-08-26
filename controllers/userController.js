const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils.js');
const UserService = require('../services/userService.js');
const CartService = require('../services/cartService.js');

class UserController {
  async registarion(req, res) {
    try {
      const { login, password } = req.body;
      const candidate = await UserService.getOne(login);
      if (candidate) {
        return res.json('Please use another login');
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await UserService.create(login, hashPassword);
      const cart = await CartService.create(user.id);
      const token = generateToken(user.id, login, cart);
      return res.json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await UserService.getOne(login);
      if (!user) {
        return res.status(400).json('Incorrect login');
      }
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(400).json('Incorrect password');
      }
      const token = generateToken(user.id, login);
      return res.json({ token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async check(req, res) {
    const token = generateToken(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new UserController();
