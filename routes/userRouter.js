const Router = require('express');
const authmiddleware = require('../middlewares/chechUserMiddleware');
const UserController = require('../controllers/userController.js');

const router = Router();

router.post('/registration', UserController.registarion);
router.post('/login', UserController.login);
router.get('/auth', authmiddleware, UserController.check);

module.exports = router;
