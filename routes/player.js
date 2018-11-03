const express = require('express');
const router = express.Router();
const controller = require('../controllers').Player;

router.get('/', controller.allPlayers);
router.get('/:id', controller.playerById);

module.exports = router;