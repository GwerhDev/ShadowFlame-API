const router = require('express').Router();
const auth = require('../controllers/auth');
const task = require('../controllers/task');
const admin = require('../controllers/admin');
const guide = require('../controllers/guide');
const loginBnet = require('../controllers/login-bnet');
const signupBnet = require('../controllers/signup-bnet');
const completedTask = require('../controllers/completed-task');

router.use("/auth", auth);
router.use("/task", task);
router.use("/admin", admin);
router.use("/guide", guide);
router.use("/login-bnet", loginBnet);
router.use("/signup-bnet", signupBnet);
router.use("/completed-task", completedTask);

module.exports = router;