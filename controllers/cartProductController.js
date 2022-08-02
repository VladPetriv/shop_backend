import CartProductService from '../services/cartProductService.js';
import CartService from '../services/cartService.js';
import {
  NO_CART_PRODUCT_WITH_ID,
  NO_CART_WITH_ID,
} from '../error_messages/cartProductErrorMessages.js';

class CartProductController {
  async getAllCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const candidate = await CartService.getOne(cartId);
      if (!candidate) {
        return res.status(400).json({
          message: NO_CART_WITH_ID,
        });
      }

      const cartProducts = await CartProductService.getAll(cartId);

      res.json({ cartProducts });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err);
    }
  }

  async getOneCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const candidate = await CartService.getOne(cartId);
      if (!candidate) {
        return res.status(400).json({
          message: NO_CART_WITH_ID,
        });
      }

      const cartProduct = await CartProductService.getOne(id, cartId);
      if (!cartProduct) {
        return res.status(400).json({ message: NO_CART_PRODUCT_WITH_ID });
      }

      res.json({ cartProduct });
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  }

  async createCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const { productId } = req.body;
      const candidate = await CartService.getOne(cartId);
      if (!candidate) {
        return res.status(400).json({
          message: NO_CART_WITH_ID,
        });
      }

      const cartProduct = await CartProductService.create(cartId, productId);

      res.json({ cartProduct });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async deleteCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const candidateCart = await CartService.getOne(cartId);
      if (!candidateCart) {
        return res.status(400).json({
          message: NO_CART_WITH_ID,
        });
      }

      const candidate = await CartProductService.getOne(id, cartId);
      if (!candidate) {
        return res.status(400).json({ message: NO_CART_PRODUCT_WITH_ID });
      }

      await CartProductService.delete(id, cartId);

      res.json({ message: 'Cart product was deleted' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new CartProductController();
