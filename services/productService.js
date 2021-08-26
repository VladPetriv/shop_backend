const { Product } = require('../models/models.js');

class ProductService {
  async create(name, price, brandId, typeId, img, description) {
    const product = await Product.create({
      name,
      price,
      brandId,
      typeId,
      img,
      description,
    });
    return product;
  }
  async getAll() {
    const products = await Product.findAll({ raw: true });
    return products;
  }
  async getOne(id) {
    const product = await Product.findByPk(id, { raw: true });
    return product;
  }
}

module.exports = new ProductService();
