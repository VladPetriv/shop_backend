const Router = require('express');
const BrandController = require('../controllers/brandController.js');
const router = Router();

router.post('/', BrandController.createBrand);
router.get('/', BrandController.getAllBrands);

module.exports = router;
