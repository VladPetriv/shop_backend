import { Product } from '../models/models.js';

class ProductService {
  async getAll() {
    const products = await Product.findAll({ raw: true });
    return products;
  }
  async getOne(id) {
    const product = await Product.findByPk(id, { raw: true });
    return product;
  }
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
  async delete(id) {
    const product = await Product.destroy({ where: { id } });
    return product;
  }
  async update(id, name, price, brandId, typeId, description) {
    const product = await Prooduct.update(
      {
        name,
        price,
        brandId,
        typeId,
        description,
      },
      { where: { id } }
    );
    return product;
  }
}

export default new ProductService();
