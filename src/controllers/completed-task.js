const router = require('express').Router();
const userSchema = require('../models/User');
const taskSchema = require('../models/Task');
const completedTaskSchema = require('../models/CompletedTask');
const { decodeToken } = require('../integrations/jwt');
const { message } = require('../messages');

router.post("/create/:id", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data.id });
    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params || null;
    const { date, type } = req.body || null;

    const completedTaskExist = await completedTaskSchema.findOne({ date: new Date(date), user: user._id });

    if (!completedTaskExist) {
      const newCompletedTask = await completedTaskSchema.create({ task: id, date: new Date(date), type: type, user: user._id });
      await userSchema.findByIdAndUpdate(decodedToken.data.id, { $push: { completedTask: newCompletedTask._id } });
    } else {
      await completedTaskSchema.findByIdAndUpdate(completedTaskExist._id, { $push: { task: id } });
    }

    return res.status(200).send({ message: message.task.updated });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data.id });
    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params || null;
    const { date } = req.body || null;
    
    await completedTaskSchema.findOneAndUpdate( {date: new Date(date)}, { $pull: { task: id }});
    
    return res.status(200).send({ message: message.task.updated });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

module.exports = router;