const BrandService = require('../services/brandService.js');

class BrandController {
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const brand = await BrandService.create(name);
      return res.json(brand);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAll();
      return res.json(brands);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new BrandController();
