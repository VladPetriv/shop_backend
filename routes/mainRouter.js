const Router = require('express');
const userRouter = require('./userRouter.js');
const typeRouter = require('./typeRouter.js');
const brandRouter = require('./brandRouter.js');
const productRouter = require('./productRouter.js');
const cartProductRouter = require('./cartProductRouter.js');

const router = Router();

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/', userRouter);
router.use('/product', productRouter);
router.use('/cart_product', cartProductRouter);

module.exports = router;
