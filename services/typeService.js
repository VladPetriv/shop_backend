import { Type } from '../models/models.js';

class TypeService {
  async getAll() {
    const types = await Type.findAll({ raw: true });
    return types;
  }
  async getOne(id) {
    const type = await Type.findByPk(id, { raw: true });
    return type;
  }
  async create(name) {
    const type = Type.create({ name });
    return type;
  }
  async delete(id) {
    const type = await Type.destroy({ where: { id } });
    return type;
  }
  async update(id, name) {
    const type = await Type.update({ name }, { where: { id }, raw: true });
    return type;
  }
}

export default new TypeService();
