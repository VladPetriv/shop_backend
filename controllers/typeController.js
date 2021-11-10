import TypeService from '../services/typeService.js';

class TypeController {
  async getAllTypes(req, res) {
    try {
      const types = await TypeService.getAll();
      res.json(types);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async getOneType(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeService.getOne(id);
      res.json(type);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async createType(req, res) {
    try {
      const { name } = req.body;
      const type = await TypeService.create(name);
      res.json(type);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  }
  async deleteType(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeService.delete(id);
      res.json(type);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const type = await TypeService.update(id, name);
      res.json(type);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new TypeController();
