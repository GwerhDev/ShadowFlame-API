const router = require('express').Router();
const auth = require('../controllers/auth');
const admin = require('../controllers/admin');
const chatbot = require('../controllers/chatbot');
const myTasks = require('../controllers/my-tasks');
const clantasks = require('../controllers/clan-tasks');
const loginBnet = require('../controllers/login-bnet');
const signupBnet = require('../controllers/signup-bnet');

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/chatbot", chatbot);
router.use("/my-tasks", myTasks);
router.use("/clan-tasks", clantasks);
router.use("/login-bnet", loginBnet);
router.use("/signup-bnet", signupBnet);

module.exports = router;