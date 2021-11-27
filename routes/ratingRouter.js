import { Router } from 'express';
import RatingController from '../controllers/ratingController.js';

import chechUserMiddleware from '../middlewares/chechUserMiddleware.js';
const router = Router();

router.get('/items/:productId', RatingController.getAllRating);
router.post(
  '/items/:productId',
  chechUserMiddleware,
  RatingController.createRating
);

export default router;
