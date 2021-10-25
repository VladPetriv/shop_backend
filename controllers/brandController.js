import BrandService from '../services/brandService.js';

class BrandController {
  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAll();
      return res.json(brands);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getOneBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getOne(id);
      return res.json(brand);
    } catch (err) {
      return res.status.json(err);
    }
  }
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const brand = await BrandService.create(name);
      return res.json(brand);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandService.delete(id);
      return res.json(brand);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const brand = await BrandService.update(id, name);
      return res.json(brand);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new BrandController();
