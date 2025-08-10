const router = require('express').Router();
const Member = require('../../models/Member');
const { message } = require('../../messages');

router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    return res.status(200).send(members);
  } catch (error) {
    return res.status(500).send({ error: message.member.error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, character, role, resonance, class: memberClass, whatsapp } = req.body;
    const newMember = await Member.create({ username, character, role, resonance, class: memberClass, whatsapp });
    return res.status(201).send({ message: message.member.create.success, member: newMember });
  } catch (error) {
    return res.status(500).send({ error: message.member.error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).send({ message: message.member.notfound });
    }
    return res.status(200).send({ message: message.member.update.success, member: updatedMember });
  } catch (error) {
    return res.status(500).send({ error: message.member.error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).send({ message: message.member.notfound });
    }
    return res.status(200).send({ message: message.member.delete.success });
  } catch (error) {
    return res.status(500).send({ error: message.member.error });
  }
});

module.exports = router;