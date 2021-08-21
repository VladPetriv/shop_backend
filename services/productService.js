const { Product, ProudctInfo } = require('../models/models.js');

class ProductService {
  async create(name, price, brandId, typeId, fileName, info) {
    const product = await Product.create({
      name,
      price,
      brandId,
      typeId,
      img: fileName,
      info,
    });
    return product;
  }
  async getAll() {
    const products = await Product.findAll({ raw: true });
    return products;
  }
  async getOne(id) {
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProudctInfo, as: 'info' }],
    });
    return product;
  }
}

module.exports = new ProductService();
