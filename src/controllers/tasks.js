const router = require('express').Router();
const userSchema = require('../models/User');
const taskSchema = require('../models/Task');
const { decodeToken } = require('../integrations/jwt');
const { message } = require('../messages');

router.get("/", async(req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id })
                                 .populate('task');
    
    if(!user) return res.status(404).send({ logged: false, message: message.user.notfound });
    
    const { task } = user || null;
    
    return res.status(200).send(task);
    
  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.post("/create", async(req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if(!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { body } = req || null;

    const newTask = new taskSchema(body);
    await newTask.save();

    user.task = [...user.task, newTask._id];
    await user.save();

    return res.status(200).send({ message: message.task.created });
    
  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.delete("/delete/:id", async(req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if(!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params || null;

    await taskSchema.deleteOne({ _id: id });
    await userSchema.updateMany({ task: id }, { $pull: { task: id } });

    return res.status(200).send({ message: message.task.deleted });

  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }  
});

module.exports = router;