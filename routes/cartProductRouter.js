import { Router } from 'express';
import CartProductController from '../controllers/cartProductController.js';

const router = Router();

router.get('/:cartId/items', CartProductController.getAllCartProduct);
router.get('/:cartId/items/:id', CartProductController.getOneCartProduct);
router.post('/:cartId/create', CartProductController.createCartProduct);
router.delete('/:cartId/items/:id', CartProductController.deleteCartProduct);
router.put('/:cartId/items/:id', CartProductController.updateCartProduct);

export default router;
