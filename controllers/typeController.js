const TypeService = require('../services/typeService.js');

class TypeController {
  async createType(req, res) {
    const { name } = req.body;
    const type = await TypeService.create(name);
    return res.json(type);
  }
  async getAllTypes(req, res) {
    const types = await TypeService.getAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
