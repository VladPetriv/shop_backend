import { Cart } from '../models/models.js';

class CartService {
  async getAll() {
    const carts = await Cart.findAll({ raw: true });
    return carts;
  }
  async getOne(id) {
    const cart = await Cart.findByPk(id, { raw: true });
    return cart;
  }
  async create(userId) {
    const cart = await Cart.create({ userId });
    return cart;
  }
  async delete(id) {
    const cart = await Cart.destroy({ where: { id } });
    return cart;
  }
}

export default new CartService();
