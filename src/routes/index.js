const router = require('express').Router();
const auth = require('../controllers/auth');
const admin = require('../controllers/admin');
const tasks = require('../controllers/tasks');
const chatbot = require('../controllers/chatbot');
const loginBnet = require('../controllers/login-bnet');
const signupBnet = require('../controllers/signup-bnet');

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/tasks", tasks);
router.use("/chatbot", chatbot);
router.use("/login-bnet", loginBnet);
router.use("/signup-bnet", signupBnet);

module.exports = router;