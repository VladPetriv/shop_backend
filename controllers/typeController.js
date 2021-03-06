import { validationResult } from 'express-validator';
import TypeService from '../services/typeService.js';
import { NO_TYPE_WITH_ID } from '../error_messages/typeErrorMessages.js';

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
      if (!type) {
        return res.status(400).json({ message: NO_TYPE_WITH_ID });
      }

      res.json(type);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async createType(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { name } = req.body;
      const type = await TypeService.create(name);

      res.json({ type, message: 'Type was created' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async deleteType(req, res) {
    try {
      const { id } = req.params;
      const candidate = await TypeService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_TYPE_WITH_ID });
      }

      await TypeService.delete(id);

      res.json({ message: 'Type was deleted' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const candidate = await TypeService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_TYPE_WITH_ID });
      }

      await TypeService.update(id, name);

      res.json({ message: 'Type was updated' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new TypeController();
