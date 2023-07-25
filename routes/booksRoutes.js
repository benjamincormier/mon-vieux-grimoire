const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const booksController = require('../controllers/booksController');

// Unprotected routes
router.get('/', booksController.getAllBooks); // OK
router.get('/:id', booksController.getBook);
router.get('/bestrating', booksController.getBestBooks);

// Protected routes
router.post('/', auth, multer, booksController.createBook); // OK
router.put('/:id', auth, multer, booksController.updateBook);
router.delete('/', auth, booksController.deleteBook);
router.post('/:id.rating', auth, booksController.rateBook);

module.exports = router;
