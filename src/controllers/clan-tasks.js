const router = require('express').Router();
const userSchema = require('../models/User');
const clanTasksSchema = require('../models/ClanTasks');
const { decodeToken } = require('../integrations/jwt');
const { message } = require('../messages');

router.post("/", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const { date } = req.body || null;

    const user = await userSchema.findOne({ _id: decodedToken.data.id })
                                 .populate('clantasks');

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { mytasks } = user || null;


    const filteredTasks = mytasks.filter(t => {
      const taskDate = new Date(t.date).toISOString().substring(0, 10);
    
      return taskDate === date;
    });

    return res.status(200).send(filteredTasks);

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.post("/create", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });
    
    const { body } = req || null;
    
    const newTask = new clanTasksSchema(body);
    await newTask.save();
    
    user.mytasks = [...user.mytasks, newTask._id];
    await user.save();

    return res.status(200).send({ message: message.task.created });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params || null;
    const { body } = req || null;

    await clanTasksSchema.findByIdAndUpdate(id, body);

    return res.status(200).send({ message: message.task.updated });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params || null;

    await clanTasksSchema.deleteOne({ _id: id });
    await userSchema.updateMany({ task: id }, { $pull: { task: id } });

    return res.status(200).send({ message: message.task.deleted });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

module.exports = router;