import { Router } from 'express';
import RatingController from '../controllers/ratingController.js';

import chechUserMiddleware from '../middlewares/chechUserMiddleware.js';
const router = Router();

router.get('/items/:productId', RatingController.getAllRating);
router.get(
  '/item/:productId',
  chechUserMiddleware,
  RatingController.getOneRating
);
router.post(
  '/items/:productId',
  chechUserMiddleware,
  RatingController.createRating
);
router.delete(
  '/items/:productId',
  chechUserMiddleware,
  RatingController.deleteRating
);
router.put(
  '/item/:productId',
  chechUserMiddleware,
  RatingController.updateRating
);

export default router;
