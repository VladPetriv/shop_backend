const Router = require('express');
const CartProductController = require('../controllers/cartProductController.js');

const router = Router();

router.get('/', CartProductController.getAllCartProduct);
router.post('/create', CartProductController.createCartProduct);

module.exports = router;
