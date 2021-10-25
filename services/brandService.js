import { Brand } from '../models/models.js';

class BrandService {
  async getAll() {
    const brands = await Brand.findAll({ raw: true });
    return brands;
  }
  async getOne(id) {
    const brand = await Brand.findByPk(id, { raw: true });
    return brand;
  }
  async create(name) {
    const brand = await Brand.create({ name });
    return brand;
  }
  async delete(id) {
    const brand = await Brand.destroy({ where: { id }, raw: true });
    return brand;
  }
  async update(id, name) {
    const brand = await Brand.update({ name }, { where: { id }, raw: true });
    return brand;
  }
}

export default new BrandService();
