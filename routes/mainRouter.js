import { Router } from 'express';
import userRouter from './userRouter.js';
import typeRouter from './typeRouter.js';
import brandRouter from './brandRouter.js';
import productRouter from './productRouter.js';
import cartProductRouter from './cartProductRouter.js';
import ratingRouter from './ratingRouter.js';

const router = Router();

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/', userRouter);
router.use('/product', productRouter);
router.use('/cart_product', cartProductRouter);
router.use('/rating', ratingRouter);

export default router;
