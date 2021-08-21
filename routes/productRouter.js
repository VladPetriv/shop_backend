const Router = require('express');
const ProductController = require('../controllers/productController.js');

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getOneProduct);

module.exports = router;
