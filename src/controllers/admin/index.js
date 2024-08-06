const router = require('express').Router();
const users = require('./users');
const warbands = require('./warbands');
const fixedTasks = require('./fixed-tasks');
const notifications = require('./notifications');

router.use("/users", users);
router.use("/warbands", warbands);
router.use("/fixed-tasks", fixedTasks);
router.use("/notifications", notifications);

module.exports = router;