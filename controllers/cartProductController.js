import CartProductService from '../services/cartProductService.js';

class CartProductController {
  async getAllCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const cartProducts = await CartProductService.getAll(cartId);
      return res.json(cartProducts);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getOneCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const cartProduct = await CartProductService.getOne(id, cartId);
      return res.json(cartProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async createCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const { productId } = req.body;
      const cartProduct = await CartProductService.create(cartId, productId);
      return res.json(cartProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const cartProduct = await CartProductService.delete(id, cartId);
      return res.json(cartProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const { productId } = req.body;
      const cartProduct = await CartProductService.update(
        id,
        cartId,
        productId
      );
      return res.json(cartProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new CartProductController();
