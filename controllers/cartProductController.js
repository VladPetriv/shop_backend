import CartProductService from '../services/cartProductService.js';

class CartProductController {
  async getAllCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const cartProducts = await CartProductService.getAll(cartId);
      res.json(cartProducts);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err);
    }
  }
  async getOneCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const cartProduct = await CartProductService.getOne(id, cartId);
      res.json(cartProduct);
    } catch (err) {
      console.log({ err });
      res.status(500).json(err);
    }
  }
  async createCartProduct(req, res) {
    try {
      const { cartId } = req.params;
      const { productId } = req.body;

      const cartProduct = await CartProductService.create(cartId, productId);
      res.json(cartProduct);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async deleteCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const candidate = await CartProductService.getOne(id, cartId);
      if (!candidate) {
        return res
          .status(400)
          .json({ message: 'Cart product with this id doesnt exist' });
      }
      await CartProductService.delete(id, cartId);
      res.json({ message: 'Cart product was deleted' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async updateCartProduct(req, res) {
    try {
      const { id, cartId } = req.params;
      const { productId } = req.body;
      const candidate = await CartProductService.getOne(id, cartId);
      if (!candidate) {
        res
          .status(400)
          .json({ message: 'Cart product with this id doesnt exist' });
      }
      const cartProduct = await CartProductService.update(
        id,
        cartId,
        productId
      );
      res.json(cartProduct);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new CartProductController();
