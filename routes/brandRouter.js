const Router = require('express');
const BrandController = require('../controllers/brandController.js');
const router = Router();

router.get('/items/', BrandController.getAllBrands);
router.get('/items/:id', BrandController.getOneBrand);
router.post('/create/', BrandController.createBrand);
router.delet('/items/:id', BrandController.deleteBrand);
route.put('/items/:id', BrandController.updateBrand);

module.exports = router;
