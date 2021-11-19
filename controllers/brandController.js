import { validationResult } from 'express-validator';
import BrandService from '../services/brandService.js';
import { NO_BRAND_WITH_ID } from '../error_messages/brandErrorMessages.js';

class BrandController {
  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAll();
      res.json(brands);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async getOneBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getOne(id);
      if (!brand) {
        return res.status(400).json({ message: NO_BRAND_WITH_ID });
      }
      res.json(brand);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async createBrand(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name } = req.body;
      const brand = await BrandService.create(name);
      res.json({ brand, message: 'Brand was created' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const candidate = await BrandService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_BRAND_WITH_ID });
      }
      await BrandService.delete(id);
      res.json({ message: 'Brand was deleted' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const candidate = await BrandService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_BRAND_WITH_ID });
      }
      await BrandService.update(id, name);
      res.json({ message: 'Brand was updated' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new BrandController();
