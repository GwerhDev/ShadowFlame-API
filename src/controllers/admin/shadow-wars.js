const router = require('express').Router();
const ShadowWar = require('../../models/ShadowWar');
const { message } = require('../../messages');
const { decodeToken } = require('../../integrations/jwt');
const { roles } = require('../../misc/consts-user-model');

// GET all shadow wars
router.get('/', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const shadowWars = await ShadowWar.find().populate('enemyClan').populate('battle.exalted.member').populate('battle.eminent.member').populate('battle.famed.member').populate('battle.proud.member');
    return res.status(200).json(shadowWars);
  } catch (error) {
    return res.status(500).json({ error: message.user.error });
  }
});

// GET a single shadow war by ID
router.get('/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { id } = req.params;
    const shadowWar = await ShadowWar.findById(id).populate('enemyClan').populate('battle.exalted.member').populate('battle.eminent.member').populate('battle.famed.member').populate('battle.proud.member');

    if (!shadowWar) {
      return res.status(404).json({ message: 'Shadow War not found' });
    }

    return res.status(200).json(shadowWar);
  } catch (error) {
    return res.status(500).json({ error: message.user.error });
  }
});

// POST a new shadow war
router.post('/', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const newShadowWar = new ShadowWar(req.body);

    await newShadowWar.save();
    return res.status(201).json(newShadowWar);
  } catch (error) {
    return res.status(500).json({ error: message.user.error });
  }
});

// PATCH a shadow war by ID
router.patch('/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { id } = req.params;
    const updatedShadowWar = await ShadowWar.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedShadowWar) {
      return res.status(404).json({ message: 'Shadow War not found' });
    }

    return res.status(200).json(updatedShadowWar);
  } catch (error) {
    return res.status(500).json({ error: message.user.error });
  }
});

// DELETE a shadow war by ID
router.delete('/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { id } = req.params;
    const deletedShadowWar = await ShadowWar.findByIdAndDelete(id);

    if (!deletedShadowWar) {
      return res.status(404).json({ message: 'Shadow War not found' });
    }

    return res.status(200).json({ message: 'Shadow War deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: message.user.error });
  }
});

module.exports = router;
