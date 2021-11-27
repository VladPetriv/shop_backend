import { User } from '../models/models.js';

class UserService {
  async getAll() {
    const users = await User.findAll({ raw: true });
    return users;
  }
  async getOne(login) {
    const user = await User.findOne({ where: { login }, include: ['cart'] });
    return user;
  }
  async create(login, email, password) {
    const user = await User.create({ login, email, password });
    return user;
  }
  async delete(id) {
    const user = await User.destroy({ where: { id } });
    return user;
  }
  async update(id, login, email, password) {
    const user = await User.update(
      { login, email, password },
      { where: { id } }
    );
    return user;
  }
}

export default new UserService();
