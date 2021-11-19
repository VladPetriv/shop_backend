import { Router } from 'express';
import { body } from 'express-validator';
import BrandController from '../controllers/brandController.js';
import { NOT_VALID_NAME } from '../error_messages/brandErrorMessages.js';
const router = Router();

router.get('/items/', BrandController.getAllBrands);
router.get('/items/:id', BrandController.getOneBrand);
router.post(
  '/create/',
  body('name').isLength({ min: 2, max: 15 }).withMessage(NOT_VALID_NAME),
  BrandController.createBrand
);
router.delete('/items/:id', BrandController.deleteBrand);
router.put('/items/:id', BrandController.updateBrand);

export default router;
