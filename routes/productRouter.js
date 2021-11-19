import { Router } from 'express';
import { body } from 'express-validator';
import ProductController from '../controllers/productController.js';
import { NOT_VALID_NAME } from '../error_messages/productErrorMessages.js';

const router = Router();

router.get('/items/', ProductController.getAllProduct);
router.get('/items/:id', ProductController.getOneProduct);
router.post(
  '/create',
  body('name').isLength({ min: 2, max: 15 }).withMessage(NOT_VALID_NAME),
  ProductController.createProduct
);
router.delete('/items/:id', ProductController.deleteProduct);
router.put('/items/:id', ProductController.updateProduct);

export default router;
