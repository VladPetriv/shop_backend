import { Router } from 'express';
import { body } from 'express-validator';
import ProductController from '../controllers/productController.js';
import { NOT_VALID_NAME } from '../error_messages/productErrorMessages.js';
import checkUserRole from '../middlewares/checkUserRoleMiddleware.js';

const router = Router();

router.get('/items/', ProductController.getAllProduct);
router.get('/items/:id', ProductController.getOneProduct);
router.post(
  '/create',
  checkUserRole('ADMIN'),
  body('name').isLength({ min: 2, max: 15 }).withMessage(NOT_VALID_NAME),
  ProductController.createProduct
);
router.delete(
  '/items/:id',
  checkUserRole('ADMIN'),
  ProductController.deleteProduct
);
router.put(
  '/items/:id',
  checkUserRole('ADMIN'),
  ProductController.updateProduct
);

export default router;
