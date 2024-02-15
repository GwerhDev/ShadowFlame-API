const router = require('express').Router();
const users = require('./users');
const fixedTasks = require('./fixed-tasks');
const notifications = require('./notifications');

router.use("/users", users);
router.use("/notifications", notifications);
router.use("/fixed-tasks", fixedTasks);

module.exports = router;