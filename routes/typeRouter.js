const Router = require('express');
const TypeController = require('../controllers/typeController.js');

const router = Router();

router.get('/items/', TypeController.getAllTypes);
router.get('/items/:id', TypeController.getOneType);
router.post('/create', TypeController.createType);
router.delete('/items/:id', TypeController.deleteType);
router.put('/items/:id', TypeController.updateType);

module.exports = router;
