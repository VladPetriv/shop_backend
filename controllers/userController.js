const jwt = require('jsonwebtoken');
const UserService = require('../services/userService.js');
const CartService = require('../services/cartService.js');
const { encrypt, decrypt } = require('../utils/passwordUtils.js');

class UserController {
  async registarion(req, res) {
    try {
      const { login, password } = req.body;
      const candidate = await UserService.getOne(login);
      if (candidate) {
        return res.json('User with this login is exist');
      }
      const hashPassword = encrypt(password);
      const user = await UserService.create(login, hashPassword);
      const cart = await CartService.create(user.id);
      const token = jwt.sign(
        { id: user.id, login, cart },
        process.env.SECRET_KEY,
        {
          expiresIn: '24h',
        }
      );
      return res.json(token);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  async login(req, res) {}
  async checkStatus(req, res) {}
}

module.exports = new UserController();
