<<<<<<< HEAD
const Router = require('express');
const BrandController = require('../controllers/brandController.js');

=======
import { Router } from 'express';
import BrandController from '../controllers/brandController.js';
>>>>>>> features
const router = Router();

router.get('/items/', BrandController.getAllBrands);
router.get('/items/:id', BrandController.getOneBrand);
router.post('/create/', BrandController.createBrand);
router.delete('/items/:id', BrandController.deleteBrand);
router.put('/items/:id', BrandController.updateBrand);

export default router;
