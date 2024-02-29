const router = require('express').Router();
const AdminController = require('../controllers/admin.controllers');
const { authenticateAdmin } = require('../middlewares/authentication');

router.post('/login', AdminController.login);
router.post('/register', authenticateAdmin, AdminController.register);

module.exports = router;
