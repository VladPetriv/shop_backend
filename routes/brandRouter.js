const Router = require('express');
const BrandController = require('../controllers/brandController.js');
const router = Router();

router.get('/', BrandController.getAllBrands);
router.post('/create/', BrandController.createBrand);

module.exports = router;
