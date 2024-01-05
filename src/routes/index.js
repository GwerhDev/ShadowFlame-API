const router = require('express').Router();
const auth = require('../controllers/auth');
const loginBnet = require('../controllers/login-bnet');
const loginInner = require('../controllers/login-inner');

router.use("/auth", auth);
router.use("/login-bnet", loginBnet);
router.use("/login-innter", loginInner);

module.exports = router;