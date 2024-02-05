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
    
    const { tasks } = user || null;
    
    return res.status(200).send({ logged: true, tasks });
    
  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

router.post("/create", async(req, res) => {
  try {
    const body = req.body
    
  } catch (error) {
    return res.status(500).send({ error: message.user.error })
  }
});

module.exports = router;