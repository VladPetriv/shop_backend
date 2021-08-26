const { User } = require('../models/models.js');

class UserService {
  async getAll() {
    const users = await User.findAll({ raw: true });
    return users;
  }
  async getOne(login) {
    const user = await User.findOne({ where: { login } });
    return user;
  }
  async create(login, password) {
    const user = await User.create({ login, password });
    return user;
  }
  async delete(id) {
    const user = await User.destroy({ where: { id } });
    return user;
  }
  async update(id, login, password) {
    const user = await User.update({ login, password }, { where: { id } });
    return user;
  }
}

module.exports = new UserService();
