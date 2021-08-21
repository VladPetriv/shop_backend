const Router = require('express');
const UserController = require('../controllers/userController.js');

const router = Router();

router.post('/registration', UserController.registarion);
router.post('/login', UserController.login);
router.get('/auth', UserController.checkStatus);

module.exports = router;
