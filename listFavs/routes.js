const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

// GET: fetch users
router.get('/', auth, controller.fetch);
// POST: search a user by name
router.post('/', auth, controller.create);
// POST: search a user by name
router.post('/:id', auth, controller.addItem);
// GET: fetch an user by id
router.get('/:id', auth, controller.read);
// PATCH: update a task
router.patch('/:id', auth, owner, controller.update);
// DELETE: delete an user
router.delete('/:id', auth, controller.delete);

module.exports = router