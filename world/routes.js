const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

// GET: fetch World
router.get('/', auth, controller.fetch);
// POST: create new World
router.post('/', auth, controller.create);
// GET: fetch an world by id
router.get('/:id', auth, controller.read);
// PATCH: update world
router.patch('/:id', auth, owner, controller.update);
// DELETE: delete an world
router.delete('/:id', auth, controller.delete);

module.exports = router