const Router = require('express');
const CarProductController = require('../controllers/cartProductController.js');

const router = Router();

router.get('/:cartId/items', CarProductController.getAllCartProduct);
router.get('/:cartId/items/:id', CarProductController.getOneCartProduct);
router.post('/:cartId/create', CarProductController.createCartProduct);
router.delete('/:cartId/items/:id', CarProductController.deleteCartProduct);
router.put('/:cartId/items/:id', CarProductController.updateCartProduct);

module.exports = router;
