const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const booksController = require('../controllers/booksController');

// Unprotected routes
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBook);
router.get('/bestrating', booksController.getBestBooks);

// Protected routes
router.post('/', auth, booksController.createBook);
router.put('/:id', auth, booksController.updateBook);
router.delete('/', auth, booksController.deleteBook);
router.post('/:id.rating', auth, booksController.rateBook);

module.exports = router;