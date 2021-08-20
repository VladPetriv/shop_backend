const { Brand } = require('../models/models.js');

class BrandService {
  async getAll() {
    const brands = await Brand.findAll({ raw: true });
    return brands;
  }
  async create(name) {
    const brand = await Brand.create({ name });
    return brand;
  }
}

module.exports = new BrandService();
