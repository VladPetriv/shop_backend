import { CartProduct } from '../models/models.js';
import ProductService from './productService.js';

class CartProductService {
  async getAll(cartId) {
    const cartProducts = await CartProduct.findAll({
      where: { cartId },
      raw: true,
      include: ['product'],
    });
    return cartProducts;
  }
  async getOne(id, cartId) {
    const cartProduct = await CartProduct.findOne({
      where: { cartId, id },
      raw: true,
      include: ['product'],
    });
    return cartProduct;
  }

  async create(cartId, productId) {
    const product = await ProductService.getOne(productId);
    if (!product) return new Error('No product  with this id');
    const cartProduct = await CartProduct.create({ cartId, productId });
    return cartProduct;
  }
  async delete(id, cartId) {
    const cartProduct = await CartProduct.destroy({ where: { cartId, id } });
    return cartProduct;
  }
}

export default new CartProductService();
