const { User } = require('../models/models.js');

class UserService {
  async create(login, password) {
    const user = await User.create({ login, password });
    return user;
  }
  async getOne(login) {
    const user = await User.findOne({ where: { login } });
    return user;
  }
}

module.exports = new UserService();
