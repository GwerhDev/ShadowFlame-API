const router = require('express').Router();
const userSchema = require('../models/User');
const fixedTasksSchema = require('../models/FixedTasks');
const { decodeToken } = require('../integrations/jwt');
const { message } = require('../messages');

router.post("/create", async (req, res) => {
  try {
/*     const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data.id });
    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound }); */

    const { body } = req || null;

    const newTask = new fixedTasksSchema(body);
    await newTask.save();

    return res.status(200).send(newTask);

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

module.exports = router;