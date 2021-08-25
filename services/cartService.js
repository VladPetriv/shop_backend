const { Cart } = require('../models/models.js');

class CartService {
  async create(id) {
    const cart = await Cart.create({ userId: id });
    return cart;
  }
  async getOne(id) {
    const cart = await Cart.findByPk(id, { include: ['cart_products'] });
    return cart;
  }
}

module.exports = new CartService();
