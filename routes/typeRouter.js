import { Router } from 'express';
import { body } from 'express-validator';
import TypeController from '../controllers/typeController.js';
import { NOT_VALID_NAME } from '../error_messages/typeErrorMessages.js';
import checkUserRole from '../middlewares/checkUserRoleMiddleware.js';

const router = Router();

router.get('/items/', TypeController.getAllTypes);
router.get('/items/:id', TypeController.getOneType);
router.post(
  '/create',
  checkUserRole('ADMIN'),
  body('name').isLength({ min: 2, max: 15 }).withMessage(NOT_VALID_NAME),
  TypeController.createType
);
router.delete('/items/:id', checkUserRole('ADMIN'), TypeController.deleteType);
router.put('/items/:id', checkUserRole('ADMIN'), TypeController.updateType);

export default router;
