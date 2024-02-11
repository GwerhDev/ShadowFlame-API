const router = require('express').Router();
const users = require('./users');
const notifications = require('./notifications');

router.use("/users", users);
router.use("/notifications", notifications);

module.exports = router;