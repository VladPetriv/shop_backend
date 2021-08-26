const Router = require('express');
const CartProductController = require('../controllers/cartProductController.js');

const router = Router();

router.get('/:cartId/items'.CartProductController.getAllCartProduct);
router.get('/:cartId/items/:id', CartProductController.getOneCartProduct);
router.post('/:cartId/create', CartProductController.createCartProduct);
router.delete('/:cartId/items/:id', cartProductController.delteCartProduct);
router.put('/:cartId/items/:id', cartProductController.updateCartProduct);

module.exports = router;
