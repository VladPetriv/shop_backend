const Router = require('express');
const ProductController = require('../controllers/productController.js');

const router = Router();

router.get('/items/', ProductController.getAllProduct);
router.get('/items/:id', ProductController.getOneProduct);
router.post('/create', ProductController.createProduct);
router.delete('/items/:id', ProductController.deleteProduct);
router.put('/items/:id', ProductController.updateProduct);

module.exports = router;
