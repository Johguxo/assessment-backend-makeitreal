const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

// GET: fetch notes pagination
router.get('/', auth, controller.fetch);
// GET: fetch notes
router.get('/all_notes/', auth, controller.fetch_all);
// GET: fetch notes
router.get('/last_note/', auth, controller.fetch_last);
// POST: create new note
router.post('/', auth, controller.create);
// PATCH: update note
router.patch('/:id', auth, controller.update);

module.exports = router