const router = require('express').Router();
const AdminController = require('../controllers/admin.controllers');
const { authenticateAdmin } = require('../middlewares/authentication');

router.post('/login', authenticateAdmin, AdminController.login);
router.post('/register', AdminController.register);

module.exports = router;
