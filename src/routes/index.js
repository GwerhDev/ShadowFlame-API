const router = require('express').Router();
const auth = require('../controllers/auth');
const loginBnet = require('../controllers/login-bnet');
const signupBnet = require('../controllers/signup-bnet');
const loginInner = require('../controllers/login-inner');

router.use("/auth", auth);
router.use("/login-bnet", loginBnet);
router.use("/signup-bnet", signupBnet);
router.use("/login-inner", loginInner);

module.exports = router;