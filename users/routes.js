const express = require('express');
const router = express.Router();
const controller = require('./controller');

// POST: login
router.post('/register', controller.signup);
// POST: login
router.post('/login', controller.signin);

module.exports = router;