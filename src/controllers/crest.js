const router = require('express').Router();
const userSchema = require('../models/User');
const crestSchema = require('../models/Crest');
const { message } = require('../messages');
const { decodeToken } = require('../integrations/jwt');

router.get('/', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const response = await crestSchema.find({ user: user._id });

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

router.get('/last', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });
    const response = await crestSchema.findOne({ user: user._id }).sort({ date: -1 });

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

router.post('/create', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { type, quantity, legendaryFound } = req.body;
    const newCrest = new crestSchema({ type, quantity, legendaryFound, user: user._id });

    await newCrest.save();
    return res.status(201).send(newCrest);
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params;
    const { type, quantity, legendaryFound } = req.body;

    const updatedCrest = await crestSchema.findOneAndUpdate(
      { _id: id, user: user._id },
      { type, quantity, legendaryFound },
      { new: true }
    );

    return res.status(200).send(updatedCrest);
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);
    const user = await userSchema.findOne({ _id: decodedToken.data.id });

    if (!user) return res.status(404).send({ logged: false, message: message.user.notfound });

    const { id } = req.params;

    await crestSchema.findOneAndDelete({ _id: id });

    return res.status(200).send({ message: message.crest.delete.success });
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

module.exports = router;
