const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

// POST: Register
router.post('/register', controller.signup);
// POST: login
router.post('/login', controller.signin);

router.get('/info/:id', controller.read);
// PUT: Update
router.put('/:id',upload.single('fileData'), controller.update);

module.exports = router;