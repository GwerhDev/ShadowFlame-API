const express = require('express');
const router = express.Router();
const shadowWarController = require('../controllers/shadow-war');

router.get('/next-battle', shadowWarController.getNextBattle);

module.exports = router;
