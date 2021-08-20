const { Type } = require('../models/models.js');

class TypeService {
  async getAll() {
    const types = Type.findAll({ raw: true });
    return types;
  }
  async create(name) {
    const type = Type.create({ name });
    return type;
  }
}

module.exports = new TypeService();
