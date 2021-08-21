const Router = require('express');
const userRouter = require('./userRouter.js');
const typeRouter = require('./typeRouter.js');
const brandRouter = require('./brandRouter.js');
const productRouter = require('./productRouter.js');

const router = Router();

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;
