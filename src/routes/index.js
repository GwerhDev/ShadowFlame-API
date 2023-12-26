const router = require('express').Router();
const auth = require('../controllers/auth');
const login = require('../controllers/login');

router.use("/auth", auth);
router.use("/login", login);

module.exports = router;