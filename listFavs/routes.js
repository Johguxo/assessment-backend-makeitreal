const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

// GET: fetch users
router.get('/', auth, controller.fetch);
// POST: create new listFavs
router.post('/', auth, controller.create);
// POST: add new fav in listFavs
router.post('/:id', auth, controller.addItem);
// PATCH: update fav in listFavs
router.patch('/:id', auth, controller.updateItem);
// GET: fetch an user by id
router.get('/:id', auth, controller.read);
// PATCH: update a task
router.patch('/:id', auth, owner, controller.update);
// DELETE: delete an user
router.delete('/:id', auth, controller.delete);

module.exports = router