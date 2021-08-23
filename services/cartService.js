const { Cart } = require('../models/models.js');

class CartService {
  async create(id) {
    const cart = await Cart.create({ userId: id });
    return cart;
  }
}

module.exports = new CartService();
