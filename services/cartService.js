const { Cart } = require('../models/models.js');

class CartService {
  async create(id) {
    const cart = await Cart.create({ userId: id });
    return cart;
  }
  async getOne(id) {
    const cart = await Cart.findByPk(id, { raw: true });
    return cart;
  }
}

module.exports = new CartService();
