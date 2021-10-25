import TypeService from '../services/typeService.js';

class TypeController {
  async getAllTypes(req, res) {
    try {
      const types = await TypeService.getAll();
      return res.json(types);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getOneType(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeService.getOne(id);
      return res.json(type);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async createType(req, res) {
    try {
      const { name } = req.body;
      const type = await TypeService.create(name);
      return res.json(type);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteType(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeService.delete(id);
      return res.json(type);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const type = await TypeService.update(id, name);
      return res.json(type);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new TypeController();
