const Router = require('express');
const TypeController = require('../controllers/typeController.js');

const router = Router();

router.get('/', TypeController.getAllTypes);
router.post('/create', TypeController.createType);

module.exports = router;
