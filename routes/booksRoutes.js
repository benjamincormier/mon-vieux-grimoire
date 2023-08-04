const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-sharp-config');

const booksController = require('../controllers/booksController');

// Unprotected routes
router.get('/', booksController.getAllBooks); // OK
router.get('/bestrating', booksController.getBestBooks); // OK, placed before "/:id" to avoid mismatch
router.get('/:id', booksController.getBook); // OK

// Protected routes
router.post('/', auth, upload, optimizeImage, booksController.createBook); // OK
router.put('/:id', auth, upload, optimizeImage, booksController.updateBook); // OK
router.delete('/:id', auth, booksController.deleteBook); // OK
router.post('/:id/rating', auth, booksController.rateBook);

module.exports = router;
