const Router = require('express');
const authmiddlewares = require('../middlewares/chechUserMiddleware');
const UserController = require('../controllers/userController.js');

const router = Router();

router.post('/registration', UserController.registarion);
router.post('/login', UserController.login);
router.get('/auth', authmiddlewares, UserController.check);

module.exports = router;
